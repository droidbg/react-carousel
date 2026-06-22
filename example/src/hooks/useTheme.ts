import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

/**
 * Persisted colour theme. Reads the initial value from the `data-theme`
 * attribute (set before paint by the inline script in `index.html` to avoid a
 * flash), then mirrors changes back to the document and `localStorage`.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.getAttribute("data-theme") as Theme) || "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("rc-theme", theme);
    } catch {
      /* ignore — private mode / storage disabled */
    }
  }, [theme]);

  return [theme, setTheme] as const;
}
