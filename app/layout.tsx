import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Convenience Store ERP",
  description: "Inventory and Supply Chain Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
