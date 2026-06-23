import type { CSSProperties } from "react";

/** A simple coloured gradient panel used as slide content in the demos. */
export function Panel({
  bg,
  label,
  height = 160,
}: {
  bg: string;
  label: string;
  height?: number | string;
}) {
  const style: CSSProperties = {
    height,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "Fraunces, serif",
    fontSize: "2rem",
    fontWeight: 500,
    borderRadius: 12,
    background: bg,
  };
  return <div style={style}>{label}</div>;
}
