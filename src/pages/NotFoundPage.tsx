import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="content-panel not-found-panel">
      <p className="eyebrow">404</p>
      <h1>This page went off script.</h1>
      <p>
        The link you followed does not exist. Jump back to the main site or browse
        screenshots.
      </p>
      <div className="cta-row">
        <Link className="button button-primary" to="/">
          Return home
        </Link>
        <Link className="button button-secondary" to="/screenshots">
          View screenshots
        </Link>
      </div>
    </section>
  );
}
