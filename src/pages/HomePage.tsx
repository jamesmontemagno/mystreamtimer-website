import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CommandBuilder } from "../components/CommandBuilder";
import { FeatureGrid } from "../components/FeatureGrid";
import { Icon } from "../components/Icon";
import { PlatformTabs } from "../components/PlatformTabs";
import { PluginDownloadLink } from "../components/PluginDownloadLink";
import { ScreenshotGallery, ScreenshotPicture } from "../components/ScreenshotGallery";
import { StoreBadges } from "../components/StoreBadges";
import { StreamDeckKeys } from "../components/StreamDeckKeys";
import { TimerDemo } from "../components/TimerDemo";
import { YouTubeEmbed } from "../components/YouTubeEmbed";
import {
  changelog,
  features,
  obsSteps,
  platformLabels,
  proFeatures,
  proTiers,
  screenshotItems,
  storeLinks,
  streamDeckActions,
  type Platform
} from "../content/siteContent";

const HERO_START_SECONDS = 2 * 60 + 32;

function formatClock(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

function useFakeCountdown(start: number) {
  const [remaining, setRemaining] = useState(start);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const interval = window.setInterval(() => {
      setRemaining((current) => (current <= 0 ? start : current - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [start]);

  return remaining;
}

export function HomePage() {
  const remaining = useFakeCountdown(HERO_START_SECONDS);
  const [platform, setPlatform] = useState<Platform>("mac");
  const heroMac = screenshotItems.find((item) => item.platform === "mac");
  const heroWindows = screenshotItems.find((item) => item.platform === "windows");
  const galleryItems = screenshotItems
    .filter((item) => item.platform === platform)
    .slice(0, 3);

  return (
    <div className="page-stack">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">macOS · Windows · Stream Deck</p>
          <h1 id="hero-title">
            Timers your stream <span className="gradient-text">can actually read.</span>
          </h1>
          <p className="lede">
            My Stream Timer writes live countdown, count-up, and clock text files that OBS
            and Streamlabs pick up instantly. Control every timer from the app, a Stream
            Deck key, or a single <code>mystreamtimer://</code> link.
          </p>
          <div className="hero-badges">
            <StoreBadges />
          </div>
          <div className="hero-meta">
            <span>
              <Icon name="check" /> Free to start, Pro for more timers
            </span>
            <span>
              <Icon name="check" /> Rebuilt for Windows 11 and macOS
            </span>
            <span>
              <Icon name="check" /> Official Stream Deck plugin 2.0
            </span>
          </div>
          <div className="cta-row" style={{ marginTop: "1rem" }}>
            <a className="button button-ghost button-small" href="#demo-title">
              <Icon name="play" />
              Try the live demo
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="live-chip">Starting in {formatClock(remaining)}</div>
          {heroWindows ? (
            <div className="device device-back">
              <ScreenshotPicture item={heroWindows} loading="eager" />
            </div>
          ) : null}
          {heroMac ? (
            <div className="device device-front">
              <ScreenshotPicture item={heroMac} loading="eager" />
            </div>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="demo-title">
        <div className="section-header">
          <p className="eyebrow">Try it right here</p>
          <h2 id="demo-title">This is the whole idea.</h2>
          <p className="lede">
            Press Start. The app writes a line of text to <code>countdown.txt</code> every
            second, and OBS shows whatever is in the file. Change the prefix, add a
            minute, let it hit zero.
          </p>
        </div>
        <TimerDemo />
      </section>

      <section aria-labelledby="features-title">
        <div className="section-header">
          <p className="eyebrow">Everything a live show needs</p>
          <h2 id="features-title">Built for the moments between segments.</h2>
          <p className="lede">
            Intros, breaks, giveaways, speedruns, and “back at the top of the hour”. One
            app keeps every timer honest and every overlay in sync.
          </p>
        </div>
        <FeatureGrid items={features} />
      </section>

      <section aria-labelledby="obs-title">
        <div className="section-header">
          <p className="eyebrow">Works with OBS, Streamlabs, and more</p>
          <h2 id="obs-title">Four steps to a live overlay.</h2>
          <p className="lede">
            No plugins, browser sources, or websockets. Just a text file that updates
            every second.
          </p>
        </div>
        <div className="steps-grid">
          {obsSteps.map((step) => (
            <article className="card step-card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="screens-title">
        <div className="tabs-header">
          <div>
            <p className="eyebrow">Native on both platforms</p>
            <h2 id="screens-title">See it on {platformLabels[platform]}.</h2>
          </div>
          <PlatformTabs
            value={platform}
            onChange={setPlatform}
            label="Choose a platform"
          />
        </div>
        <ScreenshotGallery
          items={galleryItems}
          label={`${platformLabels[platform]} screenshots`}
        />
        <div className="cta-row">
          <Link className="button button-secondary" to="/screenshots">
            View all screenshots
          </Link>
        </div>
      </section>

      <section className="panel" aria-labelledby="sd-title">
        <div className="split split-wide">
          <div>
            <p className="eyebrow">Official Stream Deck plugin</p>
            <h2 id="sd-title">Every timer, one key away.</h2>
            <p className="lede">
              Start a five-minute break, pause for a raid, add a minute when chat wants
              more, or stop everything. The plugin controls the app or runs its own file
              timers when the app is not even open.
            </p>
            <ul className="check-list">
              {streamDeckActions.map((action) => (
                <li key={action.name}>
                  <Icon name="check" />
                  <span>
                    <strong>{action.name}</strong> — {action.summary}
                  </span>
                </li>
              ))}
            </ul>
            <div className="cta-row">
              <Link className="button button-primary" to="/streamdeck">
                <Icon name="streamdeck" />
                Explore the plugin
              </Link>
              <PluginDownloadLink className="button button-secondary">
                Download plugin
              </PluginDownloadLink>
            </div>
          </div>
          <StreamDeckKeys />
        </div>
      </section>

      <section aria-labelledby="automation-title">
        <div className="section-header">
          <p className="eyebrow">Automation</p>
          <h2 id="automation-title">Control it from anywhere with a URL.</h2>
          <p className="lede">
            Any tool that can open a link can drive My Stream Timer: Stream Deck,
            Shortcuts, Raycast, Alfred, PowerShell, a browser bookmark. Build a command
            below and copy it.
          </p>
        </div>
        <div className="panel">
          <CommandBuilder />
        </div>
        <div className="cta-row">
          <Link className="button button-secondary" to="/automation">
            Browse the full command reference
          </Link>
        </div>
      </section>

      <section className="panel pro-panel" aria-labelledby="pro-title">
        <div>
          <p className="eyebrow">
            <Icon name="sparkles" /> My Stream Timer Pro
          </p>
          <h2 id="pro-title">Unlock the full production desk.</h2>
          <p className="lede">
            The free app includes three countdowns and a count-up. Pro adds the rest and
            helps fund the app and plugin.
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
        <div>
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
          <p className="small muted" style={{ marginTop: "1rem" }}>
            Purchased in-app through the Mac App Store or Microsoft Store. Pricing is
            shown in your local currency inside the app.
          </p>
        </div>
      </section>

      <section aria-labelledby="new-title">
        <div className="section-header">
          <p className="eyebrow">What's new</p>
          <h2 id="new-title">Rebuilt from the ground up.</h2>
          <p className="lede">
            Version 3.0 is a fresh start on both platforms, and the Stream Deck plugin
            moved to Elgato's official SDK.
          </p>
        </div>
        <div className="timeline">
          {changelog.map((entry) => (
            <article className="card timeline-item" key={entry.title}>
              <div className="timeline-meta">
                <span className="version">v{entry.version}</span>
                <span className="badge badge-brand">
                  {entry.platform === "mac"
                    ? "macOS"
                    : entry.platform === "windows"
                      ? "Windows"
                      : "Stream Deck"}
                </span>
              </div>
              <div>
                <h3>{entry.title}</h3>
                <ul>
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="video-title">
        <div className="section-header centered">
          <p className="eyebrow">Walkthrough</p>
          <h2 id="video-title">See a full setup in a few minutes.</h2>
        </div>
        <YouTubeEmbed
          videoId={storeLinks.youtubeVideoId}
          title="My Stream Timer walkthrough"
        />
      </section>

      <section className="panel cta-band" aria-labelledby="cta-title">
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          Ready when you are
        </p>
        <h2 id="cta-title">Put a timer on your next stream.</h2>
        <p className="lede">
          Free on the Mac App Store and Microsoft Store. Plugin included.
        </p>
        <StoreBadges />
      </section>
    </div>
  );
}
