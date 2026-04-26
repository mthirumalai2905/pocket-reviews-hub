import { ShoppingCart } from "lucide-react";

export function AmazonCTA({
  href,
  label = "Buy on Amazon",
  className = "",
  variant = "primary",
}: {
  href: string;
  label?: string;
  className?: string;
  variant?: "primary" | "outline";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";
  const styles =
    variant === "primary"
      ? "bg-gradient-amazon text-amazon-foreground shadow-md hover:shadow-glow"
      : "border border-border bg-card text-foreground hover:bg-secondary";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={`${base} ${styles} ${className}`}>
      <ShoppingCart className="h-4 w-4" />
      {label}
    </a>
  );
}
