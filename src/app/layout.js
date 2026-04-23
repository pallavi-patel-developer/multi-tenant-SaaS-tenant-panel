import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/Layout/ClientLayout";
import { TenantAuthProvider } from "../context/TenantAuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tenant Panel",
  description: "Multi-Tenant SaaS Tenant Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TenantAuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </TenantAuthProvider>
      </body>
    </html>
  );
}
