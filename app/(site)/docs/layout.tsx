/**
 * Documentation layout with persistent navigation and readable article width.
 */
import type { ReactNode } from "react";

import { DocsSidebar } from "@/components/site/docs-sidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" min-h-screen w-full">
      <div className="w-64 h-full">
        <DocsSidebar />
      </div>
      <div className="lg:pl-72 ">{children}</div>
    </div>
  );
}
