import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, IndianRupee, Sparkles, Star, TrendingUp } from "lucide-react";
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
          "Honest, hands-on reviews of the best budget products under ₹2000 — sneakers, headphones, smartwatches and more.",
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

const stats = [
  { label: "Products tested", value: "120+" },
  { label: "Hours of testing", value: "400h" },
  { label: "Avg. price tested", value: "₹1.5k" },
  { label: "Reader savings", value: "₹2L+" },
];

const features = [
  {
    icon: BadgeCheck,
    title: "Hands-on testing",
    desc: "Every product is bought, used for at least a week, and rated against real-world use — not specs.",
  },
  {
    icon: IndianRupee,
    title: "Strictly under ₹2000",
    desc: "We focus only on the price range most Indians actually shop in. No flagships, no fluff.",
  },
  {
    icon: Sparkles,
    title: "No paid placements",
    desc: "We don't take money for reviews. Affiliate links never influence our verdict — ever.",
  },
];

function HomePage() {
  const featured = reviews.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-grid pointer-events-none" />
          <div className="absolute inset-0 bg-hero pointer-events-none" />
          <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center animate-fade-up">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors shadow-xs"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                NEW
              </span>
              3 fresh reviews this week
              <ArrowRight className="h-3 w-3" />
            </Link>

            <h1 className="mt-6 text-[40px] leading-[1.05] md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] text-gradient">
              Buy smarter.<br className="hidden md:block" /> Spend less.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Honest, hands-on reviews of the best products under{" "}
              <span className="text-foreground font-medium">₹2000</span>. No fluff. No paid
              placements. Just verdicts you can trust.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/reviews"
                className="group inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                Browse all reviews
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-medium text-foreground hover:bg-secondary transition-colors w-full sm:w-auto justify-center"
              >
                How we test
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" /> 4.6 reader rating
              </span>
              <span className="hidden sm:inline">•</span>
              <span>10,000+ monthly readers</span>
              <span className="hidden sm:inline">•</span>
              <span>Updated weekly</span>
            </div>
          </div>

          {/* Stats strip */}
          <div className="relative border-t border-border bg-card/40">
            <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-6 text-center">
                  <div className="text-2xl md:text-3xl font-semibold tracking-tight">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                <TrendingUp className="h-3.5 w-3.5" /> Editor's picks
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                Top picks worth your money
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Hand-tested by our editors this month. These are the products we'd actually
                recommend to a friend.
              </p>
            </div>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              View all reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((r, i) => (
              <ReviewCard key={r.slug} review={r} priority={i === 0} />
            ))}
          </div>
        </section>

        {/* Why us */}
        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Why Pocket Reviews
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                Reviews built on real use, not press releases.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Latest
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
                Fresh reviews
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-14 text-center shadow-lg">
            <div className="absolute inset-0 bg-hero pointer-events-none" />
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Stop overpaying. Start owning what's worth it.
              </h3>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Browse curated reviews under ₹2000 and find your next upgrade in minutes.
              </p>
              <div className="mt-7">
                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  Explore reviews <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
