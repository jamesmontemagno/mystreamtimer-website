import { Link } from "react-router-dom";

export function SupportPage() {
  return (
    <div className="page-stack">
      <section className="content-panel">
        <h1>Support</h1>
        <p>
          If something is not behaving as expected, we are here to help. Include your
          operating system, app version, and a short description of what you tried.
        </p>
        <p>
          Contact: {" "}
          <a href="mailto:refractoredllc@gmail.com?subject=My%20Stream%20Timer%20Support">
            refractoredllc@gmail.com
          </a>
        </p>
      </section>

      <section className="split-panel">
        <article className="content-panel">
          <h2>Support checklist</h2>
          <ul className="feature-list">
            <li>Confirm app permissions for file access on your OS.</li>
            <li>Check the exact timer file linked in your OBS text source.</li>
            <li>Verify audio output settings if beeps are muted.</li>
            <li>Share screenshots or a quick recording of the issue if possible.</li>
          </ul>
        </article>

        <article className="content-panel">
          <h2>Get the app</h2>
          <p className="muted-line">
            Download links are organized in one place on the Download page.
          </p>
          <div className="cta-row">
            <Link className="button button-secondary" to="/download">
              Open Download page
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
