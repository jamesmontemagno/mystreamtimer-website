import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="not-found" aria-labelledby="nf-title">
      <p className="code gradient-text">404</p>
      <h1 id="nf-title" style={{ fontSize: "2rem" }}>
        That timer ran out.
      </h1>
      <p className="lede">The page you were looking for does not exist or has moved.</p>
      <div className="cta-row" style={{ justifyContent: "center" }}>
        <Link className="button button-primary" to="/">
          Back to home
        </Link>
        <Link className="button button-secondary" to="/download">
          Download the app
        </Link>
      </div>
    </section>
  );
}
