import type { Metadata } from "next";
import { Geist, Michroma } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Display face. Michroma ships a single weight by design — never synthesise a
   bold from it. */
const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yukti | Wayam AI",
  description: "Warranty & Service Intelligence for rail component fleets",
};

/* Runs before first paint, so the correct theme is on <html> from the very
   first frame and the page never flashes the wrong one. An explicit choice in
   localStorage wins; otherwise we follow the operating system. */
const themeScript = `(function(){try{var t=localStorage.getItem("yukti-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${michroma.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
