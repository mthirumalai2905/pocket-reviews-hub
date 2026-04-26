import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReviewCard } from "@/components/review-card";
import { getPublishedReviews, type ManagedReview } from "@/lib/review-store";

export const Route = createFileRoute("/reviews/")({
  head: () => ({
    meta: [
      { title: "All Reviews — Pocket Reviews" },
      {
        name: "description",
        content: "Browse every honest budget product review on Pocket Reviews.",
      },
      { property: "og:title", content: "All Reviews — Pocket Reviews" },
      {
        property: "og:description",
        content: "Browse every honest budget product review.",
      },
    ],
  }),
  component: ReviewsIndex,
});

function ReviewsIndex() {
  const [reviews, setReviews] = useState<ManagedReview[]>([]);

  useEffect(() => {
    getPublishedReviews()
      .then(setReviews)
      .catch(() => setReviews([]));
  }, []);

  const categories = Array.from(new Set(reviews.map((r) => r.category)));
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-grid pointer-events-none" />
          <div className="absolute inset-0 bg-hero pointer-events-none" />
          <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24 animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              The library
            </p>
            <h1 className="font-display mt-2 text-4xl md:text-6xl font-medium tracking-[-0.03em] text-gradient">
              All reviews
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Every review we've published — from sneakers to smartwatches. All under ₹2000, all
              hands-on tested.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-foreground text-background px-3 py-1 text-xs font-medium">
                All ({reviews.length})
              </span>
              {categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
