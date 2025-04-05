import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "PromptGalaxy - Discover AI Tools",
  description: "Explore top AI tools for writing, design, productivity, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3309739623901627"
          crossOrigin="anonymous"
        ></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={(metadata.title ?? "Default Title") as string} />
        <meta
          property="og:description"
          content={(metadata.description ?? "Default Description") as string}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Uncomment to use the Navbar */}
        {/* <Navbar /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}
