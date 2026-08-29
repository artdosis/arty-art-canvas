import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use | Artdosis" },
      { name: "description", content: "The terms that apply when you use the Artdosis website, commission work or collect an artwork." },
      { property: "og:title", content: "Terms of use | Artdosis" },
      { property: "og:description", content: "Terms that apply to the Artdosis website, commissions and artworks." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="section svc-hero">
      <div className="narrow stack">
        <p className="eyebrow">Legal</p>
        <h1 style={{ fontSize: "clamp(2.4rem,6vw,4rem)" }}>Terms of use</h1>
        <p className="body-2">
          By using this site you agree to these terms. Content, imagery and artwork on this site are the property of Artdosis and Angi
          Castillo unless stated otherwise.
        </p>
        <h2 style={{ fontSize: "1.4rem" }}>Artwork and copyright</h2>
        <p className="body-2">
          Buying an original or a print transfers the physical work only. Copyright and reproduction rights stay with the artist unless
          agreed in writing.
        </p>
        <h2 style={{ fontSize: "1.4rem" }}>Commissions</h2>
        <p className="body-2">
          Commissions are confirmed with a written scope, timeline and deposit. Details are agreed case by case before work begins.
        </p>
        <h2 style={{ fontSize: "1.4rem" }}>Enquiries</h2>
        <p className="body-2">
          Questions about these terms? Email <a href="mailto:hello@artdosis.com">hello@artdosis.com</a>.
        </p>
      </div>
    </section>
  );
}
