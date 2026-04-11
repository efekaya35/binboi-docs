// components/docs/toc.tsx
import { cn } from "@/lib/utils";

const headings = [
  { title: "Introduction", id: "introduction", level: 2 },
  { title: "Key Features", id: "key-features", level: 2 },
  { title: "System Requirements", id: "requirements", level: 3 },
  { title: "Installation", id: "installation", level: 2 },
  { title: "Configuration", id: "configuration", level: 2 },
];

export const TableOfContents = () => {
  // Şimdilik ilkini aktif sayalım, ileride Scroll Spy ekleriz
  const activeId = "introduction";

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
        On This Page
      </p>
      
      <nav className="flex flex-col gap-3 border-l border-white/[0.06]">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "pl-4 text-xs transition-all hover:text-white",
              heading.level === 3 && "ml-3", // Alt başlıkları içeri alıyoruz
              activeId === heading.id 
                ? "text-white font-semibold border-l-2 border-red-600 -ml-[1.5px]" 
                : "text-white/40"
            )}
          >
            {heading.title}
          </a>
        ))}
      </nav>

      {/* Ekstra: Yardım Linkleri (Next.js Docs gibi) */}
      <div className="mt-8 pt-8 border-t border-white/[0.06] flex flex-col gap-3">
        <a href="#" className="text-[11px] text-white/20 hover:text-white transition-colors flex items-center gap-2">
          Edit this page on GitHub
        </a>
        <a href="#" className="text-[11px] text-white/20 hover:text-white transition-colors flex items-center gap-2">
          Chat with us on Discord
        </a>
      </div>
    </div>
  );
};