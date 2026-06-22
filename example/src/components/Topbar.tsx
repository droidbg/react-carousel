import type { Theme } from "../hooks";
import { GitHubIcon, IssueIcon, NpmIcon, SunMoon } from "./icons";

const REPO_URL = "https://github.com/droidbg/react-carousel";
const NPM_URL = "https://www.npmjs.com/package/react-carousel-latest";
const NEW_ISSUE_URL = "https://github.com/droidbg/react-carousel/issues/new";

interface TopbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

/** Sticky header: brand, version pill, and external / theme actions. */
export function Topbar({ theme, onToggleTheme }: TopbarProps) {
  return (
    <header className="topbar">
      <a className="brand" href="#overview">
        <span className="brand__mark" />
        <span className="brand__name">
          react&#8202;<em>carousel</em>
        </span>
      </a>
      <span className="pill">v2.0</span>
      <span className="topbar__spacer" />
      <a className="topbar__icon" href={REPO_URL} target="_blank" rel="noreferrer" aria-label="GitHub repository" title="GitHub">
        <GitHubIcon />
      </a>
      <a className="topbar__icon" href={NPM_URL} target="_blank" rel="noreferrer" aria-label="npm package" title="View on npm">
        <NpmIcon />
      </a>
      <a className="topbar__icon" href={NEW_ISSUE_URL} target="_blank" rel="noreferrer" aria-label="Open an issue" title="Open an issue">
        <IssueIcon />
      </a>
      <button className="topbar__icon" onClick={onToggleTheme} aria-label="Toggle colour theme" title="Toggle theme">
        <SunMoon theme={theme} />
      </button>
    </header>
  );
}
