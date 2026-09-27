import type { Metadata } from "next";
import { Poppins, Montserrat, Fira_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const body = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Your Name — Data Science & Machine Learning",
    template: "%s — Your Name",
  },
  description: "Portfolio of data science, machine learning, and software engineering work.",
  openGraph: {
    type: "website",
    title: "Your Name — Data Science & Machine Learning",
    description: "Portfolio of data science, machine learning, and software engineering work.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
