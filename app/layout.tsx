import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeInit from "@/components/ThemeInit";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaikh Aryan Bilal — Full-Stack WordPress Developer",
  description:
    "Web Software Engineer with 6+ years of experience designing and developing scalable, secure, and high-performing web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
