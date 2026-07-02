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

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-background border-t border-border flex items-center">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 h-full transition-colors',
              active ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
