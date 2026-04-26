export function AmazonCTA({
  href,
  label = "Buy on Amazon",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-amazon px-6 py-3 font-semibold text-amazon-foreground shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0 ${className}`}
    >
      {label}
      <span aria-hidden>↗</span>
    </a>
  );
}
