import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PF_CATS, PORTFOLIO } from "@/lib/data";
import { pfImage } from "@/lib/images";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio · Selected work | Artdosis" },
      {
        name: "description",
        content: "Murals, live art, events, commissions, music and brand collaborations made by Artdosis in Melbourne and beyond.",
      },
      { property: "og:title", content: "Portfolio · Selected work | Artdosis" },
      { property: "og:description", content: "A look at what Artdosis has made, and who it was made with." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const items = PORTFOLIO.filter((p) => filter === "All" || p.c.includes(filter));

  return (
    <>
      <section className="section svc-hero bg-bloom bloom-cool">
        <div className="wrap">
          <p className="eyebrow reveal">Portfolio</p>
          <h1 className="svc-title reveal wipe" style={{ "--d": "60ms" } as React.CSSProperties}>
            Selected work.
          </h1>
          <p className="lede reveal" style={{ "--d": "120ms", maxWidth: "58ch" } as React.CSSProperties}>
            Murals, live art, events, commissions, music and brand collaborations. Pick any piece to see how it was made, and who it was
            made with.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="pf-filter reveal" role="group" aria-label="Filter portfolio">
            {PF_CATS.map((c) => (
              <button
                key={c}
                className={"pf-chip" + (filter === c ? " on" : "")}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="pf-wall">
            {items.map((p, i) => (
              <article className="pf-piece" key={p.s} style={{ "--sway": `${(i % 3) - 1}deg` } as React.CSSProperties}>
                <Link className="pf-piece__link" to="/portfolio/$slug" params={{ slug: p.s }} aria-label={`Open ${p.t}`}>
                  <span className="pf-piece__cord" aria-hidden="true" />
                  <span className="pf-piece__hook" aria-hidden="true" />
                  <div className="pf-piece__frame">
                    <div className="pf-piece__mat">
                      <div className="shot">
                        <img src={pfImage(p.t)} alt={p.t} loading="lazy" width={1280} height={960} />
                        <span className="pf-piece__view">View the piece →</span>
                      </div>
                    </div>
                  </div>
                  <div className="pf-piece__plate">
                    <h3>{p.t}</h3>
                    <p className="meta num">
                      {p.c.join(" · ")} · {p.y}
                    </p>
                    <p>{p.d}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-aubergine band">
        <div className="narrow reveal center-block">
          <p className="band__q">If you have a wall, an event, a song or a story, we can probably help.</p>
          <Link className="btn btn--yellow" to="/lets-talk">
            Start a conversation
            <span className="btn__ico" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
