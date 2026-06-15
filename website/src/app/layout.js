import { Quicksand, Nunito, Cairo } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-arabic",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic"],
});

export const metadata = {
  title: "Cabinet Dentaire Dr. Benjebara Ghali · Tanger",
  description: "Cabinet Dentaire Multidisciplinaire à Tanger. Le Dr. Benjebara Ghali vous accompagne pour des soins d'exception alliant technologie et confort.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${quicksand.variable} ${nunito.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
