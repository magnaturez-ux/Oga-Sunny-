import type { Metadata, Viewport } from "next";
import { Inter, Permanent_Marker } from "next/font/google";
import { PlayerProvider } from "@/context/PlayerContext";
import MiniPlayer from "@/components/MiniPlayer";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oga Sunny Africa - Find House Nearest To You",
  description:
    "Find houses, trenches chop and Oga Sunny Radio around Mararaba, Masaka, One Man, Ado and New Nyanya. OORGANIC NO BE MECHANIC - PK.",
  applicationName: "Oga Sunny Africa",
  manifest: "/manifest.json",
  icons: { icon: "/icon.png", apple: "/icon.png" },
  appleWebApp: { capable: true, title: "Oga Sunny", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${marker.variable}`}>
      <body className="min-h-screen bg-black font-sans text-white antialiased">
        <PlayerProvider>
          <main className="mx-auto max-w-5xl px-4 pb-44 pt-6 sm:px-6">{children}</main>
          <MiniPlayer />
          <BottomNav />
        </PlayerProvider>
      </body>
    </html>
  );
}
