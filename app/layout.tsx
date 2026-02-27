import type { Metadata } from "next";
import { Sora, Outfit } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CJ Technology | IT Solutions & Consulting in New Jersey",
  description:
    "CJ Technology is an IT consulting and solutions provider serving mid-size and enterprise businesses since 2005. Network management, cloud services, Microsoft 365, and more.",
  openGraph: {
    title: "CJ Technology | IT Solutions & Consulting in New Jersey",
    description:
      "IT consulting and solutions provider serving mid-size and enterprise businesses since 2005.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
