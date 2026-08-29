import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/data";
import { SERVICE_IMG } from "@/lib/images";
import { balancedStyle } from "@/lib/grid";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work · Murals, live art, music and programs | Artdosis" },
      {
        name: "description",
        content: "Murals, live art, commissions, music production, distribution, sound engineering and wellbeing programs from Artdosis.",
      },
      { property: "og:title", content: "Work · Murals, live art, music and programs | Artdosis" },
      { property: "og:description", content: "Pick a service to see how it happens, and start a conversation." },
    ],
  }),
  component: WorkIndex,
});

const GROUPS = ["Art services", "Music and sound", "Programs"];

const BLURB: Record<string, string> = {
  murals: "Indoor, outdoor, schools, campaigns and art wheels.",
  "live-art": "Live painting for events, brands and fundraising auctions.",
  commissions: "Portraits of people and pets, painted for one story.",
  "music-production": "Writing, recording and producing tracks start to finish.",
  "music-distribution": "Getting finished music onto every platform, with your rights kept.",
  "sound-engineering": "Live recording, mixing and event sound.",
  "wellbeing-programs": "Art and music programs run with Mind Connect, an NDIS provider.",
};

function WorkIndex() {
  return (
    <>
      <section className="section svc-hero bg-bloom bloom-warm">
        <div className="wrap">
          <p className="eyebrow reveal">The work</p>
          <h1 className="svc-title reveal" style={{ "--d": "60ms" } as React.CSSProperties}>
            What we make, and how.
          </h1>
          <p className="lede reveal" style={{ "--d": "120ms", maxWidth: "56ch" } as React.CSSProperties}>
            Every project is its own thing, so everything is quoted to the work. Pick a service to see how it happens and start a
            conversation. Each one has its own page and its own form.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {GROUPS.map((g, gi) => (
            <div key={g}>
              <div className="sec-head reveal" style={gi ? { marginTop: "clamp(48px,7vw,88px)" } : undefined}>
                <h2>{g}</h2>
              </div>
              <div className="gbal" style={balancedStyle(SERVICES.filter((s) => s.group === g).length, 3)}>
                {SERVICES.filter((s) => s.group === g).map((s) => (
                  <Link key={s.slug} className="card card--lift wcard" to="/work/$slug" params={{ slug: s.slug }}>
                    <div className="wcard__m shot">
                      <img src={SERVICE_IMG[s.slug]} alt={s.title} loading="lazy" width={1280} height={960} />
                    </div>
                    <div className="wcard__b">
                      <h3>{s.title}</h3>
                      <p className="wcard__d">{BLURB[s.slug]}</p>
                      <span className="wcard__go">Explore →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
