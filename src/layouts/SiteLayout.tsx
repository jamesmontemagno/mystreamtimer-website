import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";

const navItems = [
  { to: "/download", label: "Download" },
  { to: "/screenshots", label: "Screenshots" },
  { to: "/support", label: "Support" },
  { to: "/privacy", label: "Privacy" }
] as const;

type ThemeMode = "system" | "light" | "dark";

const THEME_STORAGE_KEY = "mystreamtimer-theme-mode";

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
