import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider"
import SiteLayout from "@/components/layout/SiteLayout";
import { AuthProvider } from "@/components/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Henry C. Melo | Senior UX/UI Designer",
    template: "%s | Henry C. Melo"
  },
  description: "Senior UX/UI Designer specializing in user experience design, interface design, and creating delightful digital experiences. View my portfolio and case studies.",
  keywords: ["Senior UX/UI Designer", "UX Designer", "UI Designer", "User Experience", "User Interface", "Portfolio", "Design", "HCI", "Product Design"],
  authors: [{ name: "Henry C. Melo" }],
  creator: "Henry C. Melo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://henrycastillomelo.com",
    title: "Henry C. Melo | Senior UX/UI Designer",
    description: "Senior UX/UI Designer specializing in user experience design, interface design, and creating delightful digital experiences.",
    siteName: "Henry C. Melo Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry C. Melo | Senior UX/UI Designer",
    description: "Senior UX/UI Designer specializing in user experience design, interface design, and creating delightful digital experiences.",
    creator: "@henrycastillomelo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <Provider>
            <SiteLayout>
              {children}
            </SiteLayout>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
