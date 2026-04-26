import { Link } from "@tanstack/react-router";
import type { Review } from "@/data/reviews";

export function ReviewCard({ review, priority = false }: { review: Review; priority?: boolean }) {
  return (
    <Link
      to="/reviews/$slug"
      params={{ slug: review.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-card border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
    >
      <div className="aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={review.image}
          alt={review.title}
          width={1024}
          height={768}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground uppercase tracking-wider">{review.category}</span>
          <span className="text-amber-300/90">★ {review.rating.toFixed(1)}</span>
        </div>
        <h3 className="text-lg font-semibold leading-snug">{review.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{review.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-medium">{review.price}</span>
          <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
            Read Review →
          </span>
        </div>
      </div>
    </Link>
  );
}
