import type { ReactNode } from "react";
import { storeLinks } from "../content/siteContent";
import { Icon } from "./Icon";

type PluginDownloadLinkProps = {
  className?: string;
  children: ReactNode;
  comingSoonLabel?: string;
};

/**
 * Renders the Stream Deck plugin download as a link when `storeLinks.streamDeckPlugin`
 * is set, otherwise as a disabled "Coming soon" button so every call site stays in sync.
 */
export function PluginDownloadLink({
  className = "button button-primary",
  children,
  comingSoonLabel = "Coming soon"
}: PluginDownloadLinkProps) {
  const href = storeLinks.streamDeckPlugin;

  if (!href) {
    return (
      <button
        type="button"
        className={`${className} button-disabled`}
        disabled
        aria-disabled="true"
        title="The Stream Deck plugin is not available for download yet."
      >
        <Icon name="clock" />
        {comingSoonLabel}
      </button>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
