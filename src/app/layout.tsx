// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fidel Catstro — Chief Cat on Robinhood | $CATSTRO",
  description:
    "Meet Fidel Catstro, Baiju Bhatt's cat and the Chief Cat on Robinhood since 2011. The most based cat in crypto. $CATSTRO",
  openGraph: {
    title: "Fidel Catstro — Chief Cat on Robinhood | $CATSTRO",
    description:
      "Meet Fidel Catstro, Baiju Bhatt's cat. Chief Cat on Robinhood since 2011. $CATSTRO",
    images: [
      {
        url: "https://cdn.dexscreener.com/cms/images/zV0ivl_H5GY7Xgna?width=800&height=800&quality=95&format=auto",
        width: 800,
        height: 800,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fidel Catstro — $CATSTRO",
    description:
      "Chief Cat on Robinhood since 2011. Baiju Bhatt's legendary feline.",
    images: [
      "https://cdn.dexscreener.com/cms/images/zV0ivl_H5GY7Xgna?width=800&height=800&quality=95&format=auto",
    ],
  },
  icons: {
    icon: "https://cdn.dexscreener.com/cms/images/zV0ivl_H5GY7Xgna?width=64&height=64&quality=95&format=auto",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
