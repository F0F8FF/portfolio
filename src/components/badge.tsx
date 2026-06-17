import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        variant === "default" && "border-border bg-surface-2 text-muted",
        variant === "primary" && "border-primary/30 bg-primary/10 text-primary",
        variant === "accent" && "border-accent/30 bg-accent/10 text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
