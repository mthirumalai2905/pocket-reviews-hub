import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Sparkles } from "lucide-react";
import { isAdminEmail } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — Pocket Reviews" },
      {
        name: "description",
        content: "Sign in to Pocket Reviews. Admin can create and publish new product reviews.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const admin = isAdminEmail(email);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-2">
        <section className="relative overflow-hidden border-b border-border md:border-b-0 md:border-r">
          <div className="absolute inset-0 bg-grid pointer-events-none" />
          <div className="absolute inset-0 bg-hero pointer-events-none" />
          <div className="relative flex h-full flex-col justify-center px-8 py-14 md:px-12">
            <Link to="/" className="group inline-flex items-baseline gap-1">
              <span className="font-display text-3xl font-medium tracking-tight">Pocket</span>
              <span className="font-display-italic text-3xl font-medium text-accent">Reviews</span>
              <span className="font-display text-3xl text-accent">.</span>
            </Link>

            <h1 className="font-display mt-8 max-w-xl text-4xl font-medium tracking-[-0.02em] md:text-6xl">
              Honest product reviews for smart buyers.
            </h1>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Sign in to continue. Admins can draft and publish fresh affiliate-ready product
              reviews that show up in the public reviews section instantly after publishing.
            </p>

            <div className="mt-8 space-y-4 text-sm text-muted-foreground">
              <p className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Clean editor workflow for faster review publishing
              </p>
              <p className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" />
                Admin-only content control and publish access
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-14">
          <SignedOut>
            <SignIn
              routing="hash"
              forceRedirectUrl="/auth"
              signUpForceRedirectUrl="/auth"
              fallbackRedirectUrl="/auth"
              appearance={{
                elements: {
                  card: "shadow-lg border border-border",
                },
              }}
            />
          </SignedOut>

          <SignedIn>
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <div className="mb-5 flex justify-center">
                <UserButton />
              </div>
              <h2 className="text-xl font-semibold">You are signed in</h2>
              <p className="mt-2 text-sm text-muted-foreground">{email ?? "No email found"}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {admin
                  ? "Admin access detected. You can create and publish reviews."
                  : "This account is not an admin. You can browse reviews only."}
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  Home
                </Link>
                <Link
                  to={admin ? "/admin" : "/reviews"}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {admin ? "Open Admin" : "Browse Reviews"}
                </Link>
              </div>
            </div>
          </SignedIn>
        </section>
      </div>
    </main>
  );
}
