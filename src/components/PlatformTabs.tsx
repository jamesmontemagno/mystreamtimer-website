import { useId, useRef, type KeyboardEvent } from "react";
import { platformLabels, type Platform } from "../content/siteContent";
import { Icon } from "./Icon";

type PlatformTabsProps = {
  value: Platform;
  onChange: (platform: Platform) => void;
  label: string;
};

const order: readonly Platform[] = ["mac", "windows"];

export function PlatformTabs({ value, onChange, label }: PlatformTabsProps) {
  const id = useId();
  const refs = useRef<Partial<Record<Platform, HTMLButtonElement | null>>>({});

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = order.indexOf(value);
    let next: Platform | undefined;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = order[(index + 1) % order.length];
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = order[(index - 1 + order.length) % order.length];
    } else if (event.key === "Home") {
      next = order[0];
    } else if (event.key === "End") {
      next = order[order.length - 1];
    }

    if (next) {
      event.preventDefault();
      onChange(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <div className="tablist" role="tablist" aria-label={label}>
      {order.map((platform) => (
        <button
          key={platform}
          type="button"
          role="tab"
          id={`${id}-${platform}`}
          className="tab"
          aria-selected={value === platform}
          tabIndex={value === platform ? 0 : -1}
          onClick={() => onChange(platform)}
          onKeyDown={handleKeyDown}
          ref={(node) => {
            refs.current[platform] = node;
          }}
        >
          <Icon name={platform === "mac" ? "apple" : "windows"} />
          {platformLabels[platform]}
        </button>
      ))}
    </div>
  );
}
