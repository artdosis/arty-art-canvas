import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy | Artdosis" },
      { name: "description", content: "How Artdosis collects, uses and protects the information you share with the studio." },
      { property: "og:title", content: "Privacy policy | Artdosis" },
      { property: "og:description", content: "How Artdosis collects, uses and protects your information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="section svc-hero">
      <div className="narrow stack">
        <p className="eyebrow">Legal</p>
        <h1 style={{ fontSize: "clamp(2.4rem,6vw,4rem)" }}>Privacy policy</h1>
        <p className="body-2">
          We only collect what you choose to give us through the forms on this site: your name, email and the details of your enquiry. We
          use it to reply to you and, if you opted in, to send occasional studio news.
        </p>
        <h2 style={{ fontSize: "1.4rem" }}>How we store it</h2>
        <p className="body-2">
          Form submissions are stored in a private Google Sheet accessible only to the Artdosis studio. We do not sell or trade your
          information.
        </p>
        <h2 style={{ fontSize: "1.4rem" }}>Cookies</h2>
        <p className="body-2">
          This site uses a single local preference to remember that you dismissed the cookie notice. No advertising trackers.
        </p>
        <h2 style={{ fontSize: "1.4rem" }}>Your choices</h2>
        <p className="body-2">
          Ask us to correct or delete your details at any time by emailing <a href="mailto:hello@artdosis.com">hello@artdosis.com</a>.
        </p>
      </div>
    </section>
  );
}
