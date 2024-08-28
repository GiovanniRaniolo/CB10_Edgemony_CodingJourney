import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "../context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FakeStore",
  description: "An e-commerce platform built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <header className="bg-blue-600 p-4 text-white flex items-center justify-between">
            <a href="/" className="text-2xl font-bold">
              FakeStore
            </a>
            <a href="/cart" className="text-2xl bg-slate-200 rounded-full p-1">
              🛒
            </a>
          </header>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
