import type { FeatureEntry } from "../content/siteContent";
import { Icon } from "./Icon";

type FeatureGridProps = {
  items: readonly FeatureEntry[];
};

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="feature-grid">
      {items.map((feature) => (
        <article className="card feature-card" key={feature.title}>
          <span className="icon-tile">
            <Icon name={feature.icon} />
          </span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      ))}
    </div>
  );
}
