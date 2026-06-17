import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // ✅ শুধু এখানে globals.css ইমপোর্ট করুন
import ClientThemeProvider from "./components/ClientThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Rediam",
    template: "%s | Rediam"
  },
  description: "Your AI-Powered Financial Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/rediam1.png" />
        <link rel="shortcut icon" href="/rediam1.png" />
      </head>
      <body className={inter.className}>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}