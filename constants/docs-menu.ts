// constants/docs-menu.ts
import { 
  Monitor, Apple, Terminal, Box, Shield, 
  Cpu, Code2, Globe, Bug, Settings 
} from "lucide-react";

export const SIDEBAR_MENU = [
  {
    group: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs/introduction", icon: Globe },
      { name: "Quick Start", href: "/docs/quick_start", icon: Terminal },
      { name: "Installation", href: "/docs/installation", icon: Box },
    ],
  },
  {
    group: "Platform Guides",
    items: [
      { name: "Windows", href: "/docs/windows", icon: Monitor },
      { name: "macOS", href: "/docs/mac", icon: Apple },
      { name: "Linux", href: "/docs/linux", icon: Terminal },
    ],
  },
  {
    group: "SDKs & Languages",
    items: [
      { name: "JavaScript", href: "/docs/js", icon: Code2 },
      { name: "Python", href: "/docs/python", icon: Code2 },
      { name: "Rust", href: "/docs/rust", icon: Cpu },
    ],
  },
  {
    group: "Core Features",
    items: [
      { name: "CLI Reference", href: "/docs/cli" },
      { name: "Authentication", href: "/docs/authentication", icon: Shield },
      { name: "HTTP Tunnels", href: "/docs/http_tunnels" },
      { name: "Webhooks", href: "/docs/webhooks" },
    ],
  },
  {
    group: "Troubleshooting",
    items: [
      { name: "Logs", href: "/docs/logs" },
      { name: "Bugs", href: "/docs/bugs", icon: Bug },
      { name: "Debugging", href: "/docs/debugging", icon: Settings },
    ],
  },
];