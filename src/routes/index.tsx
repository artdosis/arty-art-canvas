import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, type CSSProperties } from "react";
import { makeBrush, prefersReduced } from "@/lib/paint";
import { SheetForm } from "@/components/SheetForm";
import { SERVICE_IMG, SHOP_IMG, AWAKENING_IMG } from "@/lib/images";
import { balancedStyle } from "@/lib/grid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artdosis · Art that makes people feel human again" },
      {
        name: "description",
        content:
          "A Melbourne storytelling studio working with art, music and inclusive immersive experiences for connection, belonging and social impact.",
      },
      { property: "og:title", content: "Artdosis · Art that makes people feel human again" },
      {
        property: "og:description",
        content: "Murals, live art, commissions, music and wellbeing programs from Angi Castillo and the Artdosis studio.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markRef = useRef<HTMLHeadingElement>(null);
  const markCanvasRef = useRef<HTMLCanvasElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const reduce = prefersReduced();
    const brush = makeBrush(c);
    let running = true;
    let raf = 0;
    let prevT = performance.now();
    let idle = 0;

    const gesture = (big: boolean) => {
      const dd = brush.dims();
      let x = dd.w * (0.08 + Math.random() * 0.84);
      let y = dd.h * (0.12 + Math.random() * 0.74);
      let ang = Math.random() * 6.283;
      const step = (big ? dd.w * 0.16 : dd.w * 0.09) * (0.7 + Math.random() * 0.8);
      const n = 3 + ((Math.random() * 3) | 0);
      const pts = [{ x, y }];
      for (let i = 0; i < n; i++) {
        ang += (Math.random() - 0.5) * 1.15;
        x += Math.cos(ang) * step;
        y += Math.sin(ang) * step * 0.82;
        pts.push({ x, y });
      }
      brush.paintPath(pts, undefined, 26 + Math.random() * 30);
    };

    for (let i = 0; i < 7; i++) gesture(i < 2);

    // Listen on the whole hero so strokes keep flowing across the wordmark too.
    const host = (c.closest(".hero") as HTMLElement | null) ?? c.parentElement!;
    const onPointer = (e: PointerEvent) => brush.move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) brush.move(t.clientX, t.clientY);
    };
    host.addEventListener("pointermove", onPointer, { passive: true });
    host.addEventListener("touchmove", onTouch, { passive: true });

    // The wordmark is a live cut-out of the paint layer: whatever colour is on
    // the brush passes straight through the letters.
    const mc = markCanvasRef.current;
    const mctx = mc?.getContext("2d") ?? null;
    const drawMark = () => {
      const ghost = ghostRef.current;
      if (!mc || !mctx || !ghost) return;
      const r = mc.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const pw = (r.width * dpr) | 0;
      const ph = (r.height * dpr) | 0;
      if (mc.width !== pw || mc.height !== ph) {
        mc.width = pw;
        mc.height = ph;
      }
      const cs = getComputedStyle(ghost);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.clearRect(0, 0, r.width, r.height);

      // 1. paint layer, cropped to the wordmark box
      const hr = c.getBoundingClientRect();
      const sx = (r.left - hr.left) * (c.width / (hr.width || 1));
      const sy = (r.top - hr.top) * (c.height / (hr.height || 1));
      const sw = r.width * (c.width / (hr.width || 1));
      const sh = r.height * (c.height / (hr.height || 1));
      mctx.globalCompositeOperation = "source-over";
      mctx.drawImage(c, sx, sy, sw, sh, 0, 0, r.width, r.height);

      // 2. keep only what falls inside the letters
      mctx.font = `${cs.fontWeight} ${parseFloat(cs.fontSize)}px ${cs.fontFamily}`;
      if ("letterSpacing" in mctx) (mctx as unknown as { letterSpacing: string }).letterSpacing = cs.letterSpacing;
      mctx.textAlign = "center";
      mctx.textBaseline = "middle";
      const tx = r.width / 2;
      const ty = r.height / 2;
      mctx.globalCompositeOperation = "destination-in";
      mctx.fillStyle = "#000";
      mctx.fillText("ARTDOSIS", tx, ty);

      // 3. ivory ink underneath so the name reads white on the black canvas
      // before any colour lands inside the letters
      mctx.globalCompositeOperation = "destination-over";
      mctx.fillStyle = "#F7F2EA";
      mctx.fillText("ARTDOSIS", tx, ty);
      mctx.globalCompositeOperation = "source-over";

    };

    let io: IntersectionObserver | undefined;
    io = new IntersectionObserver((en) => en.forEach((x) => (running = x.isIntersecting)), { threshold: 0.05 });
    io.observe(c);
    const loop = (now: number) => {
      const dt = Math.min(now - prevT, 80);
      prevT = now;
      if (running) {
        if (!reduce) {
          idle += dt;
          if (idle > 1500) {
            idle = 0;
            gesture(Math.random() < 0.3);
          }
        }
        drawMark();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => {
      brush.resize();
      drawMark();
    };
    addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(drawMark).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero__canvas">
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
      <div className="hero__halo" aria-hidden="true" />
      <div className="wrap hero__in">
        <p className="eyebrow hero__eye">Melbourne · Art and human wellbeing</p>
        <h1 className="mark" ref={markRef} aria-label="Artdosis">
          <span className="mark__ghost" ref={ghostRef} aria-hidden="true">
            ARTDOSIS
          </span>
          <canvas className="mark__canvas" ref={markCanvasRef} aria-hidden="true" />
        </h1>
        <p className="hero__sub">
          Art is something that happens to you. A dose of emotion, culture and connection, felt through painting, murals, music and the
          experiences we build.
        </p>
        <div className="hero__cta">
          <Link className="btn btn--yellow" to="/" hash="waitlist">
            Join the waitlist
            <span className="btn__ico" aria-hidden="true">
              →
            </span>
          </Link>
          <Link className="btn btn--ghost" to="/work">
            See the work
          </Link>
        </div>
        <p className="hero__hint">Move to paint · touch to paint · paint straight across the name</p>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}


function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = ref.current;
    if (!mq) return;
    let down = false,
      sx = 0,
      sl = 0;
    let timer: ReturnType<typeof setTimeout>;
    const onDown = (e: PointerEvent) => {
      down = true;
      mq.classList.add("drag", "stop");
      sx = e.clientX;
      sl = mq.scrollLeft;
      mq.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      mq.scrollLeft = sl - (e.clientX - sx);
    };
    const up = () => {
      if (!down) return;
      down = false;
      mq.classList.remove("drag");
      timer = setTimeout(() => mq.classList.remove("stop"), 1400);
    };
    mq.addEventListener("pointerdown", onDown);
    mq.addEventListener("pointermove", onMove);
    mq.addEventListener("pointerup", up);
    mq.addEventListener("pointercancel", up);
    mq.addEventListener("pointerleave", up);
    return () => {
      clearTimeout(timer);
      mq.removeEventListener("pointerdown", onDown);
      mq.removeEventListener("pointermove", onMove);
      mq.removeEventListener("pointerup", up);
      mq.removeEventListener("pointercancel", up);
      mq.removeEventListener("pointerleave", up);
    };
  }, []);
  const words = ["Storytelling", "Awaken", "Connect", "Express", "Transform", "Public art"];
  const group = (k: string) => (
    <span className="mq__g" key={k}>
      {words.map((w) => (
        <span key={w} style={{ display: "contents" }}>
          <span>{w}</span>
          <span className="mq__d">·</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="mq" ref={ref} aria-hidden="true">
      <div className="mq__track">
        {group("a")}
        {group("b")}
      </div>
    </div>
  );
}

const PILLARS: [string, string][] = [
  ["AWAKEN", "Opens perception, curiosity and consciousness."],
  ["CONNECT", "Brings people, cultures and communities together."],
  ["EXPRESS", "Gives stories, identities and emotions a visual language."],
  ["TRANSFORM", "Turns art into real personal and social change."],
];

const WORK: { to: "/work/$slug"; slug: string; title: string; tags: string[]; d: string; go: string }[] = [
  {
    to: "/work/$slug",
    slug: "murals",
    title: "Murals",
    tags: ["Indoor", "Outdoor", "Schools"],
    d: "A wall can hold memory. A colour can hold grief. A face can hold courage.",
    go: "Explore murals →",
  },
  {
    to: "/work/$slug",
    slug: "live-art",
    title: "Live art",
    tags: ["Auctions", "Community", "Brands"],
    d: "Painting becomes performance, made in the room with the people in it.",
    go: "Explore live art →",
  },
  {
    to: "/work/$slug",
    slug: "commissions",
    title: "Commissions",
    tags: ["Portraits", "Pets"],
    d: "A painting made for one story, and priced to that story.",
    go: "Explore commissions →",
  },
  {
    to: "/work/$slug",
    slug: "music-production",
    title: "Music and sound",
    tags: ["Production", "Distribution", "Programs"],
    d: "Sound is part of the story. Production, distribution and wellbeing programs.",
    go: "Explore music →",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      <section className="section bg-bloom bloom-warm">
        <div className="narrow center-block reveal">
          <p className="eyebrow">What is Artdosis</p>
          <p className="big-lead">
            A human, creative studio that turns art into experience, and experience into change. We are not really selling paintings. We
            want people to feel something, see differently, connect, question and heal.
          </p>
          <p className="script script-accent">Art that makes people feel human again.</p>
        </div>
      </section>

      <section className="section bg-mist pillars">
        <div className="wrap">
          <div className="gbal converge" style={balancedStyle(PILLARS.length, 4)}>
            {PILLARS.map(([k, b], i) => {
              const left = i < Math.ceil(PILLARS.length / 2);
              return (
                <article
                  className="card card--lift pillar-card"
                  key={k}
                  style={
                    {
                      "--cx": left ? "-46vw" : "46vw",
                      "--crot": left ? "-3deg" : "3deg",
                    } as CSSProperties
                  }
                >
                  <div className="pillar__k">{k}</div>
                  <p className="pillar__b">{b}</p>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      <section className="section bg-bloom bloom-cool">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <p className="eyebrow">The work</p>
              <h2>Murals, live art, commissions and music.</h2>
            </div>
            <Link className="btn btn--ghost" to="/work">
              All services
            </Link>
          </div>
          <div className="gbal" style={balancedStyle(WORK.length, 2)}>
            {WORK.map((w) => (
              <Link key={w.slug} className="card card--lift wcard" to="/work/$slug" params={{ slug: w.slug }}>
                <div className="wcard__m shot">
                  <img src={SERVICE_IMG[w.slug]} alt={w.title} loading="lazy" width={1280} height={960} />
                </div>
                <div className="wcard__b">
                  <h3>{w.title}</h3>
                  <div className="wcard__t">
                    {w.tags.map((t) => (
                      <span className="tag tag--out" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="wcard__d">{w.d}</p>
                  <span className="wcard__go">{w.go}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-aubergine band">
        <div className="narrow reveal">
          <p className="band__q serif" style={{ fontStyle: "italic" }}>
            Humans are not depressed. They are disconnected from the creator within. Art is what remains when the body is gone.
          </p>
          <p className="band__a">Artdosis</p>
        </div>
      </section>

      <section className="section bg-bloom bloom-warm">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <p className="eyebrow">The shop</p>
              <h2>Take a piece home.</h2>
            </div>
            <Link className="btn btn--ghost" to="/shop">
              Enter the shop
            </Link>
          </div>
          <div className="gbal" style={balancedStyle(3, 3)}>
            {[
              { img: SHOP_IMG.originals, t: "Original artworks", d: "One of a kind pieces. Priced privately, so enquire to start a conversation." },
              { img: SHOP_IMG.prints, t: "Limited prints", d: "Numbered editions in six sizes, printed to museum standard." },
              { img: SHOP_IMG.wearable, t: "Wearable art", d: "Not merch. A wearable piece of the movement. Silk bandanas first." },
            ].map((c) => (
              <div className="card" key={c.t}>
                <div className="media shot" style={{ aspectRatio: "4/3", marginBottom: 16 }}>
                  <img src={c.img} alt={c.t} loading="lazy" width={1024} height={1280} />
                </div>
                <h3>{c.t}</h3>
                <p className="body-2">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink">
        <div className="wrap split reveal">
          <div className="stack">
            <p className="eyebrow" style={{ color: "var(--yellow)" }}>
              The experience · December 2026
            </p>
            <h2 style={{ fontSize: "clamp(3rem,8vw,6rem)", letterSpacing: "-.03em" }}>Awakening</h2>
            <p className="body-2" style={{ color: "rgba(247,242,234,.72)" }}>
              Angi Castillo’s first solo exhibition. An immersive journey through art, ancestry, movement and sound that wakes up all five
              senses. Step outside the ordinary.
            </p>
            <div>
              <Link className="btn btn--yellow" to="/experiences">
                Enter the experience
                <span className="btn__ico" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
          <div className="media shot" style={{ aspectRatio: "4/5" }}>
            <img src={AWAKENING_IMG} alt="Awakening, an immersive exhibition" loading="lazy" width={1280} height={1600} />
          </div>
        </div>
      </section>

      <section className="section bg-mist" id="waitlist">
        <div className="wrap split reveal">
          <div className="stack">
            <p className="eyebrow">Be first in</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>Join the Artdosis waitlist.</h2>
            <p className="body-2">
              Early word on exhibitions, drops, workshops and wellbeing programs. No noise. Just the things worth showing up for.
            </p>
          </div>
          <div className="bezel">
            <div className="bezel__core">
              <SheetForm
                sheet="Waitlist"
                type="general"
                cta="Reserve my spot"
                title="You’re on the list."
                msg="Welcome in. We will be in touch with the first thing worth your time."
                fields={[
                  { l: "Phone", t: "text", name: "phone", im: "tel", ac: "tel", ph: "Optional, for anything time sensitive…" },
                  { l: "City", t: "text", name: "city", ac: "address-level2", ph: "Melbourne, Sydney, elsewhere…" },
                  {
                    l: "What draws you in?",
                    t: "select",
                    req: true,
                    name: "interest",
                    opts: ["Art workshops", "Murals and commissions", "Music and programs", "Exhibitions and experiences", "Just curious"],
                  },
                  {
                    l: "Tell us more",
                    t: "area",
                    name: "message",
                    ph: "What you are looking for, dates, budget, questions, anything at all…",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
