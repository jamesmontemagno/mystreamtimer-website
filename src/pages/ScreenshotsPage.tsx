import { useState } from "react";
import { PlatformTabs } from "../components/PlatformTabs";
import { ScreenshotGallery } from "../components/ScreenshotGallery";
import { platformLabels, screenshotItems, type Platform } from "../content/siteContent";

export function ScreenshotsPage() {
  const [platform, setPlatform] = useState<Platform>("mac");
  const items = screenshotItems.filter((item) => item.platform === platform);

  return (
    <div className="page-stack">
      <section className="tabs-header" aria-labelledby="shots-title">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <p className="eyebrow">Screenshots</p>
          <h1 id="shots-title">
            A look at <span className="gradient-text">{platformLabels[platform]}.</span>
          </h1>
          <p className="lede">
            Timer dashboard, pop-out overlays, OBS integration, the Current Time clock,
            and the Automation command builder. Click any image for a closer look.
          </p>
        </div>
        <PlatformTabs value={platform} onChange={setPlatform} label="Choose a platform" />
      </section>

      <section aria-label={`${platformLabels[platform]} screenshot gallery`}>
        <ScreenshotGallery
          items={items}
          label={`${platformLabels[platform]} screenshots`}
        />
      </section>
    </div>
  );
}
