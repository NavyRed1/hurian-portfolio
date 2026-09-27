import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Hurian Yahya Tebe",
    template: "%s — Hurian Yahya Tebe",
  },
  description: "Portfolio of Hurian Yahya Tebe — programming, design, language, and leadership.",
  openGraph: {
    type: "website",
    title: "Hurian Yahya Tebe",
    description: "Portfolio of Hurian Yahya Tebe — programming, design, language, and leadership.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Reads the persisted theme before paint to avoid a light/dark flash.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.dataset.theme = stored;
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
