import { Link } from "react-router-dom";
import { CopyButton } from "../components/CopyButton";
import { Icon } from "../components/Icon";
import { PluginDownloadLink } from "../components/PluginDownloadLink";
import { StreamDeckKeys } from "../components/StreamDeckKeys";
import {
  automationExamples,
  isPluginAvailable,
  platformRequirements,
  storeLinks,
  streamDeckActions,
  streamDeckInstallSteps
} from "../content/siteContent";

export function StreamDeckPage() {
  const appActions = streamDeckActions.filter((action) => action.mode === "app");
  const fileActions = streamDeckActions.filter((action) => action.mode === "file");

  return (
    <div className="page-stack">
      <section className="hero" aria-labelledby="sd-hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Official plugin · version 2.0</p>
          <h1 id="sd-hero-title">
            My Stream Timer <span className="gradient-text">for Stream Deck.</span>
          </h1>
          <p className="lede">
            Start and control countdowns, count-ups, and clocks from one keypress, in the
            app or straight to a text file for OBS. Built on Elgato's official SDK for
            Stream Deck 7.1+ on macOS and Windows.
          </p>
          <div className="cta-row">
            <PluginDownloadLink className="button button-primary">
              <Icon name="streamdeck" />
              Download the plugin
            </PluginDownloadLink>
            <Link className="button button-secondary" to="/download">
              Get the desktop app
            </Link>
          </div>
          {!isPluginAvailable() ? (
            <p className="small muted" style={{ marginTop: "0.75rem" }}>
              The plugin is in final review for the Elgato Marketplace. Until it lands,
              use the Stream Deck <strong>System › Website</strong> action with the{" "}
              <Link to="/automation">automation commands</Link>.
            </p>
          ) : null}
          <div className="hero-meta">
            <span>
              <Icon name="check" /> {platformRequirements.streamDeck}
            </span>
            <span>
              <Icon name="check" /> Free, no account required
            </span>
          </div>
        </div>
        <div>
          <StreamDeckKeys />
        </div>
      </section>

      <section aria-labelledby="modes-title">
        <div className="section-header">
          <p className="eyebrow">Two ways to run a timer</p>
          <h2 id="modes-title">Drive the app, or skip it entirely.</h2>
          <p className="lede">
            App Timer actions talk to My Stream Timer through the{" "}
            <code>mystreamtimer://</code> protocol. Stream Deck file timers run inside the
            plugin and write their own text file, so a key works even on a machine without
            the app.
          </p>
        </div>
        <div className="split">
          <article className="card card-strong">
            <span className="badge badge-brand">App timers</span>
            <h3 style={{ marginTop: "0.8rem" }}>Control the desktop app</h3>
            <p className="muted">
              Uses the timers, formats, and pop-out windows you configured in My Stream
              Timer. The app launches automatically if it is closed.
            </p>
            <div className="action-grid" style={{ gridTemplateColumns: "1fr" }}>
              {appActions.map((action) => (
                <div key={action.name}>
                  <h4 style={{ marginBottom: "0.25rem" }}>{action.name}</h4>
                  <p className="muted small" style={{ margin: 0 }}>
                    {action.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>
          <article className="card card-strong">
            <span className="badge badge-live">File timers</span>
            <h3 style={{ marginTop: "0.8rem" }}>Run standalone, straight to a file</h3>
            <p className="muted">
              Output defaults to{" "}
              <code>Documents/MyStreamTimerStreamDeck/countdown.txt</code>. Point any OBS
              text source at it and you are done.
            </p>
            <div className="action-grid" style={{ gridTemplateColumns: "1fr" }}>
              {fileActions.map((action) => (
                <div key={action.name}>
                  <h4 style={{ marginBottom: "0.25rem" }}>{action.name}</h4>
                  <p className="muted small" style={{ margin: 0 }}>
                    {action.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="install-title">
        <div className="section-header">
          <p className="eyebrow">Setup</p>
          <h2 id="install-title">Installed in under a minute.</h2>
        </div>
        <div className="steps-grid">
          {streamDeckInstallSteps.map((step, index) => (
            <article className="card step-card" key={step}>
              <h3>Step {index + 1}</h3>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="upgrade-title">
        <div className="split split-wide">
          <div>
            <p className="eyebrow">Upgrading from the legacy plugin</p>
            <h2 id="upgrade-title">Version 2 is a clean break.</h2>
            <p className="muted">
              The new plugin uses a new plugin UUID and action model, so keys created with
              the old StreamDeckLib plugin will stop responding. Remove them, install
              version 2, and add the new actions from the <strong>My Stream Timer</strong>{" "}
              category. Your desktop app settings are not affected.
            </p>
            <p className="muted">
              Releases are published as <code>v2.x.x-streamdeck</code> tags on GitHub with
              a SHA-256 checksum alongside the installer.
            </p>
          </div>
          <div className="card">
            <h3>No Stream Deck? No problem.</h3>
            <p className="muted small">
              Any launcher that can open a URL can trigger a timer. Use the Stream Deck{" "}
              <strong>System › Website</strong> action, Deckboard with the{" "}
              <a href={storeLinks.deckboard} target="_blank" rel="noreferrer">
                community extension
              </a>
              , macOS Shortcuts, or a script.
            </p>
            <div className="cta-row" style={{ marginTop: "0.75rem" }}>
              <Link className="button button-secondary button-small" to="/automation">
                All automation commands
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="fallback-title">
        <div className="section-header">
          <p className="eyebrow">Protocol fallback</p>
          <h2 id="fallback-title">Popular commands for a Website action.</h2>
        </div>
        <div className="command-list">
          {automationExamples.slice(0, 6).map((entry) => (
            <article className="card command-card" key={entry.command}>
              <div>
                <code>{entry.command}</code>
                <p>{entry.description}</p>
              </div>
              <CopyButton text={entry.command} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
