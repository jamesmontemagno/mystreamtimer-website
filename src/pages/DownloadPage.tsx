import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { PluginDownloadLink } from "../components/PluginDownloadLink";
import {
  platformRequirements,
  proFeatures,
  proTiers,
  storeLinks
} from "../content/siteContent";

const downloads = [
  {
    icon: "apple",
    title: "macOS",
    description:
      "Native SwiftUI app with sidebar timers, pop-out windows, Automation, and Pro via the App Store.",
    requirement: platformRequirements.mac,
    href: storeLinks.apple,
    cta: "Open the Mac App Store"
  },
  {
    icon: "windows",
    title: "Windows",
    description:
      "WinUI 3 app with Mica, renameable timers, pop-out windows, and the Automation command builder.",
    requirement: platformRequirements.windows,
    href: storeLinks.microsoft,
    cta: "Open the Microsoft Store"
  }
] as const;

export function DownloadPage() {
  return (
    <div className="page-stack">
      <section className="section-header" aria-labelledby="dl-title">
        <p className="eyebrow">Download</p>
        <h1 id="dl-title">
          Get <span className="gradient-text">My Stream Timer.</span>
        </h1>
        <p className="lede">
          Free to download on both platforms. Your settings, file names, output folder,
          and Pro unlocks carry over from earlier versions automatically.
        </p>
      </section>

      <section aria-label="Downloads">
        <div className="download-grid">
          {downloads.map((item) => (
            <article className="card download-card" key={item.title}>
              <span className="icon-tile">
                <Icon name={item.icon} />
              </span>
              <h2 style={{ fontSize: "1.4rem" }}>{item.title}</h2>
              <p>{item.description}</p>
              <p className="requirement">{item.requirement}</p>
              <a
                className="button button-primary"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.cta}
              </a>
            </article>
          ))}
          <article className="card download-card">
            <span className="icon-tile">
              <Icon name="streamdeck" />
            </span>
            <h2 style={{ fontSize: "1.4rem" }}>Stream Deck plugin</h2>
            <p>
              Four actions to start and control app timers, or run standalone file timers
              without the app.
            </p>
            <p className="requirement">{platformRequirements.streamDeck}</p>
            <PluginDownloadLink className="button button-primary">
              Download the plugin
            </PluginDownloadLink>
          </article>
        </div>
      </section>

      <section className="panel pro-panel" aria-labelledby="pro-dl-title">
        <div>
          <p className="eyebrow">
            <Icon name="sparkles" /> Pro
          </p>
          <h2 id="pro-dl-title">Upgrade inside the app.</h2>
          <p className="lede">
            Pro unlocks the remaining timers and pro-level output options. Choose the plan
            that fits your schedule; all purchases go through the App Store or Microsoft
            Store.
          </p>
          <ul className="check-list">
            {proFeatures.map((item) => (
              <li key={item}>
                <Icon name="check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="tier-list">
          {proTiers.map((tier) => (
            <div className="tier" key={tier.name}>
              <div>
                <strong>{tier.name}</strong>
                <span>{tier.description}</span>
              </div>
              <span className="badge badge-pro">Pro</span>
            </div>
          ))}
        </div>
      </section>

      <section className="split" aria-label="Next steps">
        <article className="card">
          <h2 style={{ fontSize: "1.3rem" }}>Set up OBS in four steps</h2>
          <p className="muted">
            Point a text source at the timer file and you are live. The homepage walks
            through it.
          </p>
          <Link className="button button-secondary button-small" to="/#obs-title">
            See the steps
          </Link>
        </article>
        <article className="card">
          <h2 style={{ fontSize: "1.3rem" }}>Need a hand?</h2>
          <p className="muted">
            Troubleshooting, FAQ, and a direct line to support for anything that is not
            working.
          </p>
          <Link className="button button-secondary button-small" to="/support">
            Visit support
          </Link>
        </article>
      </section>
    </div>
  );
}
