import { ReactNode } from "react";
import { Cursor } from "@/components/chrome/Cursor";
import { Nav } from "@/components/chrome/Nav";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      {/* Footer will go here */}
      <Cursor />
    </>
  );
}
