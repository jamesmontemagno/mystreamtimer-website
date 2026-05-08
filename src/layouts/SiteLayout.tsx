import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { seoEntries, siteMetadata, type SeoEntry } from "../content/siteContent";

const navItems = [
  { to: "/download", label: "Download" },
  { to: "/screenshots", label: "Screenshots" },
  { to: "/support", label: "Support" },
  { to: "/privacy", label: "Privacy" }
] as const;

type ThemeMode = "system" | "light" | "dark";

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

function upsertJsonLd(selector: string, json: object) {
  let script = document.head.querySelector<HTMLScriptElement>(selector);

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-schema", "website");
    document.head.append(script);
  }

  script.textContent = JSON.stringify(json);
}

function getInitialThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "system";
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

  const resolvedTheme = useMemo(() => {
    if (themeMode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return themeMode;
  }, [themeMode]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (themeMode === "system") {
        const nextResolved = mediaQuery.matches ? "dark" : "light";
        document.documentElement.dataset.theme = nextResolved;
        document.documentElement.style.colorScheme = nextResolved;
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [themeMode]);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

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
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: robots
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website"
    });
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
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl
    });
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
    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl
    });
    upsertJsonLd('script[data-seo-schema="website"]', {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteMetadata.siteName,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "macOS, Windows",
      description: siteMetadata.defaultDescription,
      url: siteMetadata.siteUrl,
      image: siteMetadata.defaultSocialImage,
      offers: [
        {
          "@type": "Offer",
          category: "macOS",
          url: "https://mystreamtimer.com/download"
        },
        {
          "@type": "Offer",
          category: "Windows",
          url: "https://mystreamtimer.com/download"
        }
      ]
    });
  }, [seoEntry]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-block">
            <Link to="/" className="brand-link">
              <p className="brand">My Stream Timer</p>
              <p className="brand-subtitle">A precision timer utility for live creators</p>
            </Link>
            <button
              type="button"
              className="mobile-nav-toggle"
              aria-expanded={isMobileNavOpen}
              aria-controls="primary-navigation"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileNavOpen((current) => !current)}
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
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
        </div>
      </header>

      <main className="container page-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <p>Copyright Refractored LLC</p>
          <div className="footer-controls">
            <div className="footer-links">
              <NavLink to="/download">Download</NavLink>
              <a href="mailto:refractoredllc@gmail.com?subject=My%20Stream%20Timer%20Support">
                Contact Support
              </a>
            </div>
            <label className="theme-select-wrap" htmlFor="theme-mode">
              <span>Theme</span>
              <select
                id="theme-mode"
                className="theme-select"
                value={themeMode}
                onChange={(event) => setThemeMode(event.target.value as ThemeMode)}
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>
        </div>
      </footer>
    </div>
  );
}
