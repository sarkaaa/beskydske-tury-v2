import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import thumbnail from "@/images/thumbnail.png";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "latin-ext"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://beskydske-tury.cz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Beskydské túry",
    template: "%s | Beskydské túry",
  },
  description:
    "Tipy na pěší túry v Moravskoslezských Beskydech. Přehled tras s délkou, převýšením a dostupností dopravou.",
  authors: [{ name: "Šárka Chwastková", url: "https://pandacode.cz/" }],
  creator: "Beskydské túry",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Beskydské túry",
    images: [
      {
        url: thumbnail.src,
        width: thumbnail.width,
        height: thumbnail.height,
        alt: "Beskydské túry – pěší trasy v Beskydech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beskydské túry",
    description: "Tipy na pěší túry v Moravskoslezských Beskydech.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${openSans.variable} ${nunito.variable} font-sans flex min-h-screen flex-col antialiased`}
      >
        <Navbar />
        <main className="flex-1 mt-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
