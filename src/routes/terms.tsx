import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Pocket Reviews" },
      {
        name: "description",
        content:
          "The terms and conditions governing your use of Pocket Reviews, an independent Amazon affiliate review blog.",
      },
      { property: "og:title", content: "Terms & Conditions — Pocket Reviews" },
      {
        property: "og:description",
        content: "Terms governing the use of Pocket Reviews.",
      },
    ],
  }),
  component: TermsPage,
});

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "content", title: "3. Content & Intellectual Property" },
  { id: "affiliate", title: "4. Affiliate Disclosure" },
  { id: "accuracy", title: "5. Accuracy of Information" },
  { id: "third-party", title: "6. Third-Party Links & Products" },
  { id: "warranties", title: "7. No Warranties" },
  { id: "liability", title: "8. Limitation of Liability" },
  { id: "conduct", title: "9. User Conduct" },
  { id: "privacy", title: "10. Privacy" },
  { id: "law", title: "11. Governing Law" },
  { id: "changes", title: "12. Changes to These Terms" },
  { id: "contact", title: "13. Contact" },
];

function TermsPage() {
  const updated = "April 2026";
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Header */}
        <section className="relative border-b border-border overflow-hidden">
          <div className="absolute inset-0 bg-grid pointer-events-none" />
          <div className="absolute inset-0 bg-hero pointer-events-none" />
          <div className="relative mx-auto max-w-3xl px-6 py-16 md:py-20 animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Legal</p>
            <h1 className="font-display mt-2 text-4xl md:text-6xl font-medium tracking-[-0.03em] text-gradient">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Please read these Terms carefully before using Pocket Reviews. By accessing or using
              our website, you agree to be bound by them.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">Last updated: {updated}</p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-6 py-14 grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                On this page
              </p>
              <nav className="mt-4 space-y-1.5 text-sm">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-muted-foreground hover:text-foreground transition-colors leading-snug"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Body */}
          <article className="prose-style space-y-10 text-[15px] leading-[1.75] text-foreground/90">
            <Section id="acceptance" title="1. Acceptance of Terms">
              <p>
                By accessing, browsing, or otherwise using <strong>Pocket Reviews</strong> (the
                "Site"), you confirm that you have read, understood, and agreed to be bound by
                these Terms &amp; Conditions and our Privacy Policy. If you do not agree, please
                discontinue use of the Site immediately.
              </p>
            </Section>

            <Section id="eligibility" title="2. Eligibility">
              <p>
                You must be at least 18 years old, or accessing the Site under the supervision of a
                parent or legal guardian, to use Pocket Reviews. By using the Site, you represent
                that you meet this requirement.
              </p>
            </Section>

            <Section id="content" title="3. Content & Intellectual Property">
              <p>
                All content on Pocket Reviews — including reviews, articles, images, graphics,
                logos, and design — is the property of Pocket Reviews or its content creators and
                is protected by applicable copyright, trademark, and intellectual property laws.
              </p>
              <p>
                You may share excerpts with proper attribution and a link back to the original
                article, but you may not republish, sell, or commercially exploit our content
                without prior written permission.
              </p>
            </Section>

            <Section id="affiliate" title="4. Affiliate Disclosure">
              <p>
                Pocket Reviews is a participant in the Amazon Services LLC Associates Program and
                its affiliated international programs (including Amazon.in), an affiliate
                advertising program designed to provide a means for sites to earn advertising fees
                by advertising and linking to Amazon.
              </p>
              <p>
                Some links on this Site are affiliate links. If you click on these links and make a
                qualifying purchase, we may receive a small commission{" "}
                <strong>at no additional cost to you</strong>. These commissions help support the
                continued operation of Pocket Reviews and allow us to keep our content free and
                independent.
              </p>
              <p>
                <strong>Our promise:</strong> Affiliate relationships never influence our reviews
                or verdicts. We only recommend products we have personally tested and would suggest
                to a friend.
              </p>
            </Section>

            <Section id="accuracy" title="5. Accuracy of Information">
              <p>
                Product details — including prices, specifications, ratings, and availability —
                may change without notice. While we make every reasonable effort to ensure the
                information on Pocket Reviews is accurate at the time of publishing, we do not
                guarantee its continued accuracy, completeness, or reliability.
              </p>
              <p>
                Always verify the latest price, specifications, and product details on Amazon or
                the merchant's website before making a purchase decision.
              </p>
            </Section>

            <Section id="third-party" title="6. Third-Party Links & Products">
              <p>
                Pocket Reviews contains links to third-party websites, including Amazon and other
                merchants. These links are provided for convenience and informational purposes
                only.
              </p>
              <p>
                We do not control, endorse, or assume responsibility for the content, privacy
                practices, or policies of any third-party websites or services. Your interactions
                with any third-party sites — including purchases, returns, warranties, and
                customer support — are solely between you and that third party.
              </p>
            </Section>

            <Section id="warranties" title="7. No Warranties">
              <p>
                The Site and all content are provided on an "as is" and "as available" basis,
                without warranties of any kind, either express or implied. To the fullest extent
                permitted by law, Pocket Reviews disclaims all warranties, including but not
                limited to merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p>
                Reviews represent the personal opinions of our editors based on hands-on testing.
                Your experience with a product may differ.
              </p>
            </Section>

            <Section id="liability" title="8. Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, Pocket Reviews, its owners,
                editors, and contributors shall not be liable for any direct, indirect, incidental,
                consequential, or punitive damages arising out of or related to your use of the
                Site, your reliance on any content, or any purchase made through an affiliate
                link.
              </p>
              <p>
                You acknowledge that any purchase decision made based on information from Pocket
                Reviews is taken at your own risk and discretion.
              </p>
            </Section>

            <Section id="conduct" title="9. User Conduct">
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-muted-foreground">
                <li>Use the Site for any unlawful or fraudulent purpose;</li>
                <li>
                  Attempt to gain unauthorized access to the Site, its servers, or any related
                  systems;
                </li>
                <li>
                  Scrape, copy, or reproduce content in bulk for commercial use without
                  permission;
                </li>
                <li>
                  Upload or transmit any malicious code, viruses, or harmful material via the
                  Site;
                </li>
                <li>Interfere with or disrupt the Site's normal operation.</li>
              </ul>
            </Section>

            <Section id="privacy" title="10. Privacy">
              <p>
                Your use of the Site is also governed by our Privacy Policy, which explains how we
                collect, use, and protect your information. By using Pocket Reviews, you consent to
                the practices described in the Privacy Policy.
              </p>
            </Section>

            <Section id="law" title="11. Governing Law & Jurisdiction">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of
                India, without regard to its conflict of law principles. Any disputes arising from
                or related to these Terms or your use of the Site shall be subject to the
                exclusive jurisdiction of the competent courts located in India.
              </p>
            </Section>

            <Section id="changes" title="12. Changes to These Terms">
              <p>
                We reserve the right to modify or update these Terms at any time without prior
                notice. Changes become effective immediately upon posting to this page. Your
                continued use of the Site after any changes constitutes acceptance of the updated
                Terms. We encourage you to review this page periodically.
              </p>
            </Section>

            <Section id="contact" title="13. Contact">
              <p>
                For any questions, concerns, or feedback regarding these Terms &amp; Conditions,
                please reach out via our{" "}
                <Link to="/about" className="text-accent hover:underline font-medium">
                  About page
                </Link>
                .
              </p>
            </Section>

            <div className="rounded-2xl border border-border bg-secondary/40 p-6 mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Have questions about how we test or earn? We're happy to explain.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:-translate-y-0.5 transition-transform"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}
