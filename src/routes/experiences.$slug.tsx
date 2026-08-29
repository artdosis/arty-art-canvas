import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { expBySlug } from "@/lib/experiences";
import { expImage } from "@/lib/images";

export const Route = createFileRoute("/experiences/$slug")({
  loader: ({ params }) => {
    const e = expBySlug(params.slug);
    if (!e) throw notFound();
    return e;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.t} · ${loaderData.cat} | Artdosis` : "Experiences | Artdosis";
    const d = loaderData?.blurb ?? "Exhibitions, music events and live experiences from Artdosis.";
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
  component: ExpDetail,
});

function ExpDetail() {
  const e = Route.useLoaderData();

  return (
    <>
      <section className="section bg-ink awk exp-hero">
        <div className="awk__glow" aria-hidden="true" />
        <div className="wrap awk__in">
          <Link className="svc-back" to="/experiences" style={{ color: "rgba(247,242,234,.7)" }}>
            ← All experiences
          </Link>
          <div className="awk-hero">
            <div className="stack">
              <p className="eyebrow" style={{ color: "var(--yellow)" }}>
                {e.cat} · {e.when} · {e.where}
              </p>
              <h1 className="exp-title">{e.t}</h1>
              <p className="lede" style={{ color: "rgba(247,242,234,.8)", maxWidth: "48ch" }}>
                {e.blurb}
              </p>
              <div className="awk-sense">
                <span>{e.status}</span>
                <span>{e.where}</span>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link className="btn btn--yellow" to="/" hash="waitlist">
                  Join the waitlist
                  <span className="btn__ico" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link className="btn btn--ghost" to="/lets-talk">
                  Enquire
                </Link>
              </div>
            </div>
            <div className="awk-frame">
              <div className="shot">
                <img src={expImage(e.img)} alt={e.t} width={1280} height={960} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="narrow center-block">
          <p className="eyebrow">{e.lead}</p>
          {e.story.map((s) => (
            <p className="big-lead" key={s.slice(0, 20)}>
              {s}
            </p>
          ))}
        </div>
      </section>

      <section className="section bg-aubergine awk">
        <div className="awk__glow" aria-hidden="true" />
        <div className="wrap awk__in">
          <div className="sec-head">
            <h2 className="wipe" style={{ textTransform: "uppercase" }}>
              How it runs
            </h2>
          </div>
          <div className="awk-rail">
            {e.program.map(([t, d], i) => (
              <article className="awk-step" key={t}>
                <div className="awk-step__n">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="piece-meta">
            {e.facts.map(([k, v]) => (
              <div className="piece-meta__i" key={k}>
                <span className="eyebrow">{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
          <div className="piece-strip" style={{ marginTop: "clamp(24px,4vw,44px)" }}>
            {e.gallery.map((g, i) => (
              <figure className="piece-strip__i shot" key={g + i}>
                <img src={expImage(g)} alt={e.t} loading="lazy" width={1280} height={960} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="narrow center-block">
          <p className="band__q serif" style={{ fontStyle: "italic" }}>
            The art world does not need more spectators. It needs people who are awake.
          </p>
          <Link className="btn btn--yellow" to="/experiences">
            See the other experiences
            <span className="btn__ico" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
