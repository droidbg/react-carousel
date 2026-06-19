import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import Blobs, { type ShapeOption } from "./Blobs";
import type { CSSProperties } from "react";

/** Visual design presets for {@link Card}. */
export type CardVariant =
  | "gradient"
  | "glass"
  | "solid"
  | "outline"
  | "dark"
  | "minimal";

export interface CardProps {
  title: string;
  category: string;
  description: string;
  /** Palette start colour (exposed to CSS as `--rc-from`). */
  from: string;
  /** Palette end colour (exposed to CSS as `--rc-to`). */
  to: string;
  shape: ShapeOption;
  /** Visual design. Default `"gradient"`. */
  variant?: CardVariant;
}

/**
 * The opinionated card. Its palette is published as CSS custom properties
 * (`--rc-from` / `--rc-to`) so each `variant` class can build backgrounds,
 * borders, and accents from the same two colours. Styling lives in
 * `legacy.css` — no Tailwind required.
 */
export default function Card({
  title,
  category,
  description,
  from,
  to,
  shape,
  variant = "gradient",
}: CardProps) {
  const seed = useMemo(() => Math.random(), []);

  return (
    <motion.div
      className={`rc-card rc-card--${variant}`}
      style={{ "--rc-from": from, "--rc-to": to } as CSSProperties}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05, boxShadow: "10px 8px 20px rgba(0, 0, 0, 0.35)" }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Blobs seed={seed} shape={shape} />

      <span className="rc-card__tag">{category}</span>
      <h2 className="rc-card__title">{title}</h2>

      <div className="rc-card__progress">
        <div className="rc-card__progress-fill" />
      </div>

      <p className="rc-card__desc">{description}</p>

      <motion.button
        type="button"
        className="rc-card__button"
        whileHover={{ scale: 1.2 }}
        aria-hidden="true"
        tabIndex={-1}
      >
        <ArrowUpRight size={18} />
      </motion.button>
    </motion.div>
  );
}
