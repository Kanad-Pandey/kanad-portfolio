"use client";

import { useCursor, CursorType } from "@/providers/CursorProvider";

export function useCursorState() {
  const { type, setType } = useCursor();

  return {
    cursorType: type,
    setCursorState: (type: CursorType) => setType(type),
  };
}
