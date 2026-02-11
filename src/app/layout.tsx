import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "latin-ext"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Beskydské túry",
  description: "Beskydské túry",
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
