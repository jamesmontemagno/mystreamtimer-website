import { useEffect, useState } from "react";
import { screenshotItems } from "../content/siteContent";

export function ScreenshotsPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex]);

  const selectedItem = selectedIndex === null ? null : screenshotItems[selectedIndex];

  return (
    <div className="page-stack">
      <section className="content-panel">
        <h1>Product screenshots</h1>
        <p>
          A quick visual tour of My Stream Timer workflows for overlays, controls, and
          scene-ready output.
        </p>
      </section>

      <section className="gallery-grid" aria-label="Screenshot gallery">
        {screenshotItems.map((item, index) => (
          <figure className="shot-card" key={item.src}>
            <button
              type="button"
              className="shot-trigger"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open ${item.alt} in a larger view`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </section>

      {selectedItem ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Large view: ${selectedItem.alt}`}
          onClick={() => setSelectedIndex(null)}
        >
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close screenshot preview"
            >
              ×
            </button>
            <img src={selectedItem.src} alt={selectedItem.alt} className="lightbox-image" />
            <p className="lightbox-caption">{selectedItem.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
