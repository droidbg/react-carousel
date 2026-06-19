#!/usr/bin/env bash
#
# Interactive release helper for react-carousel-latest.
# Publishes to npm (with the right dist-tag) and cuts a matching GitHub release.
#
#   npm run release
#
# It asks whether this is a beta or a direct/stable release, bumps the version,
# builds, publishes, tags + pushes, and creates the GitHub release. Nothing is
# pushed or published until you confirm the summary.

set -euo pipefail

cd "$(dirname "$0")/.."

# ---- colours -------------------------------------------------------------
bold() { printf '\033[1m%s\033[0m' "$1"; }
ok()   { printf '\033[32m%s\033[0m\n' "$1"; }
warn() { printf '\033[33m%s\033[0m\n' "$1"; }
err()  { printf '\033[31m%s\033[0m\n' "$1" >&2; }
ask()  { local p="$1" d="${2:-}" a; read -r -p "$p" a; echo "${a:-$d}"; }

# ---- pre-flight ----------------------------------------------------------
command -v node >/dev/null || { err "node not found"; exit 1; }
command -v npm  >/dev/null || { err "npm not found"; exit 1; }

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { err "Not a git repo"; exit 1; }
if [ -n "$(git status --porcelain)" ]; then
  err "Working tree is dirty. Commit or stash first."; git status --short; exit 1
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
CURRENT="$(node -p "require('./package.json').version")"
NAME="$(node -p "require('./package.json').name")"

echo
echo "$(bold "Releasing $NAME")  (current: $CURRENT, branch: $BRANCH)"
echo

# ---- choose release type -------------------------------------------------
echo "What kind of release?"
echo "  1) beta    — prerelease, npm dist-tag 'beta', GitHub pre-release"
echo "  2) stable  — direct release, npm dist-tag 'latest', GitHub release"
echo "  3) custom  — type an exact version"
TYPE="$(ask "Choose [1-3] (1): " 1)"

DIST_TAG=""
PRERELEASE="false"

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

VERSION="$(node -p "require('./package.json').version")"
TAG="v$VERSION"

# ---- confirm -------------------------------------------------------------
echo
echo "$(bold "Summary")"
echo "  version    : $CURRENT → $(bold "$VERSION")"
echo "  git tag    : $TAG"
echo "  npm tag    : $DIST_TAG"
echo "  prerelease : $PRERELEASE"
echo "  branch     : $BRANCH"
echo
CONFIRM="$(ask "Proceed? [y/N]: " n)"
case "$CONFIRM" in y|Y|yes) ;; *) warn "Aborted. Reverting version bump."; git checkout -- package.json package-lock.json 2>/dev/null || true; exit 0;; esac

# ---- build + preview tarball --------------------------------------------
echo; echo "$(bold "Building…")"
npm run build
echo; echo "$(bold "Tarball contents:")"
npm pack --dry-run

echo
GO="$(ask "Publish the above to npm and cut the release? [y/N]: " n)"
case "$GO" in y|Y|yes) ;; *) warn "Aborted before publish. Reverting version bump."; git checkout -- package.json package-lock.json 2>/dev/null || true; exit 0;; esac

# ---- commit + tag locally ------------------------------------------------
git add package.json package-lock.json 2>/dev/null || git add package.json
git commit -m "release: $TAG"
git tag -a "$TAG" -m "$TAG"
ok "Committed and tagged $TAG locally."

# recovery hint if a later step fails
trap 'err "A step failed. To undo the local release commit/tag:"; err "  git tag -d $TAG && git reset --hard HEAD~1"' ERR

# ---- publish to npm ------------------------------------------------------
echo; echo "$(bold "Publishing to npm (tag: $DIST_TAG)…")"
echo "(npm will prompt for your 2FA one-time code if enabled.)"
npm publish --tag "$DIST_TAG"
ok "Published $NAME@$VERSION to npm under '$DIST_TAG'."

# ---- push branch + tag ---------------------------------------------------
echo; echo "$(bold "Pushing branch + tag…")"
git push --follow-tags origin "$BRANCH"
ok "Pushed $BRANCH and $TAG."

trap - ERR

# ---- GitHub release ------------------------------------------------------
echo; echo "$(bold "Creating GitHub release…")"
GH_ARGS=( "$TAG" --title "$TAG" --generate-notes )
[ "$PRERELEASE" = "true" ] && GH_ARGS+=( --prerelease )

if command -v gh >/dev/null && gh release create "${GH_ARGS[@]}"; then
  ok "GitHub release $TAG created."
else
  warn "Couldn't create the GitHub release via gh (not installed or not authed for this host)."
  ORIGIN="$(git remote get-url origin)"
  SLUG="$(echo "$ORIGIN" | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')"
  echo "Create it manually:"
  echo "  https://github.com/$SLUG/releases/new?tag=$TAG"
  [ "$PRERELEASE" = "true" ] && echo "  (tick 'Set as a pre-release')"
fi

echo
ok "Done: $NAME@$VERSION"
[ "$DIST_TAG" != "latest" ] && echo "Install with: npm i $NAME@$DIST_TAG"
