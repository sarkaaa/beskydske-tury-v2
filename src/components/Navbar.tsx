"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Hlavní stránka" },
  { href: "/trasy", label: "Trasy" },
  { href: "/o-webu", label: "O webu" },
];

const SCROLL_THRESHOLD = 80;

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y <= SCROLL_THRESHOLD) {
        setVisible(true);
      } else if (y > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="bg-[rgb(255,255,255,0.6)] backdrop-blur-xs fixed top-0 z-20 w-full transition-transform duration-300 ease-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(-100%)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Logo">
            <div className="h-8 w-8 rounded bg-green-600" title="Logo" />
          </Link>
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-green-800 hover:text-green-600"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
