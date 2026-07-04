import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HeliCorp — Tai nghe chống ồn ANC thế hệ mới",
  description:
    "Công nghệ chống ồn chủ động ANC thế hệ mới. Loại bỏ 98% tiếng ồn, pin 40 giờ, âm thanh chuẩn Studio. Trải nghiệm ngay.",
  openGraph: {
    title: "HeliCorp — Tai nghe chống ồn ANC thế hệ mới",
    description:
      "Công nghệ chống ồn chủ động ANC thế hệ mới. Loại bỏ 98% tiếng ồn, pin 40 giờ, âm thanh chuẩn Studio.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${plusJakarta.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg-primary text-text-primary">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
