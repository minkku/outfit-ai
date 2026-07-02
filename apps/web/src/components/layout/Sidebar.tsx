'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Shirt, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/closet', label: '옷장', icon: Shirt },
  { href: '/outfits', label: '코디', icon: Layers },
  { href: '/profile', label: '프로필', icon: User },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[220px] shrink-0 h-screen border-r border-sidebar-border bg-sidebar sticky top-0">
      <div className="h-14 flex items-center px-5 border-b border-sidebar-border">
        <span className="text-base font-bold tracking-tight text-sidebar-foreground">Outfit AI</span>
      </div>

      <nav className="flex flex-col gap-1 p-3 flex-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
