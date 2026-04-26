import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-md bg-gradient-accent" aria-hidden />
            <span className="font-semibold">Pocket Reviews</span>
          </div>
          <p className="mt-2 max-w-md text-xs text-muted-foreground">
            Affiliate disclaimer: As an Amazon Associate, we may earn from qualifying purchases.
            This does not affect the price you pay.
          </p>
        </div>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/about" className="hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link to="/about" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pocket Reviews. All rights reserved.
      </div>
    </footer>
  );
}
