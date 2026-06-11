"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/providers/CursorProvider";
import { cn } from "@/lib/utils";

export function Cursor() {
  const { type } = useCursor();
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile || type === "disabled") return null;

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full mix-blend-difference",
        "bg-white transition-[width,height] duration-300"
      )}
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: type === "default" ? 12 : type === "view" ? 80 : 40,
        height: type === "default" ? 12 : type === "view" ? 80 : 40,
      }}
    >
      {type === "view" && (
        <span className="text-xs font-medium uppercase tracking-widest text-black">
          View
        </span>
      )}
    </motion.div>
  );
}
