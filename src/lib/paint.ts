/* Oil paint bristle brush engine, ported from the Artdosis reference build. */

export const PALETTE = [
  "#C7352B",
  "#E0567A",
  "#D66B8A",
  "#244C9A",
  "#3E9B8E",
  "#3E8E5A",
  "#F0B429",
  "#E08A3C",
  "#AA5844",
  "#C8795F",
];

type Pt = { x: number; y: number };
type RGB = { r: number; g: number; b: number };

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function mixRgb(a: RGB, b: RGB, t: number): RGB {
  return { r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t };
}
function lightenRgb(c: RGB, f: number): RGB {
  return { r: c.r + (255 - c.r) * f, g: c.g + (255 - c.g) * f, b: c.b + (255 - c.b) * f };
}
function css(c: RGB, a: number) {
  return "rgba(" + (c.r | 0) + "," + (c.g | 0) + "," + (c.b | 0) + "," + a + ")";
}
export function pick() {
  return PALETTE[(Math.random() * PALETTE.length) | 0]!;
}

export function makeBrush(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let w = 0,
    h = 0,
    dpr = Math.min(devicePixelRatio || 1, 2);
  let run: { fixed: RGB | null; width: number; bristles: any[] } | null = null;
  let buf: Pt[] = [];
  let lastT = 0;

  // --- slow, continuous colour drift -------------------------------------
  // The pigment on the brush never jumps: it fades from the colour it is
  // carrying into the next one over a long run of segments.
  let curCol: RGB = hexToRgb(pick());
  let nextCol: RGB = hexToRgb(pick());
  let blend = 0;
  function drift(amount: number): RGB {
    blend += amount;
    if (blend >= 1) {
      blend = 0;
      curCol = nextCol;
      let cand = hexToRgb(pick());
      // avoid landing on the same pigment twice in a row
      if (Math.abs(cand.r - curCol.r) + Math.abs(cand.g - curCol.g) + Math.abs(cand.b - curCol.b) < 60) cand = hexToRgb(pick());
      nextCol = cand;
    }
    // smoothstep so the middle of the fade is the fastest part
    const t = blend * blend * (3 - 2 * blend);
    return mixRgb(curCol, nextCol, t);
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    w = r.width;
    h = r.height;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = (w * dpr) | 0;
    canvas.height = (h * dpr) | 0;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  function seedBristles(width: number) {
    const n = 16 + ((Math.random() * 16) | 0);
    const arr = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1) - 0.5;
      let a = 1 - Math.abs(t) * 1.05;
      a = Math.max(0.08, Math.min(0.85, a)) * (0.55 + Math.random() * 0.55);
      arr.push({
        off: t * width + (Math.random() - 0.5) * 2.4,
        w: 0.7 + Math.random() * 2,
        a,
        li: Math.random() * 0.55,
        dry: Math.random() < 0.3,
      });
    }
    return arr;
  }

  function begin(color?: string, width?: number) {
    const wd = width || 26 + Math.random() * 34;
    run = { fixed: color ? hexToRgb(color) : null, width: wd, bristles: seedBristles(wd) };
    buf = [];
  }

  function quadSeg(a: Pt, ctrl: Pt, bpt: Pt, perp: Pt) {
    if (!run) return;
    // pigment for this exact segment: either a locked colour or the drift
    const base = run.fixed ?? drift(0.0055);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalCompositeOperation = "source-over";
    // body of the stroke, load of paint varies along the run
    const load = 0.34 + Math.random() * 0.2;
    ctx.strokeStyle = css(base, load);
    ctx.lineWidth = run.width * (0.62 + Math.random() * 0.2);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(ctrl.x, ctrl.y, bpt.x, bpt.y);
    ctx.stroke();
    for (let i = 0; i < run.bristles.length; i++) {
      const b = run.bristles[i]!;
      if (b.dry && Math.random() < 0.35) continue;
      // each bristle wanders a touch so no two passes lay down the same line
      b.off += (Math.random() - 0.5) * 0.5;
      const wob = (Math.random() - 0.5) * 1.1;
      const ox = perp.x * (b.off + wob),
        oy = perp.y * (b.off + wob);
      ctx.strokeStyle = css(lightenRgb(base, b.li), b.a * (0.7 + Math.random() * 0.6));
      ctx.lineWidth = b.w * (0.8 + Math.random() * 0.6);
      ctx.beginPath();
      ctx.moveTo(a.x + ox, a.y + oy);
      ctx.quadraticCurveTo(ctrl.x + ox, ctrl.y + oy, bpt.x + ox, bpt.y + oy);
      ctx.stroke();
    }
    // speckle: flecks of pigment thrown off the edge of the brush
    if (Math.random() < 0.22) {
      const n = 1 + ((Math.random() * 3) | 0);
      for (let s = 0; s < n; s++) {
        const spread = run.width * (0.5 + Math.random() * 0.9) * (Math.random() < 0.5 ? -1 : 1);
        const px = bpt.x + perp.x * spread + (Math.random() - 0.5) * 4;
        const py = bpt.y + perp.y * spread + (Math.random() - 0.5) * 4;
        ctx.fillStyle = css(lightenRgb(base, Math.random() * 0.4), 0.18 + Math.random() * 0.32);
        ctx.beginPath();
        ctx.arc(px, py, 0.4 + Math.random() * 1.6, 0, 6.283);
        ctx.fill();
      }
    }
    // impasto: a lighter ridge where the brush pressed hardest
    if (Math.random() < 0.2) {
      ctx.strokeStyle = css(lightenRgb(base, 0.5 + Math.random() * 0.35), 0.16 + Math.random() * 0.2);
      ctx.lineWidth = 0.6 + Math.random() * 1.4;
      ctx.beginPath();
      ctx.moveTo(a.x + perp.x * 2, a.y + perp.y * 2);
      ctx.quadraticCurveTo(ctrl.x, ctrl.y, bpt.x - perp.x * 2, bpt.y - perp.y * 2);
      ctx.stroke();
    }
  }

  function push(x: number, y: number) {
    if (!run) begin();
    buf.push({ x, y });
    const n = buf.length;
    if (n < 3) return;
    const p0 = buf[n - 3]!,
      p1 = buf[n - 2]!,
      p2 = buf[n - 1]!;
    const m1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
    const m2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    const dx = m2.x - m1.x,
      dy = m2.y - m1.y,
      d = Math.hypot(dx, dy) || 1;
    quadSeg(m1, p1, m2, { x: -dy / d, y: dx / d });
    if (buf.length > 40) buf.splice(0, buf.length - 6);
  }

  // Centripetal Catmull-Rom (alpha = 0.5). Unlike the uniform version it never
  // cusps or overshoots, so a fast flick still reads as one round curve.
  function crSeg(p0: Pt, p1: Pt, p2: Pt, p3: Pt) {
    const a = 0.5;
    const t0 = 0;
    const t1 = t0 + Math.pow(Math.hypot(p1.x - p0.x, p1.y - p0.y) || 1e-4, a);
    const t2 = t1 + Math.pow(Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1e-4, a);
    const t3 = t2 + Math.pow(Math.hypot(p3.x - p2.x, p3.y - p2.y) || 1e-4, a);
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const steps = Math.max(3, Math.min(90, Math.ceil(dist / 1.4)));
    for (let s = 1; s <= steps; s++) {
      const t = t1 + ((t2 - t1) * s) / steps;
      const l01x = ((t1 - t) / (t1 - t0)) * p0.x + ((t - t0) / (t1 - t0)) * p1.x;
      const l01y = ((t1 - t) / (t1 - t0)) * p0.y + ((t - t0) / (t1 - t0)) * p1.y;
      const l12x = ((t2 - t) / (t2 - t1)) * p1.x + ((t - t1) / (t2 - t1)) * p2.x;
      const l12y = ((t2 - t) / (t2 - t1)) * p1.y + ((t - t1) / (t2 - t1)) * p2.y;
      const l23x = ((t3 - t) / (t3 - t2)) * p2.x + ((t - t2) / (t3 - t2)) * p3.x;
      const l23y = ((t3 - t) / (t3 - t2)) * p2.y + ((t - t2) / (t3 - t2)) * p3.y;
      const l012x = ((t2 - t) / (t2 - t0)) * l01x + ((t - t0) / (t2 - t0)) * l12x;
      const l012y = ((t2 - t) / (t2 - t0)) * l01y + ((t - t0) / (t2 - t0)) * l12y;
      const l123x = ((t3 - t) / (t3 - t1)) * l12x + ((t - t1) / (t3 - t1)) * l23x;
      const l123y = ((t3 - t) / (t3 - t1)) * l12y + ((t - t1) / (t3 - t1)) * l23y;
      push(
        ((t2 - t) / (t2 - t1)) * l012x + ((t - t1) / (t2 - t1)) * l123x,
        ((t2 - t) / (t2 - t1)) * l012y + ((t - t1) / (t2 - t1)) * l123y,
      );
    }
  }

  // raw pointer samples, lightly smoothed; we always draw one sample behind
  // the cursor so every segment has a real point on both sides of it.
  let raws: Pt[] = [];
  function feed(p: Pt) {
    raws.push(p);
    if (raws.length > 4) raws.shift();
    if (raws.length === 4) crSeg(raws[0]!, raws[1]!, raws[2]!, raws[3]!);
  }

  function move(cx: number, cy: number) {
    const r = canvas.getBoundingClientRect(),
      x = cx - r.left,
      y = cy - r.top,
      now = performance.now();
    if (x < -60 || y < -60 || x > w + 60 || y > h + 60) {
      run = null;
      buf = [];
      raws = [];
      return;
    }
    if (now - lastT > 170) {
      begin();
      raws = [];
    }
    lastT = now;
    let p = { x, y };
    const last = raws[raws.length - 1];
    if (last) {
      const d = Math.hypot(p.x - last.x, p.y - last.y);
      if (d < 1.2) return;
      // gentle low pass on the input: kills the micro jitter that turns a
      // fast drag into a chain of straight chords
      p = { x: last.x + (p.x - last.x) * 0.82, y: last.y + (p.y - last.y) * 0.82 };
    }
    if (!raws.length) {
      // prime the spline so the very first move is already curved
      raws.push({ x: p.x - 0.1, y: p.y - 0.1 }, { x: p.x - 0.05, y: p.y - 0.05 });
    }
    feed(p);
  }

  function paintPath(pts: Pt[], color?: string, width?: number) {
    begin(color, width);
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)]!,
        p1 = pts[i]!,
        p2 = pts[i + 1]!,
        p3 = pts[Math.min(pts.length - 1, i + 2)]!;
      crSeg(p0, p1, p2, p3);
    }
    run = null;
    buf = [];
  }

  return { resize, move, paintPath, dims: () => ({ w, h }) };
}

export function prefersReduced() {
  return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}
