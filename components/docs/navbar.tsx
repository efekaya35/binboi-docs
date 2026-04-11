// components/docs/navbar.tsx
import Link from "next/link";


export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-sans text-lg font-bold tracking-tighter text-white">
              binboi <span className="text-white/40 font-medium">docs</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link href="/docs" className="text-sm font-medium text-white hover:text-white/80 transition-colors">Documentation</Link>
            <Link href="/showcase" className="text-sm font-medium text-white/50 hover:text-white transition-colors">Showcase</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="https://github.com/miransas/binboi" 
            target="_blank"
            className="text-white/50 hover:text-white transition-colors"
          >
           
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="text-xs font-mono text-white/30">v1.0.4-beta</span>
        </div>
      </div>
    </header>
  );
};