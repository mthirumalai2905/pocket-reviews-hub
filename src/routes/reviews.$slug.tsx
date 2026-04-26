import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Check, ShieldCheck, Star, X } from "lucide-react";
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
          <Link to="/reviews" className="mt-6 inline-block text-accent hover:underline">
            ← Back to all reviews
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  ),
  component: ReviewPage,
});

function Rating({ value }: { value: number }) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.round(value) ? "fill-warning text-warning" : "text-border"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold">{value.toFixed(1)}</span>
      <span className="text-sm text-muted-foreground">/ 5</span>
    </div>
  );
}

function ReviewPage() {
  const review = Route.useLoaderData();
  const others = reviews.filter((r) => r.slug !== review.slug).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero header */}
        <section className="relative border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-hero pointer-events-none" />
          <div className="relative mx-auto max-w-6xl px-6 pt-10 pb-12 md:pt-14 md:pb-16">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All reviews
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center animate-fade-up">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {review.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-[11px] font-semibold text-success">
                    <ShieldCheck className="h-3 w-3" /> Editor's pick
                  </span>
                </div>
                <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
                  {review.title}
                </h1>
                <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                  {review.shortDescription}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Rating value={review.rating} />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Price </span>
                    <span className="font-semibold">{review.price}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> Updated this month
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <AmazonCTA href={review.amazonUrl} className="w-full sm:w-auto" />
                  <a
                    href="#detailed-review"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-medium hover:bg-secondary transition-colors"
                  >
                    Read full review
                  </a>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
                  <img
                    src={review.image}
                    alt={review.title}
                    width={1024}
                    height={768}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl glass border border-border px-3 py-2 text-xs">
                    <span className="font-medium">Verified hands-on review</span>
                    <span className="inline-flex items-center gap-1 text-success font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5" /> Tested
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="mx-auto max-w-4xl px-6 py-16">
          {/* Score card */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Our verdict
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  {review.rating >= 4.3 ? "Highly recommended" : "Worth considering"}
                </p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight">
                  {review.rating.toFixed(1)}
                </span>
                <span className="pb-2 text-sm text-muted-foreground">/ 5.0</span>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{review.summary}</p>
          </div>

          {/* Pros / Cons */}
          <section className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-success/15 text-success">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="text-base font-semibold">What we loved</h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {review.pros.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                  <X className="h-4 w-4" />
                </span>
                <h3 className="text-base font-semibold">What could be better</h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {review.cons.map((c) => (
                  <li key={c} className="flex gap-2.5">
                    <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Mid CTA */}
          <section className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 md:p-7 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Best price right now</p>
              <p className="text-xl font-semibold tracking-tight">{review.price} on Amazon</p>
            </div>
            <AmazonCTA href={review.amazonUrl} label="Check live price" />
          </section>

          {/* Detailed */}
          <section id="detailed-review" className="mt-12 scroll-mt-20">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Deep dive
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
              The detailed review
            </h2>
            <div className="mt-6 space-y-5 text-foreground/90 leading-[1.75] text-[15px]">
              {review.detailed.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-14 relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10 text-center shadow-lg">
            <div className="absolute inset-0 bg-hero pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Final verdict
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
                {review.title} is worth every rupee.
              </h3>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                Tap below to check the live price and grab one before stocks run out.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <AmazonCTA href={review.amazonUrl} label="Buy on Amazon" />
                <Link
                  to="/reviews"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-medium hover:bg-secondary transition-colors"
                >
                  Compare more
                </Link>
              </div>
            </div>
          </section>

          {/* More */}
          {others.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-semibold tracking-tight mb-6">More reviews</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((r) => (
                  <Link
                    key={r.slug}
                    to="/reviews/$slug"
                    params={{ slug: r.slug }}
                    className="group rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {r.category}
                    </p>
                    <p className="mt-2 font-medium group-hover:text-accent transition-colors">
                      {r.title}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-warning text-warning" /> {r.rating.toFixed(1)} • {r.price}
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
