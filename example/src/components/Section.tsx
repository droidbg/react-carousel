import type { ReactNode } from "react";

interface SectionProps {
  /** Anchor id, matched against the sidebar links and scroll-spy. */
  id: string;
  /** Eyebrow label, e.g. "01 / Getting started". */
  num: string;
  title: string;
  children: ReactNode;
}

/** A numbered documentation section with a heading and anchor. */
export function Section({ id, num, title, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section__num">{num}</div>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
