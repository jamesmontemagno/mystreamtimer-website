import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { faqItems, storeLinks, troubleshootingItems } from "../content/siteContent";

export function SupportPage() {
  return (
    <div className="page-stack">
      <section className="section-header" aria-labelledby="support-title">
        <p className="eyebrow">Support</p>
        <h1 id="support-title">
          We will get you <span className="gradient-text">back on air.</span>
        </h1>
        <p className="lede">
          Most issues come down to the text source path or a system permission. Start with
          the fixes below, then reach out with your OS, app version, and what you tried.
        </p>
        <div className="cta-row">
          <a className="button button-primary" href={storeLinks.supportEmail}>
            <Icon name="mail" />
            Email support
          </a>
          <a
            className="button button-secondary"
            href={storeLinks.githubIssues}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" />
            Open a GitHub issue
          </a>
        </div>
      </section>

      <section aria-labelledby="fixes-title">
        <div className="section-header">
          <p className="eyebrow">Troubleshooting</p>
          <h2 id="fixes-title">Common fixes.</h2>
        </div>
        <div className="split">
          {troubleshootingItems.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="muted" style={{ margin: 0 }}>
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-title">
        <div className="section-header">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title">Questions we hear a lot.</h2>
        </div>
        <div className="faq">
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="split" aria-label="More help">
        <article className="card">
          <h3>Before you write in</h3>
          <ul className="check-list" style={{ marginTop: "0.75rem" }}>
            <li>
              <Icon name="check" />
              <span>
                Your operating system and the app version from About or Settings.
              </span>
            </li>
            <li>
              <Icon name="check" />
              <span>Which timer and file you are using in OBS or Streamlabs.</span>
            </li>
            <li>
              <Icon name="check" />
              <span>A screenshot or short recording of the issue, if possible.</span>
            </li>
          </ul>
        </article>
        <article className="card">
          <h3>Looking for something else?</h3>
          <p className="muted">
            Automation commands, Stream Deck setup, and downloads each have their own
            page.
          </p>
          <div className="cta-row" style={{ marginTop: "0.5rem" }}>
            <Link className="button button-secondary button-small" to="/automation">
              Automation
            </Link>
            <Link className="button button-secondary button-small" to="/streamdeck">
              Stream Deck
            </Link>
            <Link className="button button-secondary button-small" to="/download">
              Download
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
