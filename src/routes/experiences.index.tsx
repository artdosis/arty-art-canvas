import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { EXPERIENCES, EXP_CATS } from "@/lib/experiences";
import { expImage } from "@/lib/images";
import { balancedStyle } from "@/lib/grid";

export const Route = createFileRoute("/experiences/")({
  head: () => ({
    meta: [
      { title: "Experiences · Exhibitions, music events and live art | Artdosis" },
      {
        name: "description",
        content:
          "Immersive exhibitions, live music events and painting experiences made by Artdosis in Melbourne, including the Awakening exhibition in December 2026.",
      },
      { property: "og:title", content: "Experiences · Exhibitions, music events and live art | Artdosis" },
      { property: "og:description", content: "Rooms you walk through, nights you hear, and paintings made while you watch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencesHub,
});

function ExperiencesHub() {
  const [cat, setCat] = useState<string | null>(null);
  const cats = EXP_CATS.filter(([c]) => !cat || c === cat);

  return (
    <>
      <section className="section bg-ink awk exp-hero">
        <div className="awk__glow" aria-hidden="true" />
        <div className="wrap awk__in">
          <p className="eyebrow" style={{ color: "var(--yellow)" }}>
            Experiences
          </p>
          <h1 className="exp-title">Art you walk into.</h1>
          <p className="lede" style={{ color: "rgba(247,242,234,.78)", maxWidth: "52ch" }}>
            Exhibitions, music events and live art. Some are rooms you move through, some are nights you hear, some are made in front of you
            and handed over before you leave.
          </p>
          <div className="exp-cats">
            {EXP_CATS.map(([c, d]) => {
              const n = EXPERIENCES.filter((e) => e.cat === c).length;
              return (
                <button key={c} className={"exp-cat" + (cat === c ? " on" : "")} onClick={() => setCat(cat === c ? null : c)}>
                  <span className="exp-cat__n num">{String(n).padStart(2, "0")}</span>
                  <span className="exp-cat__t">{c}</span>
                  <span className="exp-cat__d">{d}</span>
                  <span className="exp-cat__go">{cat === c ? "Show all" : "Open"} →</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {cats.map(([c, d]) => {
        const items = EXPERIENCES.filter((e) => e.cat === c);
        return (
          <section className="section" key={c}>
            <div className="wrap">
              <div className="sec-head">
                <div>
                  <p className="eyebrow">{d}</p>
                  <h2 className="wipe">{c}</h2>
                </div>
              </div>
              <div className="gbal converge" style={balancedStyle(items.length, 3)}>
                {items.map((e, i) => (
                  <Link
                    key={e.s}
                    className="exp-card"
                    to="/experiences/$slug"
                    params={{ slug: e.s }}
                    style={{ "--cx": i % 2 ? "34vw" : "-34vw", "--crot": i % 2 ? "2deg" : "-2deg" } as React.CSSProperties}
                  >
                    <div className="exp-card__m shot">
                      <img src={expImage(e.img)} alt={e.t} loading="lazy" width={1280} height={960} />
                      <span className="exp-card__tag">{e.status}</span>
                    </div>
                    <div className="exp-card__b">
                      <p className="meta num">
                        {e.when} · {e.where}
                      </p>
                      <h3>{e.t}</h3>
                      <p className="exp-card__d">{e.blurb}</p>
                      <span className="wcard__go">Open the experience →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section bg-aubergine band">
        <div className="narrow center-block">
          <p className="band__q">Want us to build one with you?</p>
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
