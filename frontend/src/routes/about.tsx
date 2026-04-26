import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, IndianRupee, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pocket Reviews" },
      {
        name: "description",
        content:
          "Pocket Reviews provides honest, hands-on reviews of budget products under ₹2000 to help you buy smarter.",
      },
      { property: "og:title", content: "About — Pocket Reviews" },
      {
        property: "og:description",
        content: "Honest reviews of budget products to help you buy smarter.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: BadgeCheck,
    title: "Honest",
    desc: "No paid reviews. No sponsored verdicts. Just what we'd tell a friend.",
  },
  {
    icon: IndianRupee,
    title: "Affordable",
    desc: "Every product reviewed is under ₹2000 — the price most people actually shop in.",
  },
  {
    icon: Sparkles,
    title: "Hands-on",
    desc: "We use each product for a week before publishing a verdict. No spec sheets.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-grid pointer-events-none" />
          <div className="absolute inset-0 bg-hero pointer-events-none" />
          <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28 animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              About us
            </p>
            <h1 className="font-display mt-2 text-4xl md:text-7xl font-medium tracking-[-0.03em] text-gradient">
              Reviews you can actually trust.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Pocket Reviews is a tiny, independent publication that tests budget products with
              real-world use — then tells you the truth. No paid placements. No fluff. Just clear
              verdicts so you spend smarter.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8">
            <h2 className="text-lg font-semibold tracking-tight">How we test</h2>
            <ol className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
                  1
                </span>
                <span>
                  <span className="text-foreground font-medium">We buy it.</span> Every product is
                  purchased at full price — no PR samples.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
                  2
                </span>
                <span>
                  <span className="text-foreground font-medium">We use it.</span> A minimum of 7
                  days of real-world testing across different scenarios.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
                  3
                </span>
                <span>
                  <span className="text-foreground font-medium">We rate it.</span> Honest pros,
                  cons, and a verdict — what we'd tell a friend.
                </span>
              </li>
            </ol>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-base font-semibold">Affiliate disclosure</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              As an Amazon Associate, Pocket Reviews may earn a small commission from qualifying
              purchases made through links on this site. This comes at no extra cost to you and
              keeps our reviews independent and free.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-6 py-3 font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Explore reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
