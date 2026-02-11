"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "@/images/logo.png";
import Image from "next/image";

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
        <div className="flex h-14 items-center justify-between relative">
          <Link href="/" className="flex items-center relative">
            <Image src={logo} alt="Beskydské túry - logo" className="h-auto w-auto" width={125} />
          </Link>
          <div className="flex items-center gap-3 md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-md text-zinc-700 hover:text-zinc-900 font-semibold relative group focus:outline-offset-4 shrink-0"
              >
                {item.label}
                <span aria-hidden="true" className="group-hover:w-full group-focus-visible:w-full transition-all duration-700 ease w-0 h-0.5 bg-zinc-700 group-hover:bg-zinc-900 group-focus-visible:bg-zinc-900 absolute bottom-0 left-0" />
                <span aria-hidden="true" className="group-hover:w-full group-focus-visible:w-full transition-all duration-700 ease w-0 h-0.5 bg-zinc-700 group-hover:bg-zinc-900 group-focus-visible:bg-zinc-900 absolute bottom-0 right-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
