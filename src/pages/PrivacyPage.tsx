import { storeLinks } from "../content/siteContent";

export function PrivacyPage() {
  return (
    <div className="page-stack">
      <section className="section-header" aria-labelledby="privacy-title">
        <p className="eyebrow">Legal</p>
        <h1 id="privacy-title">Privacy policy</h1>
        <p className="muted small">Last updated: February 17, 2022</p>
        <p className="lede">
          Refractored LLC respects your privacy. This policy describes how information is
          handled when using My Stream Timer, the Stream Deck plugin, and this website.
        </p>
      </section>

      <section className="panel prose">
        <h2>Collected data</h2>
        <p>
          My Stream Timer does not collect personal data from users. Timer output files
          are written only to the folder you choose on your own computer.
        </p>

        <h2>Data shared with third parties</h2>
        <p>My Stream Timer does not share personal data with third parties.</p>

        <h2>Purchases</h2>
        <p>
          Pro purchases and subscriptions are processed by Apple or Microsoft through
          their stores. Refractored LLC does not receive your payment details.
        </p>

        <h2>Your consent</h2>
        <p>By using the app or this website, you consent to this privacy policy.</p>

        <h2>Policy updates</h2>
        <p>
          This policy may be updated over time. Continued use after updates implies
          acceptance of the revised policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy can be sent to{" "}
          <a href={storeLinks.supportEmail}>refractoredllc@gmail.com</a>.
        </p>
      </section>
    </div>
  );
}
