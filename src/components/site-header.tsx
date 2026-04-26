import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-[15px]">
          Pocket Reviews<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/reviews", label: "Reviews" },
            { to: "/about", label: "About" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/reviews"
            className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-foreground text-background px-3.5 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Browse
          </Link>
        </div>
      </div>
    </header>
  );
}
