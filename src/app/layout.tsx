import Header from "@/components/header";
import SheetProvider from "@/components/sheet-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  Open_Sans as FontSans,
  DM_Serif_Display as FontSerif,
} from "next/font/google";
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
  description: "The social media app for devs to connect.",
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
        <Header />
        {children}
        <SheetProvider />
      </body>
    </html>
  );
}
