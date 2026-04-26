import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import type { Review } from "@/data/reviews";

export function ReviewCard({ review, priority = false }: { review: Review; priority?: boolean }) {
  return (
    <Link
      to="/reviews/$slug"
      params={{ slug: review.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-foreground/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={review.image}
          alt={review.title}
          width={1024}
          height={768}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[11px] font-medium border border-border">
          {review.category}
        </div>
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold border border-border">
          <Star className="h-3 w-3 fill-warning text-warning" />
          {review.rating.toFixed(1)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-[17px] font-semibold leading-snug tracking-tight">
          {review.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {review.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-semibold">{review.price}</span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
            Read review
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
