import type { Metadata } from "next";
import "../globals.css";
import { Locale } from "@/i18n-config";
import { Open_Sans, Poppins } from "next/font/google";
import Header from "../components/header";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Energy and Utility",
  description: "Generated by Energy and Utility",
};

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Header lang={lang} />
        <main
          className={`${poppins.variable} font-sans max-w-screen-2xl m-auto`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
