import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReviewCard } from "@/components/review-card";
import { reviews } from "@/data/reviews";

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
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-hero">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
              All Reviews
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Every review we've published, in one place. All under ₹2000.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-12">
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
