import type { Metadata, Viewport } from "next";
import { DM_Sans, PT_Sans } from "next/font/google";
import ThemeInit from "@/components/ThemeInit";
import { siteUrl } from "@/lib/content";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const ptSans = PT_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteName = "Shaikh Aryan Bilal";
const description =
  "Backend-focused Software Engineer with 6+ years of experience in PHP, Laravel, WordPress, and Strapi — building scalable APIs and secure backend systems.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} — Web Software Engineer`,
    template: `%s — ${siteName}`,
  },
  description,
  keywords: [
    "Shaikh Aryan Bilal",
    "Web Software Engineer",
    "Backend Developer",
    "PHP",
    "Laravel",
    "WordPress",
    "Strapi",
    "REST API",
    "Headless CMS",
    "Web Security",
    "Portfolio",
    "Karachi",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} — Web Software Engineer`,
    description,
    images: [
      {
        url: "/images/portrait-2026.jpg",
        width: 1086,
        height: 1448,
        alt: `${siteName}, Web Software Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Web Software Engineer`,
    description,
    images: ["/images/portrait-2026.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${ptSans.variable}`} suppressHydrationWarning>
      <body>
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
