"use client";

import { PAGES } from "@/config/pages.config";
import { cn } from "@/lib/utils";
import { Server } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="max-w-80 min-w-70 w-full flex flex-col gap-5">
      <nav className="w-full flex flex-col p-3 gap-1 bg-sidebar border-sidebar-border rounded-xl">
        {PAGES.map((page) => {
          const active = pathname === page.href;
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className={cn(
                "flex items-center gap-4 rounded-lg px-3 py-2.5 text-md font-medium transition-colors hover:bg-sidebar-accent",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground",
              )}
            >
              {<Icon />}
              {page.name}
            </Link>
          );
        })}
      </nav>
      <div className="w-full flex flex-col p-5 bg-sidebar border-sidebar-border rounded-xl">
        <h3 className="flex items-center gap-4">
          <Server className="inline" />
          VPS CONNECTION PROFILE
        </h3>
      </div>
    </aside>
  );
}
