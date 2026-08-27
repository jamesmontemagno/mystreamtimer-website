import { Link } from "react-router-dom";
import { isPluginAvailable, storeLinks } from "../content/siteContent";
import { Icon } from "./Icon";

type StoreBadgesProps = {
  includeStreamDeck?: boolean;
};

export function StoreBadges({ includeStreamDeck = true }: StoreBadgesProps) {
  const pluginHref = storeLinks.streamDeckPlugin;

  return (
    <div className="store-badges">
      <a className="store-badge" href={storeLinks.apple} target="_blank" rel="noreferrer">
        <Icon name="apple" />
        <span>
          <small>Download on the</small>
          <strong>Mac App Store</strong>
        </span>
      </a>
      <a
        className="store-badge"
        href={storeLinks.microsoft}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="windows" />
        <span>
          <small>Get it from</small>
          <strong>Microsoft Store</strong>
        </span>
      </a>
      {includeStreamDeck && pluginHref ? (
        <a className="store-badge" href={pluginHref} target="_blank" rel="noreferrer">
          <Icon name="streamdeck" />
          <span>
            <small>Official plugin for</small>
            <strong>Stream Deck</strong>
          </span>
        </a>
      ) : null}
      {includeStreamDeck && !isPluginAvailable() ? (
        <Link className="store-badge store-badge-soon" to="/streamdeck">
          <Icon name="streamdeck" />
          <span>
            <small>Stream Deck plugin</small>
            <strong>Coming soon</strong>
          </span>
        </Link>
      ) : null}
    </div>
  );
}
