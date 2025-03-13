import type { Metadata } from "next";
import { NextAuthProvider } from "../providers";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Nya Store :3",
  description: "E-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <NavBar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
