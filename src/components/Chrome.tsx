import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { makeBrush, pick, prefersReduced } from "@/lib/paint";

const NAV = [
  { to: "/work", label: "Work" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/shop", label: "Shop" },
  { to: "/experiences", label: "Experiences" },
  { to: "/about", label: "About" },
  { to: "/lets-talk", label: "Let’s talk" },
] as const;

export function Grain() {
  return (
    <>
      <div id="aurora" aria-hidden="true" />
      <div id="grain" aria-hidden="true" />
    </>
  );
}


export function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    let ticking = false;
    const on = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const d = document.documentElement;
        const h = d.scrollHeight - d.clientHeight;
        setW(h > 0 ? (d.scrollTop / h) * 100 : 0);
        ticking = false;
      });
    };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return <div id="prog" aria-hidden="true" style={{ width: w + "%" }} />;
}

export function Preloader() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"in" | "done" | "gone">("in");
  useEffect(() => {
    const c = ref.current;
    const reduce = prefersReduced();
    if (!c) {
      setState("gone");
      return;
    }
    const brush = makeBrush(c);
    const start = performance.now();
    const dur = reduce ? 260 : 1550;
    let made = 0;
    let raf = 0;
    const bigStroke = () => {
      const dd = brush.dims();
      const cx = dd.w / 2,
        cy = dd.h / 2;
      const ang = Math.random() * 6.283;
      const r0 = Math.min(dd.w, dd.h) * (0.1 + Math.random() * 0.22);
      let x = cx + Math.cos(ang) * r0,
        y = cy + Math.sin(ang) * r0;
      let a2 = ang + Math.PI * (0.4 + Math.random() * 0.5);
      const len = Math.min(dd.w, dd.h) * (0.28 + Math.random() * 0.22);
      const n = 4;
      const pts = [{ x, y }];
      for (let i = 0; i < n; i++) {
        a2 += (Math.random() - 0.5) * 1.2;
        x += (Math.cos(a2) * len) / n;
        y += (Math.sin(a2) * len) / n;
        pts.push({ x, y });
      }
      brush.paintPath(pts, pick(), 34 + Math.random() * 28);
    };
    const tick = (now: number) => {
      const p = (now - start) / dur;
      if (p > 1) {
        setState("done");
        setTimeout(() => setState("gone"), 650);
        return;
      }
      if (!reduce) {
        const want = Math.floor(p * 7);
        while (made < want) {
          bigStroke();
          made++;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    if (reduce) {
      bigStroke();
      bigStroke();
      bigStroke();
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (state === "gone") return null;
  return (
    <div id="pre" className={state === "done" ? "done" : ""} aria-hidden="true">
      <canvas ref={ref} />
      <div className="pl">ARTDOSIS</div>
      <div className="plsub">A dose of art for the human in you</div>
    </div>
  );
}

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  // the home hero is a black canvas, so the bar stays dark while it is behind it
  const [overHero, setOverHero] = useState(false);
  const dark = pathname.startsWith("/experiences") || (pathname === "/" && overHero);

  useEffect(() => {
    if (pathname !== "/") {
      setOverHero(false);
      return;
    }
    const read = () => {
      const hero = document.querySelector(".hero") as HTMLElement | null;
      setOverHero(!!hero && scrollY < hero.offsetHeight - 90);
    };
    read();
    addEventListener("scroll", read, { passive: true });
    addEventListener("resize", read);
    return () => {
      removeEventListener("scroll", read);
      removeEventListener("resize", read);
    };
  }, [pathname]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#111111" : "#F7F2EA");
  }, [dark]);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={"nav" + (dark ? " nav--dark" : "")}>
        <div className="wrap nav__in">
          <Link className="nav__mark" to="/">
            ARTDOSIS
          </Link>
          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={"nav__link" + (pathname === n.to || (n.to === "/work" && pathname.startsWith("/work")) ? " on" : "")}
              >
                {n.label}
              </Link>
            ))}
            <Link className="btn btn--yellow nav__cta" to="/" hash="waitlist">
              Join the waitlist
            </Link>
          </nav>
          <button
            className={"burger" + (open ? " open" : "")}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="sheet"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={"sheet" + (open ? " open" : "")} id="sheet" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <div className="sheet__paint" aria-hidden="true" />
        <div className="sheet__grain" aria-hidden="true" />
        <nav className="sheet__links" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.to} className="sheet__link" to={n.to} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="sheet__foot">
          <Link to="/" hash="waitlist" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            Join the waitlist
          </Link>
          <a href="https://www.instagram.com/artdosis" target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
            Instagram
          </a>
          <a href="mailto:hello@artdosis.com" tabIndex={open ? 0 : -1}>
            hello@artdosis.com
          </a>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <div>
          <div className="foot__mark">ARTDOSIS</div>
          <p className="foot__tag script">A dose of art for the human in you.</p>
          <p className="foot__m">
            A human storytelling studio working with art, music and inclusive experiences for connection, belonging and social impact. A
            creative studio working alongside Mind Connect, an NDIS support provider in Melbourne.
          </p>
        </div>
        <nav className="foot__col" aria-label="Explore">
          <div className="eyebrow">Explore</div>
          <Link to="/work">Work</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/experiences">Experiences</Link>
          <Link to="/about">About</Link>
          <Link to="/lets-talk">Let’s talk</Link>
        </nav>
        <nav className="foot__col" aria-label="More">
          <div className="eyebrow">More</div>
          <a href="https://www.instagram.com/artdosis" target="_blank" rel="noopener">
            Instagram
          </a>
          <a href="mailto:hello@artdosis.com">hello@artdosis.com</a>
          <Link to="/legal/privacy">Privacy</Link>
          <Link to="/legal/terms">Terms</Link>
        </nav>
      </div>
      <div className="wrap foot__base">
        <span>© 2026 Artdosis · Melbourne, Australia</span>
        <span>Made on the lands of the Wurundjeri people of the Kulin Nation. Always was, always will be.</span>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    try {
      if (!localStorage.getItem("ad_consent")) setHidden(false);
    } catch {
      /* storage blocked */
    }
  }, []);
  const choose = (v: string) => {
    try {
      localStorage.setItem("ad_consent", v);
    } catch {
      /* storage blocked */
    }
    setHidden(true);
  };
  if (hidden) return null;
  return (
    <div className="cookie" role="region" aria-label="Cookie notice">
      <p>
        We use a little analytics to understand how people find Artdosis. No ads, and we never sell your data.{" "}
        <Link to="/legal/privacy" onClick={() => choose("declined")}>
          Read our privacy note.
        </Link>
      </p>
      <div className="cookie__a">
        <button className="btn btn--ghost" onClick={() => choose("declined")}>
          Decline
        </button>
        <button className="btn" onClick={() => choose("accepted")}>
          Accept
        </button>
      </div>
    </div>
  );
}

/** Reveal on scroll, magnetic buttons, hash scrolling, scroll restoration. */
export function Behaviours() {
  const location = useRouterState({ select: (s) => s.location });

  // Progressive reveal: auto tag content, stagger by position, observe.
  useEffect(() => {
    let io: IntersectionObserver | undefined;
    let raf = 0;
    let sweep: (() => void) | undefined;
    const timers: number[] = [];

    // Run once hydration has finished so class changes never fight the SSR tree.
    const start = () => {
      raf = requestAnimationFrame(() => {
        const reduce = prefersReduced();

        // 1. Elements authored with .reveal in JSX: class based transition.
        const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
        if (reduce || !("IntersectionObserver" in window)) {
          els.forEach((e) => e.classList.add("in"));
          return;
        }
        const obs = new IntersectionObserver(
          (en) =>
            en.forEach((x) => {
              // Reveal when visible, or when the element was skipped over by a
              // fast scroll / anchor jump (already above the viewport).
              const show = x.isIntersecting || x.boundingClientRect.top < 0;
              if (show) {
                x.target.classList.add("in");
                const anim = anims.get(x.target);
                if (anim) {
                  anim.play();
                  anims.delete(x.target);
                }
                obs.unobserve(x.target);
              }
            }),
          { threshold: 0, rootMargin: "200px 0px 0px 0px" },
        );
        io = obs;
        els.forEach((e) => obs.observe(e));


        // 2. Everything else gets the same entrance through the Web Animations
        // API, which keeps the DOM untouched so hydration stays clean.
        const anims = new WeakMap<Element, Animation>();
        const auto = [
          ".grid > *",
          ".sec-head",
          ".split > *",
          ".narrow > *",
          ".easel",
          ".hang",
          ".card",
          ".wcard",
          "section .wrap > h2",
          "section .wrap > .lede",
        ].join(",");
        const seen = new Map<Element, number>();
        // Browsers with scroll driven timelines run the richer CSS
        // choreography; the rest fall back to these WAAPI entrances.
        const hasViewTL = typeof CSS !== "undefined" && CSS.supports?.("animation-timeline", "view()");
        document.querySelectorAll<HTMLElement>(auto).forEach((el) => {
          if (el.classList.contains("reveal") || el.closest(".hero")) return;
          const p = el.parentElement;
          const converge = !!p && p.classList.contains("converge");
          if (converge && hasViewTL) return;
          const i = p ? (seen.get(p) ?? 0) : 0;
          if (p) seen.set(p, i + 1);
          // Cards inside a grid converge from the sides, everything else lifts.
          const inGrid = !!p && (p.classList.contains("grid") || p.classList.contains("gbal"));
          const half = converge && p ? Math.ceil(p.children.length / 2) : 0;
          const from = converge ? (i < half ? -240 : 240) : inGrid ? (i % 2 === 0 ? -70 : 70) : 0;
          const anim = el.animate(
            [
              {
                opacity: 0,
                transform: `translate3d(${from}px,${inGrid ? 18 : 30}px,0) scale(.975)`,
                filter: "blur(8px)",
              },
              { opacity: 1, transform: "none", filter: "none" },
            ],
            {
              duration: inGrid ? 1100 : 950,
              delay: converge ? 0 : Math.min(i, 5) * 90,
              easing: "cubic-bezier(.2,.9,.25,1)",
              fill: "both",
            },
          );
          anim.pause();
          anim.currentTime = 0;
          anims.set(el, anim);
          obs.observe(el);
        });

        // Section headings get written on as they arrive.
        document
          .querySelectorAll<HTMLElement>(".sec-head h2,.big-lead,.svc-title,section .wrap > h2,.narrow > h2,.easel__t,.pf-piece__plate h3")
          .forEach((el) => {
            if (el.closest(".hero") || el.classList.contains("wipe")) return;
            el.classList.add("wipe");
            obs.observe(el);
          });




        // 3. Safety sweep: anything already scrolled past (fast wheel, anchor
        // jump, restored scroll position) is shown immediately, so no section
        // can ever stay invisible.
        sweep = () => {
          const vh = innerHeight;
          document.querySelectorAll<HTMLElement>(".reveal:not(.in),.wipe:not(.in)").forEach((el) => {
            if (el.getBoundingClientRect().top < vh * 1.15) el.classList.add("in");
          });
          document.querySelectorAll<HTMLElement>(auto).forEach((el) => {
            const anim = anims.get(el);
            if (anim && el.getBoundingClientRect().top < vh * 1.15) {
              anim.play();
              anims.delete(el);
              obs.unobserve(el);
            }
          });
        };
        addEventListener("scroll", sweep, { passive: true });
        addEventListener("resize", sweep);
        sweep();
        timers.push(window.setTimeout(sweep, 400), window.setTimeout(sweep, 1200));
      });

    };

    // Wait until after load (plus a beat for lazy route hydration) so no class
    // or style change ever races the SSR tree.
    const kick = () => timers.push(window.setTimeout(start, 900));
    if (document.readyState === "complete") kick();
    else addEventListener("load", kick, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("load", kick);
      if (sweep) {
        removeEventListener("scroll", sweep);
        removeEventListener("resize", sweep);
      }
      timers.forEach(clearTimeout);
      io?.disconnect();
    };
  }, [location.pathname, location.search]);




  // Depth: parallax is handled in CSS with scroll driven animations, so the
  // DOM is never touched after hydration.

  useEffect(() => {
    const reduce = prefersReduced();
    const hash = location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace(/^#/, ""));
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }), 90);
        return () => clearTimeout(t);
      }
    }
    window.scrollTo(0, 0);
    return;
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (prefersReduced() || !matchMedia("(pointer:fine)").matches) return;
    const move = (e: PointerEvent) => {
      const b = (e.target as HTMLElement | null)?.closest<HTMLElement>(".btn");
      if (!b) return;
      const r = b.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      b.style.transform = `translate(${mx * 0.18}px,${my * 0.28 - 2}px)`;
    };
    const out = (e: PointerEvent) => {
      const b = (e.target as HTMLElement | null)?.closest<HTMLElement>(".btn");
      if (b) b.style.transform = "";
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerout", out);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  return null;
}
