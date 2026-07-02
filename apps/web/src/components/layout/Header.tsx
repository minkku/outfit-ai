'use client';

import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/closet': '옷장',
  '/outfits': '코디',
  '/profile': '프로필',
};

export function Header() {
  const pathname = usePathname();
  const title = Object.entries(PAGE_TITLES).find(([p]) => pathname.startsWith(p))?.[1] ?? 'Outfit AI';

  return (
    <header className="lg:hidden sticky top-0 z-10 h-14 flex items-center px-4 bg-background border-b border-border">
      <span className="text-base font-semibold text-foreground">{title}</span>
    </header>
  );
}
