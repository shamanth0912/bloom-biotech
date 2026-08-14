import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { site } from "@/lib/site";

const news = Newsreader({
  variable: "--font-news",
  subsets: ["latin"],
  styles: ["normal", "italic"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/brand/mark.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/brand/logo.png", width: 907, height: 415 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${news.variable} ${plex.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
