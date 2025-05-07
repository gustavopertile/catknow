"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  return (
    <header
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } flex justify-center 
       rounded-b-lg p-8 md:p-10 shadow bg-background`}
    >
      <Link href="/">
        <h1 className="text-4xl md:text-6xl font-bold cursor-pointer">
          🐈 CATKNOW
        </h1>
      </Link>
    </header>
  );
}

// bg-gradient-to-r from-foreground to-70% to-background rounded-b-lg p-6 border border-t-0`}
