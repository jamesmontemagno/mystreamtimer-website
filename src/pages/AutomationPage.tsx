import { Link } from "react-router-dom";
import { CommandBuilder } from "../components/CommandBuilder";
import { CopyButton } from "../components/CopyButton";
import {
  automationExamples,
  automationVerbs,
  buildAutomationUrl,
  timerTargets
} from "../content/siteContent";

export function AutomationPage() {
  return (
    <div className="page-stack">
      <section className="section-header" aria-labelledby="auto-title">
        <p className="eyebrow">Automation</p>
        <h1 id="auto-title">
          One URL scheme, <span className="gradient-text">every timer.</span>
        </h1>
        <p className="lede">
          My Stream Timer registers the <code>mystreamtimer://</code> protocol on macOS
          and Windows. Open a link and the app starts, adjusts, or stops the matching
          timer, even if it is not running yet. The same links power the Stream Deck
          plugin, Shortcuts, Raycast, Alfred, and plain shell scripts.
        </p>
      </section>

      <section className="panel" aria-labelledby="builder-title">
        <div className="section-header">
          <p className="eyebrow">Command builder</p>
          <h2 id="builder-title">Build it, copy it, bind it.</h2>
        </div>
        <CommandBuilder />
      </section>

      <section aria-labelledby="targets-title">
        <div className="section-header">
          <p className="eyebrow">Targets</p>
          <h2 id="targets-title">Pick the timer in the host.</h2>
          <p className="lede">
            Replace <code>countdown</code> with any of these to control a different timer.
          </p>
        </div>
        <div className="tag-row">
          {timerTargets.map((target) => (
            <span className="tag" key={target.id}>
              {target.id}
              {target.pro ? " · Pro" : ""}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="reference-title">
        <div className="section-header">
          <p className="eyebrow">Reference</p>
          <h2 id="reference-title">Every command.</h2>
        </div>
        <div className="card table-wrap">
          <table className="reference-table">
            <thead>
              <tr>
                <th scope="col">Command</th>
                <th scope="col">What it does</th>
                <th scope="col">Works with</th>
              </tr>
            </thead>
            <tbody>
              {automationVerbs.map((verb) => {
                const sampleTarget = verb.kinds.includes("countdown")
                  ? "countdown"
                  : verb.kinds.includes("countup")
                    ? "countup"
                    : "time";
                const sample = buildAutomationUrl(
                  sampleTarget,
                  verb.id,
                  verb.param ? verb.defaultValue : undefined
                );
                return (
                  <tr key={verb.id}>
                    <td>
                      <code>{sample}</code>
                    </td>
                    <td>{verb.description}</td>
                    <td>
                      {verb.kinds
                        .map((kind) =>
                          kind === "countdown"
                            ? "Countdowns"
                            : kind === "countup"
                              ? "Count-ups"
                              : "Current Time"
                        )
                        .join(", ")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="examples-title">
        <div className="section-header">
          <p className="eyebrow">Examples</p>
          <h2 id="examples-title">Copy-paste favourites.</h2>
        </div>
        <div className="command-list">
          {automationExamples.map((entry) => (
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

      <section className="split" aria-labelledby="shell-title">
        <article className="card">
          <h2 id="shell-title" style={{ fontSize: "1.3rem" }}>
            From the command line
          </h2>
          <p className="muted">
            Windows registers the protocol when you install from the Microsoft Store;
            macOS when you first launch the app.
          </p>
          <span className="code-block-label">Windows</span>
          <pre className="code-block">start mystreamtimer://countdown/?mins=6</pre>
          <span className="code-block-label" style={{ marginTop: "0.8rem" }}>
            macOS
          </span>
          <pre className="code-block">open "mystreamtimer://countdown/?mins=6"</pre>
        </article>
        <article className="card">
          <h2 style={{ fontSize: "1.3rem" }}>Prefer buttons?</h2>
          <p className="muted">
            The Stream Deck plugin wraps all of these commands in configurable actions,
            and the in-app Automation page builds them for you with a Run in App test
            button.
          </p>
          <div className="cta-row">
            <Link className="button button-primary button-small" to="/streamdeck">
              Stream Deck plugin
            </Link>
            <Link className="button button-secondary button-small" to="/download">
              Download the app
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
