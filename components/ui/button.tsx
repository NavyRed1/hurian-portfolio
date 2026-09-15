import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "glass";
  className?: string;
  children: React.ReactNode;
};

/** The glass button from the design brief: translucent, soft inner highlight, subtle lift on hover. */
export function Button({ href, variant = "glass", className, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn("glass-btn", variant === "primary" && "glass-btn-primary", className)}
    >
      {children}
    </Link>
  );
}
