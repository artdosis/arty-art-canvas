import { createFileRoute } from "@tanstack/react-router";
import { SheetForm } from "@/components/SheetForm";
import studio from "@/assets/about-studio.jpg";
import team from "@/assets/about-team.jpg";
import { balancedStyle } from "@/lib/grid";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Angi Castillo and the Artdosis studio" },
      {
        name: "description",
        content:
          "Artdosis is a human storytelling studio founded by Venezuelan-Australian artist Angi Castillo, working with art, music and inclusive immersive experiences.",
      },
      { property: "og:title", content: "About Angi Castillo and the Artdosis studio" },
      { property: "og:description", content: "Twenty years of asking what home means, made visible." },
    ],
  }),
  component: AboutPage,
});

const MILESTONES: [string, string][] = [
  ["The beginning", "Venezuela, and a displaced dream."],
  ["The break", "Migration, uncertainty and survival."],
  ["The transformation", "Art becomes a language for identity and healing."],
  ["The evolution", "Murals, live art, wearable art, community, immersion."],
];

const TEAM: [string, string, string][] = [
  ["Angi Castillo", "Founder · Artist · Creative Director", "Painter, muralist and designer. Twenty years of asking what home means, made visible."],
  ["Music and Production", "Sound Engineer · Music Producer", "Production, sound engineering and live recording across events and programs."],
  ["Artistic Direction", "Artistic Director", "Creative direction across art, music and immersive experiences."],
];

function AboutPage() {
  return (
    <>
      <section className="section svc-hero bg-bloom bloom-warm">
        <div className="wrap">
          <p className="eyebrow reveal">About</p>
          <h1 className="svc-title reveal" style={{ "--d": "60ms", maxWidth: "18ch" } as React.CSSProperties}>
            This is my soul, made visible.
          </h1>
          <p className="lede reveal" style={{ "--d": "120ms", maxWidth: "58ch" } as React.CSSProperties}>
            Artdosis is a human storytelling studio using art, music and inclusive immersive experiences to build connection, belonging and
            social impact.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split--wide">
          <div className="media shot reveal">
            <img src={studio} alt="Angi Castillo in the studio" loading="lazy" width={1280} height={1600} />
          </div>
          <div className="stack reveal">
            <p className="eyebrow">The founder</p>
            <h2>Angi Castillo</h2>
            <p className="big-lead" style={{ color: "var(--terracotta)", fontSize: "1.4rem" }}>
              Artist. Designer. Storyteller.
            </p>
            <p className="body-2">
              Her practice moves between painting, murals, wearable art, technology and community work. It began by leaving home at eighteen
              as a political refugee, and it has spent twenty years asking what home actually means. Work now sits with collectors in
              Melbourne, Brisbane, Sydney, Canberra, New York, Barcelona and Miami.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap">
          <div className="gbal" style={balancedStyle(MILESTONES.length, 4)}>
            {MILESTONES.map(([t, b]) => (
              <article className="card" key={t}>
                <p className="ms__t">{t}</p>
                <p className="ms__b">{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <p className="eyebrow">The team</p>
              <h2>Art and music, made in house.</h2>
            </div>
          </div>
          <div className="gbal" style={balancedStyle(TEAM.length, 3)}>
            {TEAM.map(([n, role, bio]) => (
              <article className="card" key={n}>
                <div className="mem__m shot" style={{ marginBottom: 12 }}>
                  <img src={team} alt={n} loading="lazy" width={1280} height={960} />
                </div>
                <h3>{n}</h3>
                <p className="mem__role">{role}</p>
                <p className="mem__bio" style={{ marginTop: 8 }}>
                  {bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap split reveal">
          <div className="stack">
            <p className="eyebrow">Work with us</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>Join the studio.</h2>
            <p className="body-2">
              Artists, musicians, producers and support workers who lead by listening. We would love to hear from you.
            </p>
          </div>
          <div className="bezel">
            <div className="bezel__core">
              <SheetForm
                sheet="Careers"
                type="career"
                cta="Send"
                title="Thank you."
                msg="We have got your interest and we will be in touch."
                fields={[
                  { l: "What do you do?", t: "text", name: "role", ph: "Artist, musician, producer, support worker…" },
                  { l: "Tell us about you", t: "area", name: "message", req: true },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
