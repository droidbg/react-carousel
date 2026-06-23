import { Hero } from "./components/Hero";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { allSectionIds, sectionLabels } from "./data";
import { useActiveSection, useTheme } from "./hooks";
import { sections } from "./sections";

// docs.css @imports the library stylesheets so everything lands in one bundle.
import "../docs.css";

const SITE_TITLE = "react-carousel-latest · docs";
const SITE_DESCRIPTION =
  "A headless, accessible, tree-shakeable React carousel with a compound-component API.";

export default function App() {
  const [theme, setTheme] = useTheme();
  // allSectionIds is a stable module constant — pass it straight through; no
  // useMemo needed, and the scroll-spy observer is created once.
  const active = useActiveSection(allSectionIds);

  // Reflect the section in view in the browser tab. The hero ("overview")
  // keeps the plain site title. Derived during render — no effect needed.
  const title =
    active && active !== "overview"
      ? `${sectionLabels[active]} · react-carousel-latest`
      : SITE_TITLE;

  return (
    <>
      {/* React 19 hoists these into <head>; the title updates as you scroll. */}
      <title>{title}</title>
      <meta name="description" content={SITE_DESCRIPTION} />

      <Topbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <div className="layout">
        <Sidebar active={active} />

        <main className="content">
          <Hero />

          <hr className="rule" />

          {sections.map((SectionComponent) => (
            <SectionComponent key={SectionComponent.name} />
          ))}

          <footer className="footer">
            <span>react-carousel-latest · Apache-2.0</span>
            <span>Built with Fraunces &amp; Hanken Grotesk</span>
          </footer>
        </main>
      </div>
    </>
  );
}
