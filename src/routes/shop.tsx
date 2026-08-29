import { createFileRoute, Link } from "@tanstack/react-router";
import { SheetForm } from "@/components/SheetForm";
import { SHOP_IMG, pfImage } from "@/lib/images";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop · Originals, prints and wearable art | Artdosis" },
      {
        name: "description",
        content: "A digital gallery of original artworks, numbered limited prints and wearable art from the Artdosis studio.",
      },
      { property: "og:title", content: "Shop · Originals, prints and wearable art | Artdosis" },
      { property: "og:description", content: "Originals to collect, numbered prints to live with, and wearable art to carry." },
    ],
  }),
  component: ShopPage,
});

const ORIGINALS = [
  { t: "Peace", meta: "Acrylic and mixed media · 240 × 180 cm", enquire: true, img: pfImage("Peace") },
  {
    t: "Who are you?",
    meta: "Public art · dimensions variable",
    enquire: false,
    badge: "Collected",
    note: "In a private collection",
    img: pfImage("Who are you?"),
  },
  { t: "The creator within", meta: "Oil on canvas · 120 × 90 cm", enquire: true, img: pfImage("Portrait commission") },
];

const PRINTS = [
  { t: "A dose of courage", meta: "Edition of 50 · 6 sizes", img: SHOP_IMG.prints },
  { t: "Disconnected", meta: "Edition of 50 · 6 sizes", img: pfImage("Pet portrait") },
  { t: "The front row", meta: "Edition of 30 · 6 sizes", img: SHOP_IMG.originals },
];

const WEARABLE = [
  { t: "Silk bandanas", meta: "First drop", img: SHOP_IMG.wearable },
  { t: "Tees", meta: "Coming", img: pfImage("Brand activation wall") },
  { t: "Wellbeing line", meta: "Made for comfort", img: pfImage("Art wheels") },
];

function Wire() {
  return (
    <svg className="hang__wire" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
      <line x1="50" y1="4" x2="6" y2="34" stroke="#8a7a5f" strokeWidth="1" />
      <line x1="50" y1="4" x2="94" y2="34" stroke="#8a7a5f" strokeWidth="1" />
    </svg>
  );
}

function ShopPage() {
  return (
    <>
      <section className="section svc-hero bg-bloom bloom-cool">
        <div className="wrap">
          <p className="eyebrow reveal">The shop</p>
          <h1 className="svc-title reveal" style={{ "--d": "60ms" } as React.CSSProperties}>
            Step into the gallery.
          </h1>
          <p className="lede reveal" style={{ "--d": "120ms", maxWidth: "58ch" } as React.CSSProperties}>
            Originals to collect, numbered prints to live with, and wearable art to carry. Checkout for prints opens soon, so join the
            waitlist to hear first.
          </p>
        </div>
      </section>

      <section className="section gallery">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <p className="eyebrow">Original artworks</p>
              <h2>One of one.</h2>
            </div>
            <span className="tag tag--out">Priced privately</span>
          </div>
          <div className="easel-row">
            {ORIGINALS.map((o, i) => (
              <div className="easel reveal" key={o.t} style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                <div className="easel__stage">
                  <div className="easel__art shot">
                    <img src={o.img} alt={o.t} loading="lazy" width={1024} height={1280} />
                    {o.badge ? <span className="easel__badge">{o.badge}</span> : null}
                  </div>
                </div>
                <div className="easel__stand">
                  <span className="easel__bar" />
                  <span className="easel__leg" />
                  <span className="easel__ground" />
                </div>
                <div className="easel__cap">
                  <h3>{o.t}</h3>
                  <p className="meta">{o.meta}</p>
                  {o.enquire ? (
                    <Link className="btn btn--ghost" to="/shop" hash="enquire">
                      Enquire
                    </Link>
                  ) : (
                    <span className="meta" style={{ textTransform: "uppercase" }}>
                      {o.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wall">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <p className="eyebrow">Limited prints</p>
              <h2>Numbered. Finite. Yours.</h2>
            </div>
            <span className="tag tag--yellow">Checkout opening soon</span>
          </div>
          <div className="hang-row">
            {PRINTS.map((p, i) => (
              <div className="hang reveal" key={p.t} style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                <span className="hang__nail" />
                <Wire />
                <div className="hang__frame shot">
                  <img src={p.img} alt={p.t} loading="lazy" width={1024} height={1280} />
                </div>
                <div className="hang__plate">
                  <h3>{p.t}</h3>
                  <p className="meta num">{p.meta}</p>
                  <button className="btn btn--ghost" disabled>
                    Notify me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wall">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <p className="eyebrow">Wearable art</p>
              <h2>Not merch.</h2>
            </div>
            <span className="tag tag--out">Movement, worn</span>
          </div>
          <div className="hang-row">
            {WEARABLE.map((p, i) => (
              <div className="hang reveal" key={p.t} style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                <span className="hang__nail" />
                <Wire />
                <div className="hang__frame shot">
                  <img src={p.img} alt={p.t} loading="lazy" width={1024} height={1280} />
                </div>
                <div className="hang__plate">
                  <h3>{p.t}</h3>
                  <p className="meta">{p.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist" id="enquire">
        <div className="wrap split reveal">
          <div className="stack">
            <p className="eyebrow">Original artworks</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>Enquire to collect.</h2>
            <p className="body-2">
              Tell us which piece speaks to you. We will share availability, sizing and the story behind the work.
            </p>
          </div>
          <div className="bezel">
            <div className="bezel__core">
              <SheetForm
                sheet="Originals"
                type="original"
                cta="Send enquiry"
                title="Thank you."
                msg="We will be in touch about the piece and next steps."
                fields={[
                  { l: "Which piece?", t: "text", name: "piece", ph: "Title or a short description…" },
                  { l: "Message", t: "area", name: "message" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
