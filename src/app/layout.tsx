import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LenisProvider } from "../components/common/LenisProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dicky Alfian Irvansyah — Industrial Engineering & Systems Optimization",
  description:
    "Portfolio of Dicky Alfian Irvansyah, an Industrial Engineering graduate specializing in systems optimization, operations research, supply chain management, and workflow automation. Featuring GVRP logistics modeling, MRP automation tools, and lab management systems.",
  keywords: [
    "Industrial Engineering",
    "Systems Optimization",
    "Operations Research",
    "Supply Chain Management",
    "GVRP",
    "MRP Automation",
    "Genetic Algorithm",
    "Python",
    "Google Apps Script",
    "Dicky Alfian Irvansyah",
  ],
  authors: [{ name: "Dicky Alfian Irvansyah" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Dicky Alfian Irvansyah — Industrial Engineering & Systems Optimization",
    description:
      "Industrial Engineering graduate building measurable efficiency through mathematical modeling, process automation, and supply chain optimization.",
    url: "https://dickyai.github.io",
    siteName: "Dicky Alfian Irvansyah",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dicky Alfian Irvansyah — Industrial Engineering & Systems Optimization",
    description:
      "Industrial Engineering graduate building measurable efficiency through mathematical modeling, process automation, and supply chain optimization.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F1EA" },
    { media: "(prefers-color-scheme: dark)", color: "#070A12" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
