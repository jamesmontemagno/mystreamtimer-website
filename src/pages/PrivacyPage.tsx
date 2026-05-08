export function PrivacyPage() {
  return (
    <div className="page-stack">
      <section className="content-panel">
        <h1>Privacy policy</h1>
        <p className="muted-line">Last updated: February 17, 2022</p>
        <p>
          Refractored LLC respects your privacy. This policy describes how information
          is handled when using My Stream Timer and this website.
        </p>
      </section>

      <section className="split-panel">
        <article className="content-panel">
          <h2>Collected data</h2>
          <p>My Stream Timer does not collect personal data from users.</p>

          <h2>Data shared with third parties</h2>
          <p>My Stream Timer does not share personal data with third parties.</p>
        </article>

        <article className="content-panel">
          <h2>Your consent</h2>
          <p>
            By using the app or this website, you consent to this privacy policy.
          </p>

          <h2>Policy updates</h2>
          <p>
            This policy may be updated over time. Continued use after updates implies
            acceptance of the revised policy.
          </p>
        </article>
      </section>

      <section className="content-panel">
        <h2>Contact</h2>
        <p>
          Questions about privacy can be sent to {" "}
          <a href="mailto:refractoredllc@gmail.com?subject=My%20Stream%20Timer%20Support%20-%20Privacy">
            refractoredllc@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
