import { getReview, reviews as seedReviews, type Review } from "@/data/reviews";

const STORAGE_KEY = "pocket_reviews_admin_posts_v1";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1512258146323-b50194e1212e?auto=format&fit=crop&w=1200&q=80";

export type ManagedReview = Review & {
  published: boolean;
  createdAt: string;
  authorEmail: string;
};

export type ReviewDraftInput = Omit<Review, "slug" | "image"> & {
  slug?: string;
  image?: string;
};

const seedManagedReviews: ManagedReview[] = seedReviews.map((review) => ({
  ...review,
  published: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  authorEmail: "seed@pocketreviews.local",
}));

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function isBrowser() {
  return typeof window !== "undefined";
}

function readCustomReviews() {
  if (!isBrowser()) return [] as ManagedReview[];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ManagedReview[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCustomReviews(customReviews: ManagedReview[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customReviews));
}

export function getManagedReviews() {
  const custom = readCustomReviews();
  return [...custom, ...seedManagedReviews];
}

export function getPublishedReviews() {
  return getManagedReviews().filter((review) => review.published);
}

export function getPublishedReviewBySlug(slug: string) {
  const customReview = readCustomReviews().find((review) => review.slug === slug && review.published);
  if (customReview) return customReview;
  return getReview(slug);
}

export function createAdminReview(input: ReviewDraftInput, authorEmail: string) {
  const customReviews = readCustomReviews();
  const requestedSlug = input.slug && input.slug.trim().length > 0 ? input.slug : input.title;
  const baseSlug = toSlug(requestedSlug || "review");
  let slug = baseSlug;
  let index = 2;

  const existingSlugs = new Set(getManagedReviews().map((review) => review.slug));
  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  const newReview: ManagedReview = {
    ...input,
    slug,
    image: input.image && input.image.trim().length > 0 ? input.image : FALLBACK_IMAGE,
    published: false,
    createdAt: new Date().toISOString(),
    authorEmail,
  };

  customReviews.unshift(newReview);
  writeCustomReviews(customReviews);
  return newReview;
}

export function setReviewPublished(slug: string, published: boolean) {
  const customReviews = readCustomReviews();
  const updated = customReviews.map((review) =>
    review.slug === slug ? { ...review, published } : review,
  );
  writeCustomReviews(updated);
}
