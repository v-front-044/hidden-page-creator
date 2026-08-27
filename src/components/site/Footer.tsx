import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-surface">
      <div className="container-site grid gap-8 py-10 md:grid-cols-3">
        <div>
          <span className="text-2xl font-extrabold tracking-tight text-foreground">
            1<span className="text-primary">win</span>
          </span>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Informational review portal about the 1Win bookmaker and casino for players
            from India. We are not a gambling operator.
          </p>
        </div>

        <nav className="grid gap-2 text-sm">
          <span className="font-semibold text-foreground">Sections</span>
          <Link to="/app" className="text-muted-foreground hover:text-foreground">
            Mobile App
          </Link>
          <Link to="/registration" className="text-muted-foreground hover:text-foreground">
            Registration
          </Link>
          <Link to="/bonuses" className="text-muted-foreground hover:text-foreground">
            Bonuses
          </Link>
          <Link to="/casino" className="text-muted-foreground hover:text-foreground">
            Casino
          </Link>
          <Link to="/cricket-betting" className="text-muted-foreground hover:text-foreground">
            Cricket Betting
          </Link>
          <Link to="/payment-methods" className="text-muted-foreground hover:text-foreground">
            Payment Methods
          </Link>
        </nav>

        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Responsible gambling</span>
          <p className="mt-3 leading-relaxed">
            18+ only. Gambling can be addictive — play responsibly and only bet what you
            can afford to lose. Use deposit limits and self-exclusion tools.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} 1win India review. All rights reserved.
      </div>
    </footer>
  );
}
