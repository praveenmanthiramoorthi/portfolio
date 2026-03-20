import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Praveen Manthiramoorthi — Poster Designer, Reel Editor & Web Designer",
  description: "I craft visuals that stop the scroll — posters, reels, and websites for events and brands. Freelance designer available for hire.",
  keywords: ["poster designer", "reel editor", "web designer", "freelance", "Praveen Manthiramoorthi"],
  openGraph: {
    title: "Praveen Manthiramoorthi — Creative Designer",
    description: "I craft visuals that stop the scroll — posters, reels, and websites for events and brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
