import { screenshotItems } from "../content/siteContent";

export function ScreenshotsPage() {
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
        {screenshotItems.map((item) => (
          <figure className="shot-card" key={item.src}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
