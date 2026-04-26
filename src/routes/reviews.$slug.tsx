import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AmazonCTA } from "@/components/amazon-cta";
import { getReview, reviews } from "@/data/reviews";

export const Route = createFileRoute("/reviews/$slug")({
  loader: ({ params }) => {
    const review = getReview(params.slug);
    if (!review) throw notFound();
    return review;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Pocket Reviews` },
          { name: "description", content: loaderData.summary.slice(0, 155) },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary.slice(0, 155) },
          { property: "og:image", content: loaderData.image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div>
          <h1 className="text-3xl font-semibold">Review not found</h1>
          <p className="mt-2 text-muted-foreground">This review doesn't exist (yet).</p>
          <Link to="/reviews" className="mt-6 inline-block text-primary hover:underline">
            ← Back to all reviews
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
  component: ReviewPage,
});

function ReviewPage() {
  const review = Route.useLoaderData();
  const others = reviews.filter((r) => r.slug !== review.slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-6 py-12 md:py-16 animate-fade-up">
          <Link
            to="/reviews"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All reviews
          </Link>

          {/* Hero */}
          <header className="mt-6">
            <span className="text-xs uppercase tracking-widest text-primary">
              {review.category}
            </span>
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
              {review.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="text-amber-300/90 font-medium">★ {review.rating.toFixed(1)} / 5</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="font-medium text-foreground">{review.price}</span>
            </div>
          </header>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card">
            <img
              src={review.image}
              alt={review.title}
              width={1024}
              height={768}
              className="w-full aspect-[4/3] md:aspect-[16/10] object-cover"
            />
          </div>

          <div className="mt-8">
            <AmazonCTA href={review.amazonUrl} className="w-full sm:w-auto" />
          </div>

          {/* Summary */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-3">Summary</h2>
            <p className="text-muted-foreground leading-relaxed">{review.summary}</p>
          </section>

          {/* Pros / Cons */}
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-emerald-300/90 mb-4">Pros</h3>
              <ul className="space-y-2.5 text-sm">
                {review.pros.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span className="text-emerald-300/80 mt-0.5">✓</span>
                    <span className="text-foreground/90">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-rose-300/90 mb-4">Cons</h3>
              <ul className="space-y-2.5 text-sm">
                {review.cons.map((c) => (
                  <li key={c} className="flex gap-2.5">
                    <span className="text-rose-300/80 mt-0.5">✕</span>
                    <span className="text-foreground/90">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Mid CTA */}
          <section className="mt-12 rounded-2xl border border-border/60 bg-gradient-accent/10 p-6 text-center glass">
            <p className="text-sm text-muted-foreground">Ready to grab one?</p>
            <div className="mt-3">
              <AmazonCTA href={review.amazonUrl} label="Check Price on Amazon" />
            </div>
          </section>

          {/* Detailed */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Detailed Review</h2>
            <div className="space-y-5 text-foreground/90 leading-relaxed">
              {review.detailed.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-12 rounded-3xl border border-border/60 bg-card p-8 text-center shadow-card">
            <h3 className="text-2xl font-semibold tracking-tight">Our verdict: worth it.</h3>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              {review.title} is one of the strongest picks in its price range. Tap below to check
              the live price.
            </p>
            <div className="mt-6">
              <AmazonCTA href={review.amazonUrl} label="Buy on Amazon" />
            </div>
          </section>

          {/* Other reviews */}
          {others.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-semibold mb-6">More reviews</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((r) => (
                  <Link
                    key={r.slug}
                    to="/reviews/$slug"
                    params={{ slug: r.slug }}
                    className="group rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/40"
                  >
                    <p className="text-xs text-muted-foreground">{r.category}</p>
                    <p className="mt-1 font-medium group-hover:text-primary transition-colors">
                      {r.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
