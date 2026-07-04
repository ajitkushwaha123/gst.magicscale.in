"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/general/logo";
import { navLinks, navMobileLinks } from "./helper/constants";
import PayButton from "../Payment/PayButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => isOpen && setIsOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-3 rounded-xl backdrop-blur-md bg-white/70 dark:bg-darkBackground/40 border border-gray-200 dark:border-gray-500 shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between py-3">
        <Link href="/" className="group flex items-center gap-2.5">
          <Logo />

          <div
            className="text-2xl cursor-pointer font-extrabold tracking-tighter flex items-center animate-in fade-in slide-in-from-left-2 duration-500 delay-100 fill-mode-both"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 transition-all duration-300">
              Magicscale
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks?.map((link, i) => (
              <div
                key={i}
                className="animate-in fade-in slide-in-from-top-2 duration-500 fill-mode-both"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors group"
                >
                  {link.title}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </nav>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:block">
            <PayButton />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 dark:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-1 space-y-2 border-t border-gray-200 dark:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          {navMobileLinks?.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="block text-gray-800 dark:text-gray-100 py-2 border-b border-gray-100 dark:border-gray-700 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <PayButton />
        </div>
      )}
    </header>
  );
}
