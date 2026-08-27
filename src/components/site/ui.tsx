import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export function Section({
  title,
  children,
  id,
}: {
  title?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="container-site py-10 md:py-14">
      {title ? (
        <h2 className="mb-5 text-2xl md:text-3xl text-foreground">{title}</h2>
      ) : null}
      <div className="prose-site max-w-none">{children}</div>
    </section>
  );
}

export function PageHero({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <header className="bg-hero border-b border-border">
      <div className="container-site grid gap-8 py-12 md:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h1 className="text-3xl leading-tight md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </div>
        {children ? <div className="lg:justify-self-end">{children}</div> : null}
      </div>
    </header>
  );
}


export function PromoBox({ code = "START2WIN" }: { code?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    toast.success(`Promo code ${code} copied to clipboard`);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-promo surface-card mt-8 max-w-md p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-foreground">
        Get +500% on first deposit
      </p>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy promo code ${code}`}
        className="mt-4 flex w-full items-center gap-2 rounded-lg bg-background/70 p-2 text-left transition-colors hover:bg-background"
      >
        <span className="flex-1 px-2 font-mono text-sm text-foreground">{code}</span>
        <span
          className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
            copied
              ? "bg-success text-success-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </span>
      </button>
      <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
        {copied
          ? "Promo code copied — paste it during registration"
          : "Click the code to copy and use it to get your bonus"}
      </p>
      <Link
        to="/registration"
        className="bg-cta mt-4 block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Sign Up and Get Bonus Now
      </Link>
    </div>
  );
}

export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="mt-4 grid gap-3 md:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={item}
          className="surface-card flex gap-3 p-4 text-sm leading-relaxed text-muted-foreground"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function CardGrid({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="surface-card p-5">
          <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export function DataTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="surface-card mt-4 overflow-hidden">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={k} className={i % 2 ? "bg-surface-2/40" : ""}>
              <th className="w-1/3 border-b border-border p-3 align-top font-semibold text-foreground">
                {k}
              </th>
              <td className="border-b border-border p-3 align-top text-muted-foreground">
                {v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <details key={item.q} className="surface-card group p-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
            {item.q}
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
