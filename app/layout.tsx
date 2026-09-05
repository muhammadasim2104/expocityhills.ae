import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterModalProvider from "@/components/RegisterModalProvider";
import FloatingRegisterButton from "@/components/FloatingRegisterButton";
import { viewport } from "@/lib/metadata";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export { viewport };

export const metadata: Metadata = {
  metadataBase: new URL("https://expocityhills.ae"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <RegisterModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingRegisterButton />
        </RegisterModalProvider>
      </body>
    </html>
  );
}
