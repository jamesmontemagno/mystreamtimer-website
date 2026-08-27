import { useEffect, useState } from "react";
import { Icon } from "./Icon";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

export function CopyButton({ text, label = "Copy", className }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") {
      return;
    }
    const timeout = window.setTimeout(() => setState("idle"), 1800);
    return () => window.clearTimeout(timeout);
  }, [state]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  const message =
    state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label;

  return (
    <button
      type="button"
      className={className ?? "button button-secondary button-small"}
      onClick={handleCopy}
      aria-label={`${label}: ${text}`}
    >
      <Icon name={state === "copied" ? "check" : "copy"} />
      <span aria-live="polite">{message}</span>
    </button>
  );
}
