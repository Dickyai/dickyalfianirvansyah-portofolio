import type { Metadata, Viewport } from "next";
import { MotionConfig } from "framer-motion";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "../components/common/LenisProvider";
import { SITE_URL } from "../data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dicky Alfian Irvansyah — Industrial Engineering & Systems Optimization",
    description:
      "Industrial Engineering graduate building measurable efficiency through mathematical modeling, process automation, and supply chain optimization.",
    url: SITE_URL,
    siteName: "Dicky Alfian Irvansyah",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dicky Alfian Irvansyah — Industrial Engineering & Systems Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dicky Alfian Irvansyah — Industrial Engineering & Systems Optimization",
    description:
      "Industrial Engineering graduate building measurable efficiency through mathematical modeling, process automation, and supply chain optimization.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F4F1EA",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dicky Alfian Irvansyah",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "Industrial Engineering graduate",
  knowsAbout: [
    "Industrial Engineering",
    "Systems Optimization",
    "Operations Research",
    "Supply Chain Management",
    "Workflow Automation",
  ],
  sameAs: [
    "https://linkedin.com/in/dickyai",
    "https://github.com/dickyai",
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
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:font-semibold focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <LenisProvider>{children}</LenisProvider>
        </MotionConfig>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
