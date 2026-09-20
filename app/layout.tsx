import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"] });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Pradeep / Full-Stack Developer",
  description: "A portfolio and personal knowledge system for a full-stack developer moving into AI engineering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={display.variable}><body className={mono.className}>{children}</body></html>;
}
