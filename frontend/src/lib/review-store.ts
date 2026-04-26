import type { Review } from "@/data/reviews";

export type ManagedReview = Review & {
  published: boolean;
  createdAt: string;
  authorEmail: string;
};

export type ReviewDraftInput = Omit<Review, "slug" | "image"> & {
  image?: string;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") || "";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, init);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function getManagedReviews() {
  const data = await request<{ reviews: ManagedReview[] }>("/api/reviews");
  return data.reviews;
}

export async function getPublishedReviews() {
  const data = await request<{ reviews: ManagedReview[] }>("/api/reviews?published=true");
  return data.reviews;
}

export async function getPublishedReviewBySlug(slug: string) {
  const data = await request<{ reviews: ManagedReview[] }>(
    `/api/reviews?published=true&slug=${encodeURIComponent(slug)}`,
  );
  return data.reviews[0];
}

export async function createAdminReview(input: ReviewDraftInput, authorEmail: string) {
  const data = await request<{ review: ManagedReview }>("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      authorEmail,
    }),
  });
  return data.review;
}

export async function setReviewPublished(slug: string, published: boolean, authorEmail: string) {
  await request<{ ok: boolean }>("/api/reviews", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug,
      published,
      authorEmail,
    }),
  });
}
