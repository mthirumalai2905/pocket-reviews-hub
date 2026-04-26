import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pocket Reviews" },
      {
        name: "description",
        content:
          "Pocket Reviews provides honest reviews of budget products to help you make better buying decisions.",
      },
      { property: "og:title", content: "About — Pocket Reviews" },
      {
        property: "og:description",
        content: "Honest reviews of budget products to help you buy smarter.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-hero">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
              About Pocket Reviews
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Pocket Reviews provides honest reviews of budget products to help you make better
              buying decisions.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We focus on products under ₹2000 — the price range most people actually shop in.
              Every review is written after real hands-on use, with clear pros, cons, and a verdict
              you can trust.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { t: "Honest", d: "No paid reviews. Ever." },
                { t: "Practical", d: "Real-world testing only." },
                { t: "Affordable", d: "Everything under ₹2000." },
              ].map((c) => (
                <div
                  key={c.t}
                  className="rounded-2xl border border-border/60 bg-card p-5 shadow-card"
                >
                  <p className="font-semibold">{c.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <h2 className="text-lg font-semibold">Affiliate disclosure</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                As an Amazon Associate, Pocket Reviews may earn a small commission from qualifying
                purchases made through links on this site. This comes at no extra cost to you and
                helps keep our reviews independent and free.
              </p>
            </div>

            <div className="mt-10">
              <Link
                to="/reviews"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-accent px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Explore Reviews →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
