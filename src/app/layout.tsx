import type { Metadata } from "next";
import { Geist, Geist_Mono , Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
})
const omegleFont = localFont({
  src: [
    {
      path: '../../public/fonts/OMEGLE-Regular.woff',
      weight: '400',
      style: 'normal',
    }
    // Añade más variantes si las tienes
  ],
  variable: '--font-omegle',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Proyecto PLANTAS",
  description: "Palanca para la Transición Agrosostenible",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${omegleFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}