"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CursorType = "default" | "link" | "view" | "drag" | "disabled";

interface CursorContextType {
  type: CursorType;
  setType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<CursorType>("default");

  return (
    <CursorContext.Provider value={{ type, setType }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
