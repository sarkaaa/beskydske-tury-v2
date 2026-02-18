"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "@/images/logo.png";

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
      className="fixed top-0 z-20 w-full bg-[rgb(255,255,255,0.6)] backdrop-blur-xs transition-transform duration-300 ease-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(-100%)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">
          <Link href="/" className="relative flex items-center">
            <Image src={logo} alt="Beskydské túry - logo" className="h-auto w-auto" width={125} />
          </Link>
          <div className="flex shrink-0 items-center gap-1 xs:gap-3 md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative shrink-0 font-semibold text-md text-zinc-700 hover:text-zinc-900 focus:outline-offset-4"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="ease absolute bottom-0 left-0 h-0.5 w-0 bg-zinc-700 transition-all duration-700 group-hover:w-full group-hover:bg-zinc-900 group-focus-visible:w-full group-focus-visible:bg-zinc-900"
                />
                <span
                  aria-hidden="true"
                  className="ease absolute right-0 bottom-0 h-0.5 w-0 bg-zinc-700 transition-all duration-700 group-hover:w-full group-hover:bg-zinc-900 group-focus-visible:w-full group-focus-visible:bg-zinc-900"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
