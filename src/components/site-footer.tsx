import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-semibold tracking-tight">
            Pocket Reviews<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Honest, hands-on reviews of budget products under ₹2000. Helping you spend smarter,
            one review at a time.
          </p>
          <p className="mt-4 max-w-sm text-xs text-muted-foreground">
            As an Amazon Associate, we may earn from qualifying purchases at no extra cost to you.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-foreground text-muted-foreground transition-colors">Home</Link></li>
            <li><Link to="/reviews" className="hover:text-foreground text-muted-foreground transition-colors">All Reviews</Link></li>
            <li><Link to="/about" className="hover:text-foreground text-muted-foreground transition-colors">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Legal
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-foreground text-muted-foreground transition-colors">Privacy</Link></li>
            <li><Link to="/about" className="hover:text-foreground text-muted-foreground transition-colors">Disclosure</Link></li>
            <li><Link to="/about" className="hover:text-foreground text-muted-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pocket Reviews. Crafted for smarter shopping.
      </div>
    </footer>
  );
}
