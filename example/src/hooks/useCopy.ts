import { useState } from "react";

/**
 * Clipboard helper for the "copy" buttons. Exposes a `copied` flag that
 * flips true for ~1.4s after a successful copy so the button can confirm.
 */
export function useCopy() {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      },
      () => undefined,
    );
  };

  return { copied, copy };
}
