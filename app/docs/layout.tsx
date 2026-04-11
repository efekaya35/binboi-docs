import { Sidebar } from "../../components/docs/docs-sidebar";
import { TableOfContents } from "../../components/docs/dosc-toc";
import { Navbar } from "../../components/docs/navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#000000]">
      {/* 1. Header (Z-50 ile her şeyin üstünde) */}
      <Navbar />

      <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] gap-6 lg:gap-10 px-4">

        {/* 2. Sol Sidebar (Masaüstünde Sticky, Mobilde Gizli) */}
        {/* h-[calc(100vh-3.5rem)] -> Header boyunu (14/3.5rem) çıkarıyoruz */}
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-white/5 md:sticky md:block">
          <div className="no-scrollbar py-6 lg:py-8">
            <Sidebar />
          </div>
        </aside>

        {/* 3. Ana İçerik ve Sağ Navigasyon */}
        {/* xl:grid ile iç tarafta içeriği ve TOC'u ayırıyoruz */}
        <main className="relative py-6 lg:py-8 xl:grid xl:grid-cols-[1fr_250px] gap-10">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>

          {/* 4. Sağ Navigasyon (Table of Contents) */}
          <aside className="hidden text-sm xl:block">
            <div className="sticky top-20 pt-4">
              <TableOfContents />
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}