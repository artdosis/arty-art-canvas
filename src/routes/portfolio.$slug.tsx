import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PORTFOLIO } from "@/lib/data";
import { pfImage } from "@/lib/images";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const item = PORTFOLIO.find((p) => p.s === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.t} · ${loaderData.y} | Artdosis` : "Work | Artdosis";
    const d = loaderData?.lead ?? "A closer look at a piece made by Artdosis.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PiecePage,
});

function PiecePage() {
  const p = Route.useLoaderData();

  return (
    <>
      <section className="section piece-hero bg-bloom bloom-warm" style={{ paddingBottom: "clamp(28px,4vw,48px)" }}>
        <div className="wrap">
          <Link className="svc-back" to="/portfolio">
            ← Back to portfolio
          </Link>
          <p className="eyebrow reveal">
            {p.c.join(" · ")} · {p.y}
          </p>
          <h1 className="svc-title wipe reveal">{p.t}</h1>
          <p className="lede reveal" style={{ maxWidth: "54ch" }}>
            {p.lead}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="piece-plate shot reveal">
            <img src={pfImage(p.t)} alt={p.t} width={1280} height={960} />
          </div>
          <div className="piece-meta">
            {[
              ["Where", p.loc],
              ["Year", p.y],
              ["Role", p.role],
              ...p.facts,
            ].map(([k, v]) => (
              <div className="piece-meta__i" key={k as string}>
                <span className="eyebrow">{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
          <div className="piece-body">
            {p.story.map((s) => (
              <p className="body-2" key={s.slice(0, 22)}>
                {s}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="wipe">From the same piece.</h2>
          </div>
          <div className="piece-strip">
            {p.gallery.map((g, i) => (
              <figure className="piece-strip__i shot" key={g + i}>
                <img src={pfImage(g)} alt={g} loading="lazy" width={1280} height={960} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-aubergine band">
        <div className="narrow center-block">
          <p className="band__q">Want something like this made for you?</p>
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
