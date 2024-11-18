import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Host_Grotesk } from "next/font/google";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700", "300", "500", "600", "800"],
});

export const metadata: Metadata = {
  title: "BlooCode Movie App",
  description: "This app is to display movies from the TMDB Api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hostGrotesk.className} antialiased bg-black`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
