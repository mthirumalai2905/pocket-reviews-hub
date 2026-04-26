import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { ThemeToggle } from "./theme-toggle";
import { isAdminEmail } from "@/lib/auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const isAdmin = isAdminEmail(user?.primaryEmailAddress?.emailAddress);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-baseline gap-1">
            <span className="font-display text-[22px] font-medium tracking-tight">
              Pocket
            </span>
            <span className="font-display-italic text-[22px] font-medium text-accent">
              Reviews
            </span>
            <span className="font-display text-[22px] text-accent">.</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border bg-card/60 backdrop-blur px-1.5 py-1.5 shadow-xs">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{
                  className: "bg-foreground text-background shadow-sm",
                }}
                inactiveProps={{
                  className: "text-muted-foreground hover:text-foreground hover:bg-secondary",
                }}
                className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Search"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <SignedOut>
              <Link
                to="/auth"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium"
              >
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium"
                >
                  Admin
                </Link>
              ) : null}
              <div className="hidden sm:flex">
                <UserButton />
              </div>
            </SignedIn>
            <Link
              to="/reviews"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background pl-3.5 pr-3 py-1.5 text-sm font-semibold hover:opacity-90 transition-opacity group"
            >
              Browse
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="mx-auto max-w-6xl px-6 py-6 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="font-display text-lg px-4 py-3 rounded-xl hover:bg-secondary hover:text-foreground transition-colors flex items-center justify-between"
              >
                {l.label}
                <ArrowRight className="h-4 w-4 opacity-60" />
              </Link>
            ))}
            <Link
              to="/reviews"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-3 font-semibold"
            >
              Browse all reviews <ArrowRight className="h-4 w-4" />
            </Link>
            <SignedOut>
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-input px-4 py-3 font-semibold"
              >
                Sign in
              </Link>
            </SignedOut>
            <SignedIn>
              {isAdmin ? (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-input px-4 py-3 font-semibold"
                >
                  Open admin
                </Link>
              ) : null}
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
}
