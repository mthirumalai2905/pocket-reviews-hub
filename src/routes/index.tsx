import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReviewCard } from "@/components/review-card";
import { reviews } from "@/data/reviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pocket Reviews — Best Budget Product Reviews Under ₹2000" },
      {
        name: "description",
        content:
          "Honest, no-fluff reviews of the best budget products under ₹2000 — sneakers, headphones, smartwatches and more.",
      },
      { property: "og:title", content: "Pocket Reviews — Best Budget Products Under ₹2000" },
      {
        property: "og:description",
        content: "Honest reviews of budget products to help you buy smarter.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = reviews.slice(0, 3);
  const latest = reviews;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-hero">
          <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 text-center animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Honest reviews. Zero fluff.
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gradient">
              Best Budget Product Reviews
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base md:text-lg text-muted-foreground">
              Honest reviews under ₹2000 — so you spend less time researching and more time using
              what you love.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                to="/reviews"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-accent px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Browse Reviews →
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
              >
                About us
              </Link>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Featured Reviews
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Handpicked picks worth your money this month.
              </p>
            </div>
            <Link
              to="/reviews"
              className="hidden md:inline text-sm text-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((r, i) => (
              <ReviewCard key={r.slug} review={r} priority={i === 0} />
            ))}
          </div>
        </section>

        {/* Latest */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
            Latest Reviews
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
