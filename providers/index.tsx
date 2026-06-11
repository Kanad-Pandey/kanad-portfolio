"use client";

import { ReactNode } from "react";
import { LenisProvider } from "./LenisProvider";
import { MotionProvider } from "./MotionProvider";
import { CursorProvider } from "./CursorProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <MotionProvider>
        <CursorProvider>
          {children}
        </CursorProvider>
      </MotionProvider>
    </LenisProvider>
  );
}

export * from "./CursorProvider";
