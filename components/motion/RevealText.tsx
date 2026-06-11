"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { easings } from "@/lib/motion";

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function RevealText({
  children,
  delay = 0,
  className,
  as: Tag = "span",
}: RevealTextProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: easings.expoOut,
        }}
        className={className}
      >
        <Tag>{children}</Tag>
      </motion.div>
    </div>
  );
}
