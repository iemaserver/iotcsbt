import type { Metadata } from "next";
import { Merriweather, Manrope, Source_Code_Pro } from "next/font/google";
import AssetReadyGate from "@/components/site/AssetReadyGate";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  weight: ["400", "700", "900"],
});
const sansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const monoFont = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title:
    "CSE (IoT, Cyber Security & Blockchain) | UEM Kolkata & IEM Kolkata",
  description:
    "The Department of Computer Science and Engineering (IoT, Cyber Security, and Blockchain Technology) at UEM Kolkata and IEM Kolkata focuses on innovation-driven, industry-oriented education. We prepare students in IoT systems, cybersecurity, cryptography, ethical hacking, blockchain architecture, and smart infrastructure development.",
  keywords: [
    "CSE UEM Kolkata",
    "IEM Kolkata CSE",
    "IoT specialization",
    "Cyber Security course Kolkata",
    "Blockchain Technology BCT",
    "Computer Science Engineering Kolkata",
    "Smart city IoT systems",
    "Ethical hacking India",
    "Cryptography course",
    "Blockchain development India",
    "AI and IoT research lab Kolkata",
    "UEM IEM department CSE",
    "CSE(IoT, CS, BT)",
    "iotcsbt"
  ],
  authors: [
    { name: "Department of CSE (IoT, CS & BCT)" },
    { name: "UEM Kolkata" },
    { name: "IEM Kolkata" },
  ],
  creator: "Department of CSE(IoT, CS,BT), UEM & IEM Kolkata",
  publisher: "University of Engineering & Management Kolkata",
  metadataBase: new URL("https://iotcsbt.iem.edu.in"),

  openGraph: {
    title:
      "CSE (IoT, Cyber Security & Blockchain) | UEM & IEM Kolkata",
    description:
      "Explore cutting-edge education in IoT, Cyber Security, and Blockchain Technology at UEM & IEM Kolkata. Industry-focused curriculum, innovation labs, and research-driven learning.",
    url: "https://iotcsbt.iem.edu.in",
    siteName: "CSE(IoT, CS, BT) Department UEM & IEM Kolkata",
    
    locale: "en_IN",
    type: "website",
  },

 

  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${merriweather.variable} ${sansFont.variable} ${monoFont.variable} ${merriweather.className}  antialiased`}>
        <AssetReadyGate>{children}</AssetReadyGate>
      </body>
    </html>
  );
}
