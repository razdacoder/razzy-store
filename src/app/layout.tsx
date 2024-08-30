import Header from "@/components/header";
import ReactQueryProvider from "@/components/query-provider";
import SheetProvider from "@/components/sheet-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import {
  Open_Sans as FontSans,
  DM_Serif_Display as FontSerif,
} from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Razzy Store",
    default: "Razzy Store",
  },
  description:
    "Explore vibrant African fashion with our unique collection of traditional and modern designs. Shop authentic Ankara, Kaftans, and more, celebrating culture with quality craftsmanship.",
  keywords: [
    "African fashion",
    "Agbada clothing",
    "Suits",
    "Kaftans",
    "Traditional African wear",
    "Modern African designs",
    "Authentic African clothing",
    "Cultural fashion",
    "African prints",
    "African style",
    "Quality craftsmanship",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <ReactQueryProvider>
          <Header />
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
          <Toaster richColors />
          <SheetProvider />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
