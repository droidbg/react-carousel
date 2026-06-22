import type { SVGProps } from "react";

/**
 * Minimal inline replacements for the three lucide-react icons used by the
 * presets. The rendered SVG (attributes, class names, and paths) is identical
 * to lucide-react v0.487.0 so the UI is unchanged — this just drops the
 * 40 MB `lucide-react` install footprint that every consumer inherited.
 *
 * Icon paths are from lucide (ISC licensed).
 */

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  /** Width and height in pixels. Default `24`, matching lucide. */
  size?: number;
}

function Icon({
  size = 24,
  name,
  children,
  ...rest
}: IconProps & { name: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-${name}`}
      {...rest}
    >
      {children}
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <Icon name="chevron-left" {...props}>
      <path d="m15 18-6-6 6-6" />
    </Icon>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <Icon name="chevron-right" {...props}>
      <path d="m9 18 6-6-6-6" />
    </Icon>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Icon name="arrow-up-right" {...props}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </Icon>
  );
}
