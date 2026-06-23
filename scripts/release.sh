#!/usr/bin/env bash
#
# Interactive, RESUMABLE release helper for react-carousel-latest.
# Publishes to npm (with the right dist-tag) and cuts a matching GitHub release.
#
#   npm run release
#
# The release is four idempotent steps:
#   1) commit + tag       2) npm publish       3) push branch + tag       4) GitHub release
#
# Each step checks whether it is already done and skips it, so if a run fails
# part-way (e.g. a publish 2FA timeout) you can simply re-run the script: it
# detects the in-progress version, shows what's left, and resumes from there.
# Nothing is published or pushed until you confirm.

set -euo pipefail

cd "$(dirname "$0")/.."

# ---- colours -------------------------------------------------------------
bold() { printf '\033[1m%s\033[0m' "$1"; }
ok()   { printf '\033[32m%s\033[0m\n' "$1"; }
warn() { printf '\033[33m%s\033[0m\n' "$1"; }
err()  { printf '\033[31m%s\033[0m\n' "$1" >&2; }
ask()  { local p="$1" d="${2:-}" a; read -r -p "$p" a; echo "${a:-$d}"; }

# ---- per-step completion probes -----------------------------------------
gh_available()      { command -v gh >/dev/null 2>&1; }
is_published()      { npm view "$NAME@$1" version >/dev/null 2>&1; }                 # $1 = version
local_tag_exists()  { git rev-parse -q --verify "refs/tags/$1" >/dev/null 2>&1; }    # $1 = tag
remote_tag_exists() { [ -n "$(git ls-remote --tags origin "$1" 2>/dev/null)" ]; }    # $1 = tag
gh_release_exists() { gh_available && gh release view "$1" >/dev/null 2>&1; }         # $1 = tag
# A version is fully released only when published, pushed, and (if gh is set up)
# released on GitHub. Without gh we can't verify/create that step, so don't gate on it.
fully_released()    { is_published "$1" && remote_tag_exists "v$1" && { ! gh_available || gh_release_exists "v$1"; }; }

# ---- pre-flight ----------------------------------------------------------
command -v node >/dev/null || { err "node not found"; exit 1; }
command -v npm  >/dev/null || { err "npm not found"; exit 1; }

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { err "Not a git repo"; exit 1; }
if [ -n "$(git status --porcelain)" ]; then
  err "Working tree is dirty. Commit or stash first."; git status --short; exit 1
fi

# Verify npm auth BEFORE any version bump / commit / tag. Publishing while
# logged out fails late with a confusing 404 (PUT .../<pkg> Not found), by which
# point the release commit and tag already exist.
if ! NPM_USER="$(npm whoami 2>/dev/null)"; then
  err "Not logged in to npm. Run 'npm login' first (so 'npm whoami' succeeds)."; exit 1
fi
ok "npm: authenticated as $NPM_USER"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
CURRENT="$(node -p "require('./package.json').version")"
NAME="$(node -p "require('./package.json').name")"

echo
echo "$(bold "Releasing $NAME")  (current: $CURRENT, branch: $BRANCH)"
echo

# ---- resume? detect an in-progress release for the current version -------
RESUME="false"
BUMPED="false"          # did we mutate package.json this run (and may need to revert)?
VERSION=""
DIST_TAG=""
PRERELEASE="false"

if local_tag_exists "v$CURRENT" && ! fully_released "$CURRENT"; then
  echo "$(bold "Found an in-progress release for v$CURRENT:")"
  is_published      "$CURRENT"  && ok "  ✓ published to npm"        || warn "  ✗ not published to npm"
  remote_tag_exists "v$CURRENT" && ok "  ✓ pushed (tag on origin)"  || warn "  ✗ not pushed to origin"
  if gh_available; then
    gh_release_exists "v$CURRENT" && ok "  ✓ GitHub release exists" || warn "  ✗ no GitHub release"
  fi
  echo
  case "$(ask "Resume v$CURRENT (skip already-done steps)? [Y/n]: " Y)" in
    n|N|no) ;;
    *) RESUME="true"; VERSION="$CURRENT" ;;
  esac
fi

# ---- choose release type (only for a NEW release) ------------------------
if [ "$RESUME" = "true" ]; then
  case "$VERSION" in *-*) DEF_TAG="beta"; PRERELEASE="true";; *) DEF_TAG="latest";; esac
  DIST_TAG="$(ask "npm dist-tag ($DEF_TAG): " "$DEF_TAG")"
else
  echo "What kind of release?"
  echo "  1) beta    — prerelease, npm dist-tag 'beta', GitHub pre-release"
  echo "  2) stable  — direct release, npm dist-tag 'latest', GitHub release"
  echo "  3) custom  — type an exact version"
  TYPE="$(ask "Choose [1-3] (1): " 1)"

  case "$TYPE" in
    1)
      npm version prerelease --preid beta --no-git-tag-version >/dev/null
      DIST_TAG="beta"; PRERELEASE="true"
      ;;
    2)
      echo
      echo "Stable bump:"
      echo "  a) patch          ($CURRENT → next patch)"
      echo "  b) minor"
      echo "  c) major"
      echo "  d) release        (drop the -beta suffix → ${CURRENT%%-*})"
      echo "  e) explicit       (type it)"
      LVL="$(ask "Choose [a-e] (d): " d)"
      case "$LVL" in
        a) npm version patch  --no-git-tag-version >/dev/null ;;
        b) npm version minor  --no-git-tag-version >/dev/null ;;
        c) npm version major  --no-git-tag-version >/dev/null ;;
        d) npm version "${CURRENT%%-*}" --no-git-tag-version >/dev/null ;;
        e) V="$(ask "Version: ")"; npm version "$V" --no-git-tag-version >/dev/null ;;
        *) err "Unknown option"; exit 1 ;;
      esac
      DIST_TAG="latest"
      ;;
    3)
      V="$(ask "Exact version (e.g. 2.0.0-rc.1): ")"
      npm version "$V" --no-git-tag-version >/dev/null
      case "$V" in *-*) DEF="beta";; *) DEF="latest";; esac
      DIST_TAG="$(ask "npm dist-tag ($DEF): " "$DEF")"
      case "$DEF" in beta) PRERELEASE="true";; esac
      ;;
    *) err "Unknown option"; exit 1 ;;
  esac
  BUMPED="true"
  VERSION="$(node -p "require('./package.json').version")"
fi

TAG="v$VERSION"
revert_bump() { [ "$BUMPED" = "true" ] && git checkout -- package.json package-lock.json 2>/dev/null || true; }

# ---- plan: show what will run vs. what's already done --------------------
S_TAG="$(local_tag_exists "$TAG" && echo done || echo pending)"
S_PUB="$(is_published "$VERSION" && echo done || echo pending)"
S_PUSH="$(remote_tag_exists "$TAG" && echo done || echo pending)"
if gh_available; then S_GH="$(gh_release_exists "$TAG" && echo done || echo pending)"; else S_GH="n/a (gh not installed)"; fi

echo
echo "$(bold "Plan")  ($([ "$RESUME" = "true" ] && echo resume || echo new release))"
echo "  version    : $CURRENT → $(bold "$VERSION")"
echo "  npm tag    : $DIST_TAG    prerelease: $PRERELEASE    branch: $BRANCH"
echo "  1) commit + tag    : $S_TAG"
echo "  2) npm publish     : $S_PUB"
echo "  3) push branch+tag : $S_PUSH"
echo "  4) GitHub release  : $S_GH"
echo
case "$(ask "Proceed? [y/N]: " n)" in y|Y|yes) ;; *) warn "Aborted."; revert_bump; exit 0;; esac

# Once a step starts mutating remote state, a failure is resumable — just re-run.
trap 'err "A step failed. Fix the issue and re-run \"npm run release\" — it will resume from the first incomplete step."' ERR

# ---- step 1: commit + tag ------------------------------------------------
if local_tag_exists "$TAG"; then
  ok "1/4  commit + tag $TAG — already present, skipping."
else
  git add package.json package-lock.json 2>/dev/null || git add package.json
  git commit -m "release: $TAG"
  git tag -a "$TAG" -m "$TAG"
  BUMPED="false"   # now committed; nothing to revert
  ok "1/4  committed and tagged $TAG."
fi

# ---- step 2: publish to npm ----------------------------------------------
if is_published "$VERSION"; then
  ok "2/4  $NAME@$VERSION — already on npm, skipping publish."
else
  echo; echo "$(bold "Building…")"; npm run build
  echo; echo "$(bold "Tarball contents:")"; npm pack --dry-run
  echo
  case "$(ask "Publish $NAME@$VERSION to npm (tag: $DIST_TAG)? [y/N]: " n)" in
    y|Y|yes) ;;
    *) warn "Stopping before publish. commit + tag are in place — re-run to resume."; exit 0;;
  esac
  echo "(npm will prompt for your 2FA one-time code if enabled.)"
  npm publish --tag "$DIST_TAG"
  ok "2/4  published $NAME@$VERSION under '$DIST_TAG'."
fi

# ---- step 3: push branch + tag -------------------------------------------
if remote_tag_exists "$TAG"; then
  ok "3/4  $TAG — already on origin, skipping push."
else
  echo; echo "$(bold "Pushing branch + tag…")"
  git push --follow-tags origin "$BRANCH"
  ok "3/4  pushed $BRANCH and $TAG."
fi

# ---- step 4: GitHub release ----------------------------------------------
if gh_release_exists "$TAG"; then
  ok "4/4  GitHub release $TAG — already exists, skipping."
else
  echo; echo "$(bold "Creating GitHub release…")"
  GH_ARGS=( "$TAG" --title "$TAG" --generate-notes )
  [ "$PRERELEASE" = "true" ] && GH_ARGS+=( --prerelease )
  if gh_available && gh release create "${GH_ARGS[@]}"; then
    ok "4/4  GitHub release $TAG created."
  else
    warn "Couldn't create the GitHub release via gh (not installed or not authed)."
    ORIGIN="$(git remote get-url origin)"
    SLUG="$(echo "$ORIGIN" | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')"
    echo "Create it manually:"
    echo "  https://github.com/$SLUG/releases/new?tag=$TAG"
    [ "$PRERELEASE" = "true" ] && echo "  (tick 'Set as a pre-release')"
  fi
fi

trap - ERR

echo
ok "Done: $NAME@$VERSION"
[ "$DIST_TAG" != "latest" ] && echo "Install with: npm i $NAME@$DIST_TAG"
