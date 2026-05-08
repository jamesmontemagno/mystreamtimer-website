import { Link } from "react-router-dom";
import {
  releaseNotes,
  screenshotItems,
  streamDeckCommands,
  timerTargets,
  troubleshootingItems
} from "../content/siteContent";

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <p className="eyebrow">Built for streamers</p>
        <h1>Reliable countdown and count-up overlays for live shows.</h1>
        <p className="hero-copy">
          My Stream Timer writes directly to files for OBS and SLOBS, supports
          Stream Deck and command line workflows, and helps you keep every segment on
          schedule.
        </p>
        <div className="cta-row">
          <Link className="button button-primary" to="/download">
            Download My Stream Timer
          </Link>
          <Link className="button button-secondary" to="/screenshots">
            View product screenshots
          </Link>
        </div>
      </section>

      <section className="content-panel">
        <h2>OBS and SLOBS integration</h2>
        <ol className="steps-list">
          <li>Open My Stream Timer and copy the output folder path.</li>
          <li>Add a Text source in OBS or SLOBS.</li>
          <li>Enable Read from file and browse to timer output text files.</li>
          <li>Start the timer and your scene overlay updates automatically.</li>
        </ol>
        <p className="muted-line">
          macOS tip: in the file picker, use CMD + SHIFT + G to paste the output
          directory path directly.
        </p>
      </section>

      <section className="content-panel">
        <h2>See it in action</h2>
        <p className="muted-line">
          A quick look at the interface and stream overlay output.
        </p>
        <div className="gallery-grid">
          {screenshotItems.slice(0, 3).map((item) => (
            <figure className="shot-card" key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="cta-row">
          <Link className="button button-secondary" to="/screenshots">
            View all screenshots
          </Link>
        </div>
      </section>

      <section className="content-panel">
        <h2>Stream Deck and command line control</h2>
        <p>
          Trigger timers from Stream Deck website actions or from your command line.
          On Windows you can run:
        </p>
        <pre className="code-block">start mystreamtimer://countdown/?mins=6</pre>
        <div className="command-grid">
          {streamDeckCommands.map((entry) => (
            <article className="command-card" key={entry.command}>
              <code>{entry.command}</code>
              <p>{entry.description}</p>
            </article>
          ))}
        </div>
        <h3>Available timer targets</h3>
        <div className="tag-row">
          {timerTargets.map((target) => (
            <span className="tag" key={target}>
              {target}
            </span>
          ))}
        </div>
      </section>

      <section className="split-panel">
        <article className="content-panel">
          <h2>Troubleshooting highlights</h2>
          <ul className="feature-list">
            {troubleshootingItems.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
          <p>
            Need more help? Visit the <Link to="/support">Support page</Link>.
          </p>
        </article>

        <article className="content-panel">
          <h2>Recent release highlights</h2>
          <div className="release-stack">
            {releaseNotes.map((release) => (
              <section key={release.version}>
                <h3>Version {release.version}</h3>
                <ul className="feature-list">
                  {release.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
