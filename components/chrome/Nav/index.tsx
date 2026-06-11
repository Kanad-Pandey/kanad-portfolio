"use client";

import { useCursor } from "@/providers/CursorProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/#contact" },
];

export function Nav() {
  const { setType } = useCursor();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
      className="fixed left-0 top-0 z-[100] flex w-full justify-center p-6 md:p-10"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-base/40 p-1.5 backdrop-blur-xl">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onMouseEnter={() => setType("link")}
            onMouseLeave={() => setType("default")}
            className="group relative px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-text-2 transition-colors hover:text-white"
          >
            <span className="relative z-10">{link.name}</span>
            <motion.div
              className="absolute inset-0 -z-10 rounded-full bg-white/5 opacity-0 transition-opacity group-hover:opacity-100"
              layoutId="nav-hover"
            />
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
