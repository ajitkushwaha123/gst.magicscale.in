"use client";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";

export default function AppShell({ children }) {

  return (
    <>
      <Header />
      <main className="pt-12 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
