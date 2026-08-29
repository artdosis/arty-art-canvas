import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SERVICES } from "@/lib/data";
import { SheetForm } from "@/components/SheetForm";
import { SERVICE_IMG } from "@/lib/images";
import { balancedStyle } from "@/lib/grid";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found | Artdosis" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.service;
    return {
      meta: [
        { title: `${s.title} | Artdosis` },
        { name: "description", content: s.lead },
        { property: "og:title", content: `${s.title} | Artdosis` },
        { property: "og:description", content: s.lead },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <>
      <section className="section svc-hero bg-bloom bloom-warm">
        <div className="wrap">
          <Link className="svc-back" to="/work">
            ← All services
          </Link>
          <p className="eyebrow reveal">{s.group}</p>
          <h1 className="svc-title reveal" style={{ "--d": "60ms" } as React.CSSProperties}>
            {s.title}
          </h1>
          <p className="lede reveal" style={{ "--d": "120ms", maxWidth: "56ch" } as React.CSSProperties}>
            {s.lead}
          </p>
          <div className="svc-note reveal" style={{ "--d": "180ms", marginTop: 22 } as React.CSSProperties}>
            {s.note.map((n) => (
              <span className="tag" key={n}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ marginBottom: "clamp(32px,5vw,64px)" }}>
          <div className="media shot" style={{ aspectRatio: "21/9" }}>
            <img src={SERVICE_IMG[s.slug]} alt={s.title} loading="lazy" width={1280} height={960} />
          </div>
        </div>
        <div className="wrap split svc-body-2">
          <div className="stack reveal">
            <p className="body-2" style={{ fontSize: "1.15rem" }}>
              {s.body}
            </p>
            <div style={{ marginTop: 12 }}>
              <p className="eyebrow">How it happens</p>
              <ol className="steps">
                {s.steps.map((st) => (
                  <li key={st}>{st}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bezel reveal">
            <div className="bezel__core">
              <SheetForm
                key={s.slug}
                heading={s.form.cta}
                sheet={s.form.sheet}
                type={s.form.type}
                cta={s.form.cta}
                fields={s.form.fields}
                title="Thank you."
                msg="We will review the details and come back with next steps."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-wash">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <p className="eyebrow">What we offer</p>
              <h2>Inside {s.title.toLowerCase()}.</h2>
            </div>
          </div>
          <div className="gbal" style={balancedStyle(s.offers.length, 3)}>
            {s.offers.map(([t, d]) => (
              <div className="offer card" key={t}>
                <div className="offer__t">{t}</div>
                <p className="offer__d">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap center-block reveal">
          <p className="eyebrow">Explore other services</p>
          <div className="other-svc" style={{ justifyContent: "center" }}>
            {others.map((o) => (
              <Link className="tag tag--out" key={o.slug} to="/work/$slug" params={{ slug: o.slug }}>
                {o.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
