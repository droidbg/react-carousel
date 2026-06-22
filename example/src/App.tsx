import { useMemo } from "react";
import { Topbar } from "./components/Topbar";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { sections } from "./sections";
import { allSectionIds } from "./data";
import { useActiveSection, useTheme } from "./hooks";

// docs.css @imports the library stylesheets so everything lands in one bundle.
import "../docs.css";

export default function App() {
  const [theme, setTheme] = useTheme();
  const ids = useMemo(() => allSectionIds, []);
  const active = useActiveSection(ids);

  return (
    <>
      <Topbar theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />

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
