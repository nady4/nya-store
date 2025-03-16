import type { Metadata } from "next";
import { NextAuthProvider } from "../providers/NextAuthProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";

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
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
