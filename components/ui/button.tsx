import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "fill" | "glass" | "text";
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "glass", className, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "btn",
        variant === "fill" && "btn-fill",
        variant === "glass" && "btn-glass",
        variant === "text" && "btn-text",
        className
      )}
    >
      {children}
    </Link>
  );
}
