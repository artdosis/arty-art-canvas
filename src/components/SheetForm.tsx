import { useId, useRef, useState } from "react";
import type { Field } from "@/lib/data";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENDPOINT = import.meta.env["VITE_SHEETS_ENDPOINT"] as string | undefined;

function fieldName(f: Field) {
  return f.name || f.l.toLowerCase().replace(/[^a-z]+/g, "_").replace(/^_|_$/g, "");
}

export type SheetFormProps = {
  sheet: string;
  type: string;
  cta: string;
  fields?: Field[];
  title?: string;
  msg?: string;
  heading?: string;
};

export function SheetForm({ sheet, type, cta, fields = [], title = "Thank you.", msg = "We will be in touch soon.", heading }: SheetFormProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const all: Field[] = [
    { l: "Your name", t: "text", req: true, name: "name", ac: "name" },
    { l: "Email", t: "text", req: true, name: "email", ac: "email", im: "email" },
    ...fields,
  ];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const next: Record<string, string> = {};
    let first: HTMLElement | null = null;
    for (const f of all) {
      if (!f.req) continue;
      const n = fieldName(f);
      const el = form.elements.namedItem(n) as HTMLInputElement | null;
      const v = (el?.value || "").trim();
      if (!v) next[n] = "Please fill this in.";
      else if (n === "email" && !EMAIL.test(v)) next[n] = "Please enter a valid email address.";
      if (next[n] && !first) first = el;
    }
    setErrors(next);
    if (Object.keys(next).length) {
      first?.focus();
      return;
    }
    setSending(true);
    const payload: Record<string, string> = {
      sheet,
      type,
      page: typeof location !== "undefined" ? location.pathname : "",
      ts: new Date().toISOString(),
    };
    form.querySelectorAll<HTMLInputElement>("input,select,textarea").forEach((f) => {
      if (f.name) payload[f.name] = f.value;
    });
    const finish = () => setDone(true);
    if (ENDPOINT) {
      fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      })
        .then(finish)
        .catch(finish);
    } else {
      setTimeout(finish, 300);
    }
  }

  if (done) {
    return (
      <div className="form form--done" role="status" aria-live="polite">
        <div aria-hidden="true">
          <svg viewBox="0 0 48 48" width="48" height="48">
            <circle cx="24" cy="24" r="22" fill="none" stroke="#FAEC00" strokeWidth="3" />
            <path d="M15 24l6 6 12-13" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3>{title}</h3>
        <p>{msg}</p>
      </div>
    );
  }

  return (
    <>
      {heading ? <h3 style={{ marginBottom: 16 }}>{heading}</h3> : null}
      <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
        {all.map((f) => {
          const n = fieldName(f);
          const id = `${uid}-${n}`;
          const err = errors[n];
          const cls = "finput" + (err ? " err" : "");
          return (
            <div className="frow" key={n}>
              <label className="flabel" htmlFor={id}>
                {f.l}
                {f.req ? <span className="freq"> *</span> : null}
              </label>
              {f.t === "area" ? (
                <textarea className={cls} id={id} name={n} rows={3} defaultValue="" />
              ) : f.t === "select" ? (
                <select className={cls} id={id} name={n} defaultValue="">
                  <option value="" disabled>
                    Choose one…
                  </option>
                  {(f.opts || []).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  className={cls}
                  id={id}
                  name={n}
                  type={n === "email" ? "email" : "text"}
                  {...(f.im ? { inputMode: f.im as "email" | "numeric" } : {})}
                  {...(f.ac ? { autoComplete: f.ac } : {})}
                  {...(f.ph ? { placeholder: f.ph } : {})}
                  {...(n === "email" ? { spellCheck: false } : {})}
                  aria-invalid={err ? true : undefined}
                />
              )}
              {err ? <span className="ferr">{err}</span> : null}
            </div>
          );
        })}
        <button className="btn btn--yellow fsubmit" type="submit" disabled={sending}>
          {cta}
          <span className="btn__ico" aria-hidden="true">
            →
          </span>
        </button>
      </form>
    </>
  );
}
