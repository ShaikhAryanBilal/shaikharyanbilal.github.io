import type { Metadata } from "next";
import { DM_Sans, PT_Sans } from "next/font/google";
import ThemeInit from "@/components/ThemeInit";
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

export const metadata: Metadata = {
  title: "Shaikh Aryan Bilal — Web Software Engineer",
  description:
    "Web Software Engineer with 6+ years of experience designing and developing scalable, secure, and high-performing web applications.",
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
