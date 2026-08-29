import { createFileRoute } from "@tanstack/react-router";
import { SheetForm } from "@/components/SheetForm";

export const Route = createFileRoute("/lets-talk")({
  head: () => ({
    meta: [
      { title: "Let’s talk · Partnerships and collaborations | Artdosis" },
      {
        name: "description",
        content:
          "Artdosis partners with brands, philanthropists and organisations working around mental health and culture. Start a conversation.",
      },
      { property: "og:title", content: "Let’s talk · Partnerships and collaborations | Artdosis" },
      { property: "og:description", content: "If art and care matter to you, let’s build something together." },
    ],
  }),
  component: LetsTalkPage,
});

function LetsTalkPage() {
  return (
    <>
      <section className="section svc-hero bg-bloom bloom-cool">
        <div className="wrap">
          <p className="eyebrow reveal">Let’s talk</p>
          <h1 className="svc-title reveal" style={{ "--d": "60ms", maxWidth: "20ch" } as React.CSSProperties}>
            If art and care matter to you, let’s build something.
          </h1>
          <p className="lede reveal" style={{ "--d": "120ms", maxWidth: "58ch" } as React.CSSProperties}>
            Artdosis partners with brands, philanthropists and organisations working around mental health and culture. Co-created with
            community, led by listening.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="stack reveal">
            <p className="eyebrow">Partnerships</p>
            <h2>Ways we work together.</h2>
            <ul className="lt-list">
              <li>
                <strong>Brand collaborations.</strong> Murals, live art and campaigns that mean something.
              </li>
              <li>
                <strong>Mental health causes.</strong> Creative work alongside organisations like Mind Connect.
              </li>
              <li>
                <strong>Philanthropy.</strong> Live auctions and fundraising with not for profits.
              </li>
              <li>
                <strong>Cultural programs.</strong> Workshops and immersive experiences for community.
              </li>
            </ul>
            <p className="body-2" style={{ fontSize: "1rem" }}>
              Prefer email? <a href="mailto:hello@artdosis.com">hello@artdosis.com</a>
            </p>
          </div>
          <div className="bezel reveal">
            <div className="bezel__core">
              <SheetForm
                heading="Start a conversation"
                sheet="Partnerships"
                type="partnership"
                cta="Send"
                title="Thank you."
                msg="We will read this properly and come back to you soon."
                fields={[
                  { l: "Organisation", t: "text", name: "org", ac: "organization" },
                  { l: "What’s it about?", t: "text", name: "about", ph: "Brand, cause, program…" },
                  { l: "Tell us more", t: "area", name: "message", req: true },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
