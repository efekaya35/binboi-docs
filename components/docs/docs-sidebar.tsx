"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU } from "@/constants/docs-menu";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 py-2 pr-4 custom-scrollbar">
      {SIDEBAR_MENU.map((section) => (
        <div key={section.group} className="flex flex-col gap-1.5">
          {/* Başlık: Daha küçük, daha şık, daha teknik */}
          <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            {section.group}
          </h4>
          
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-all duration-200",
                    isActive 
                      ? "bg-white/[0.06] text-white font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
                      : "text-white/50 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  {/* Sol tarafta aktifken çıkan çok ince kırmızı bar */}
                  {isActive && (
                    <div className="absolute left-0 h-4 w-[2px] rounded-r-full bg-red-600" />
                  )}

                  {Icon && (
                    <Icon 
                      size={16} 
                      strokeWidth={isActive ? 2.5 : 2}
                      className={cn(
                        "transition-all",
                        isActive ? "text-red-500 scale-110" : "text-white/20 group-hover:text-white/40"
                      )} 
                    />
                  )}
                  <span className="font-sans leading-none">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
};