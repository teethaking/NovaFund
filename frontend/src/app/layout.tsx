import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { NotificationProvider } from "../contexts/NotificationContext";
import { SocialProvider } from "../contexts/SocialContext";
import { LiveNotificationToast } from "../components/notifications/LiveNotificationToast";
import { PageTransition } from "../components/layout/PageTransition";
import { I18nProvider } from "../components/providers/I18nProvider";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NovaFund | Decentralized Micro-Investment",
  description: "The decentralized micro-investment platform on Stellar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <I18nProvider>
          <NotificationProvider>
            <SocialProvider>
              <Header />
              <LiveNotificationToast />
              <PageTransition className="flex-1 max-w-7xl mx-auto px-4 py-6 pt-16">
                {children}
              </PageTransition>
              <Footer />
            </SocialProvider>
          </NotificationProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
