import { storeLinks } from "../content/siteContent";

const downloads = [
  {
    title: "Apple App Store",
    description: "Install My Stream Timer for macOS.",
    href: storeLinks.apple
  },
  {
    title: "Microsoft Store",
    description: "Install My Stream Timer for Windows.",
    href: storeLinks.microsoft
  }
] as const;

export function DownloadPage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <p className="eyebrow">Download</p>
        <h1>Get My Stream Timer</h1>
        <p className="hero-copy">
          Choose your platform below to install the app. Need setup help after
          install? Visit Support for quick troubleshooting tips.
        </p>
      </section>

      <section className="content-panel">
        <div className="download-grid">
          {downloads.map((item) => (
            <article className="download-card" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a className="button button-primary" href={item.href} target="_blank" rel="noreferrer">
                Open Store Listing
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
