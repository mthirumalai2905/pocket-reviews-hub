import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isAdminEmail } from "@/lib/auth";
import {
  createAdminReview,
  getManagedReviewBySlug,
  getManagedReviews,
  setReviewPublished,
  updateAdminReview,
  type ManagedReview,
} from "@/lib/review-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Pocket Reviews" },
      {
        name: "description",
        content: "Admin panel for creating and publishing Pocket Reviews product review blogs.",
      },
    ],
  }),
  component: AdminPage,
});

type FormState = {
  title: string;
  category: string;
  shortDescription: string;
  price: string;
  rating: string;
  summary: string;
  pros: string;
  cons: string;
  detailed: string;
  amazonUrl: string;
  image: string;
};

const initialForm: FormState = {
  title: "",
  category: "",
  shortDescription: "",
  price: "",
  rating: "4.3",
  summary: "",
  pros: "",
  cons: "",
  detailed: "",
  amazonUrl: "https://www.amazon.in/?tag=YOUR_AFFILIATE_TAG",
  image: "",
};

function AdminPage() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const isAdmin = isAdminEmail(email);

  const [form, setForm] = useState<FormState>(initialForm);
  const [reviews, setReviews] = useState<ManagedReview[]>([]);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [previewReview, setPreviewReview] = useState<ManagedReview | null>(null);
  const [status, setStatus] = useState("");

  const customReviews = useMemo(
    () => reviews.filter((review) => review.authorEmail !== "seed@pocketreviews.local"),
    [reviews],
  );

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function refreshReviews() {
    const items = await getManagedReviews();
    setReviews(items);
  }

  async function handleCreateReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !isAdmin) return;

    const rating = Number(form.rating);
    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      setStatus("Rating must be between 0 and 5.");
      return;
    }

    const payload = {
      title: form.title,
      category: form.category,
      shortDescription: form.shortDescription,
      price: form.price,
      rating,
      summary: form.summary,
      pros: splitLines(form.pros),
      cons: splitLines(form.cons),
      detailed: splitLines(form.detailed),
      amazonUrl: form.amazonUrl,
      image: form.image,
    };

    try {
      if (editingSlug) {
        const updated = await updateAdminReview(editingSlug, payload, email);
        setStatus(`Updated: ${updated.title}`);
        setEditingSlug(null);
      } else {
        const newReview = await createAdminReview(payload, email);
        setStatus(`Draft created: ${newReview.title}. Publish it when ready.`);
      }

      setForm(initialForm);
      await refreshReviews();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save review.";
      setStatus(`Save failed: ${message}`);
    }
  }

  async function handlePublish(slug: string) {
    if (!email) return;
    try {
      await setReviewPublished(slug, true, email);
      setStatus("Review published. It is now visible in the public reviews section.");
      await refreshReviews();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to publish review.";
      setStatus(`Publish failed: ${message}`);
    }
  }

  function handleEdit(review: ManagedReview) {
    setEditingSlug(review.slug);
    setForm({
      title: review.title,
      category: review.category,
      shortDescription: review.shortDescription,
      price: review.price,
      rating: String(review.rating),
      summary: review.summary,
      pros: review.pros.join("\n"),
      cons: review.cons.join("\n"),
      detailed: review.detailed.join("\n"),
      amazonUrl: review.amazonUrl,
      image: review.image,
    });
    setStatus(`Editing review: ${review.title}`);
  }

  async function handlePreviewDraft(slug: string) {
    if (!email) return;
    try {
      const review = await getManagedReviewBySlug(slug, email);
      setPreviewReview(review ?? null);
    } catch {
      setPreviewReview(null);
      setStatus("Could not load draft preview.");
    }
  }

  useEffect(() => {
    refreshReviews().catch(() => {
      setStatus("Could not load reviews from database.");
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        <SignedOut>
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h1 className="text-2xl font-semibold">Sign in required</h1>
            <p className="mt-2 text-muted-foreground">Please sign in to access the admin dashboard.</p>
            <Link
              to="/auth"
              className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Go to Auth
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          {!isAdmin ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <h1 className="text-2xl font-semibold">Admin access denied</h1>
              <p className="mt-2 text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{email}</span>, but only
                the configured admin account can create and publish product reviews.
              </p>
              <Link
                to="/reviews"
                className="mt-5 inline-flex rounded-md border border-input px-4 py-2 text-sm font-medium"
              >
                Browse reviews
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <section className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Admin dashboard
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  {editingSlug ? "Edit product review blog" : "Create product review blog"}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Signed in as {email}. New reviews start as draft. Publish to show them in the public
                  review list.
                </p>
                {status ? (
                  <p className="mt-4 rounded-md bg-secondary px-3 py-2 text-sm text-foreground">
                    {status}
                  </p>
                ) : null}
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <form onSubmit={handleCreateReview} className="grid gap-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Title">
                      <Input
                        required
                        value={form.title}
                        onChange={(event) => handleChange("title", event.target.value)}
                      />
                    </Field>
                    <Field label="Category">
                      <Input
                        required
                        value={form.category}
                        onChange={(event) => handleChange("category", event.target.value)}
                      />
                    </Field>
                  </div>
                  <Field label="Short description">
                    <Textarea
                      required
                      rows={2}
                      value={form.shortDescription}
                      onChange={(event) => handleChange("shortDescription", event.target.value)}
                    />
                  </Field>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="Price">
                      <Input
                        required
                        value={form.price}
                        onChange={(event) => handleChange("price", event.target.value)}
                      />
                    </Field>
                    <Field label="Rating (0-5)">
                      <Input
                        required
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={form.rating}
                        onChange={(event) => handleChange("rating", event.target.value)}
                      />
                    </Field>
                    <Field label="Image URL (optional)">
                      <Input
                        value={form.image}
                        onChange={(event) => handleChange("image", event.target.value)}
                      />
                    </Field>
                  </div>
                  <Field label="Summary">
                    <Textarea
                      required
                      rows={3}
                      value={form.summary}
                      onChange={(event) => handleChange("summary", event.target.value)}
                    />
                  </Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Pros (one line per item)">
                      <Textarea
                        required
                        rows={4}
                        value={form.pros}
                        onChange={(event) => handleChange("pros", event.target.value)}
                      />
                    </Field>
                    <Field label="Cons (one line per item)">
                      <Textarea
                        required
                        rows={4}
                        value={form.cons}
                        onChange={(event) => handleChange("cons", event.target.value)}
                      />
                    </Field>
                  </div>
                  <Field label="Detailed review paragraphs (one line per paragraph)">
                    <Textarea
                      required
                      rows={6}
                      value={form.detailed}
                      onChange={(event) => handleChange("detailed", event.target.value)}
                    />
                  </Field>
                  <Field label="Amazon affiliate URL">
                    <Input
                      required
                      value={form.amazonUrl}
                      onChange={(event) => handleChange("amazonUrl", event.target.value)}
                    />
                  </Field>
                  <Button type="submit" className="w-full md:w-fit">
                    {editingSlug ? "Update review" : "Save draft review"}
                  </Button>
                  {editingSlug ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full md:w-fit"
                      onClick={() => {
                        setEditingSlug(null);
                        setForm(initialForm);
                        setStatus("Edit cancelled.");
                      }}
                    >
                      Cancel edit
                    </Button>
                  ) : null}
                </form>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Your drafts and published reviews</h2>
                <div className="mt-5 space-y-3">
                  {customReviews.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No admin reviews created yet.</p>
                  ) : (
                    customReviews.map((review) => (
                      <div
                        key={review.slug}
                        className="flex flex-col gap-3 rounded-xl border border-border p-4 md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <p className="font-medium">{review.title}</p>
                          <p className="text-xs text-muted-foreground">
                            /reviews/{review.slug} • {review.published ? "Published" : "Draft"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {review.published ? (
                            <Link
                              to="/reviews/$slug"
                              params={{ slug: review.slug }}
                              className="inline-flex rounded-md border border-input px-3 py-1.5 text-sm"
                            >
                              Open
                            </Link>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              className="h-8"
                              onClick={() => handlePreviewDraft(review.slug)}
                            >
                              View draft
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            className="h-8"
                            onClick={() => handleEdit(review)}
                          >
                            Edit
                          </Button>
                          {!review.published ? (
                            <Button
                              type="button"
                              onClick={() => handlePublish(review.slug)}
                              className="h-8"
                            >
                              Publish
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
              {previewReview ? (
                <section className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Draft preview</h2>
                    <Button type="button" variant="outline" onClick={() => setPreviewReview(null)}>
                      Close preview
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">/{previewReview.slug}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{previewReview.title}</h3>
                  <p className="mt-2 text-muted-foreground">{previewReview.shortDescription}</p>
                  <div className="mt-4 grid gap-2">
                    <p className="text-sm font-medium">Summary</p>
                    <p className="text-sm text-muted-foreground">{previewReview.summary}</p>
                  </div>
                </section>
              ) : null}
            </div>
          )}
        </SignedIn>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}
