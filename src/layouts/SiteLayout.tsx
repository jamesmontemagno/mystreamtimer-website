import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  seoEntries,
  siteMetadata,
  storeLinks,
  type SeoEntry
} from "../content/siteContent";
import { Icon } from "../components/Icon";

const navItems = [
  { to: "/download", label: "Download" },
  { to: "/streamdeck", label: "Stream Deck" },
  { to: "/automation", label: "Automation" },
  { to: "/screenshots", label: "Screenshots" },
  { to: "/support", label: "Support" }
] as const;

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "mystreamtimer-theme-mode";

function getCanonicalUrl(path: string) {
  return path === "/" ? `${siteMetadata.siteUrl}/` : `${siteMetadata.siteUrl}${path}`;
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);

  if (!meta) {
    meta = document.createElement("meta");
    document.head.append(meta);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    meta.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let link = document.head.querySelector<HTMLLinkElement>(selector);

  if (!link) {
    link = document.createElement("link");
    document.head.append(link);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    link.setAttribute(key, value);
  });
}

function upsertJsonLd(schemaId: string, json: object) {
  const selector = `script[data-seo-schema="${schemaId}"]`;
  let script = document.head.querySelector<HTMLScriptElement>(selector);

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-schema", schemaId);
    document.head.append(script);
  }

  script.textContent = JSON.stringify(json);
}

function getInitialThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  // Dark is the brand default; light is opt-in via the header toggle.
  return window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function SiteLayout() {
  const location = useLocation();
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const notFoundSeo = seoEntries["/404"];

  if (!notFoundSeo) {
    throw new Error("Missing 404 SEO entry");
  }

  const seoEntry: SeoEntry = seoEntries[location.pathname] ?? notFoundSeo;

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    applyTheme(themeMode);
  }, [themeMode]);

  useEffect(() => {
    setIsMobileNavOpen(false);
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const handleChange = () => {
      if (!mediaQuery.matches) {
        setIsMobileNavOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(seoEntry.path);
    const robots = seoEntry.robots ?? "index, follow";

    document.title = seoEntry.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: seoEntry.description
    });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: siteMetadata.siteName
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: seoEntry.title
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seoEntry.description
    });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: siteMetadata.defaultSocialImage
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: siteMetadata.defaultSocialImageAlt
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image"
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: seoEntry.title
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seoEntry.description
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: siteMetadata.defaultSocialImage
    });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    upsertJsonLd("app", {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteMetadata.siteName,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "macOS, Windows",
      softwareVersion: "3.0",
      description: siteMetadata.defaultDescription,
      url: siteMetadata.siteUrl,
      image: siteMetadata.defaultSocialImage,
      author: { "@type": "Organization", name: "Refractored LLC" },
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          category: "macOS",
          url: storeLinks.apple
        },
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          category: "Windows",
          url: storeLinks.microsoft
        }
      ]
    });

    upsertJsonLd("plugin", {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "My Stream Timer for Stream Deck",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "macOS, Windows",
      softwareVersion: "2.0",
      description:
        "Official Stream Deck plugin to start and control My Stream Timer timers or run standalone file timers for OBS.",
      url: `${siteMetadata.siteUrl}/streamdeck`,
      ...(storeLinks.streamDeckPlugin
        ? { downloadUrl: storeLinks.streamDeckPlugin }
        : {}),
      author: { "@type": "Organization", name: "Refractored LLC" }
    });
  }, [seoEntry]);

  const toggleTheme = () => {
    setThemeMode((current) => (current === "dark" ? "light" : "dark"));
  };

  const themeLabel =
    themeMode === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand-link" aria-label="My Stream Timer home">
            <img
              src="/icon-256.png"
              alt=""
              className="brand-icon"
              width={34}
              height={34}
            />
            <span>My Stream Timer</span>
          </Link>

          <nav
            id="primary-navigation"
            className={isMobileNavOpen ? "site-nav is-open" : "site-nav"}
            aria-label="Primary"
          >
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? "nav-link nav-link-active" : "nav-link"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
            >
              <Icon name={themeMode === "dark" ? "sun" : "moon"} />
            </button>
            <Link
              className="button button-primary button-small header-store"
              to="/download"
            >
              Download
            </Link>
            <button
              type="button"
              className="icon-button mobile-nav-toggle"
              aria-expanded={isMobileNavOpen}
              aria-controls="primary-navigation"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileNavOpen((current) => !current)}
            >
              <span aria-hidden="true">{isMobileNavOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="container page-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="brand-link">
                <img
                  src="/icon-256.png"
                  alt=""
                  className="brand-icon"
                  width={34}
                  height={34}
                />
                <span>My Stream Timer</span>
              </Link>
              <p>
                Countdown, count-up, and clock overlays for live creators on macOS and
                Windows, with an official Stream Deck plugin.
              </p>
            </div>
            <div className="footer-col">
              <h3>Product</h3>
              <ul>
                <li>
                  <Link to="/download">Download</Link>
                </li>
                <li>
                  <Link to="/streamdeck">Stream Deck plugin</Link>
                </li>
                <li>
                  <Link to="/automation">Automation commands</Link>
                </li>
                <li>
                  <Link to="/screenshots">Screenshots</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Resources</h3>
              <ul>
                <li>
                  <Link to="/support">Support & FAQ</Link>
                </li>
                <li>
                  <a href={storeLinks.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={storeLinks.youtubeWalkthrough}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Video walkthrough
                  </a>
                </li>
                <li>
                  <a href={storeLinks.tinyToolTown} target="_blank" rel="noreferrer">
                    More at Tiny Tool Town
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href={storeLinks.supportEmail}>Contact support</a>
                </li>
                <li>
                  <Link to="/privacy">Privacy policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Refractored LLC. All rights reserved.</p>
            <p>
              Stream Deck is a trademark of Corsair Memory, Inc. OBS is a trademark of
              Wizards of OBS LLC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
