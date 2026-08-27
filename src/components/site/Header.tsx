import { Link } from "@tanstack/react-router";
import { useState } from "react";

const NAV = [
  { to: "/app", label: "App" },
  { to: "/registration", label: "Registration" },
  { to: "/bonuses", label: "Bonuses" },
  { to: "/casino", label: "Casino" },
  { to: "/cricket-betting", label: "Cricket Betting" },
  { to: "/payment-methods", label: "Payment" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-site flex h-16 items-center gap-6">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-foreground">
          1<span className="text-primary">win</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/app"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Download
          </Link>
          <Link
            to="/registration"
            className="rounded-lg bg-success px-4 py-2 text-sm font-semibold text-success-foreground transition-opacity hover:opacity-90"
          >
            Registration
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border px-3 py-2 text-sm text-foreground lg:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {open ? (
        <nav className="container-site grid gap-1 pb-4 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
