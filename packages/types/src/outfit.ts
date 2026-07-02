import type { ClosetItem } from './clothing';

export interface Outfit {
  id: string;
  userId: string;
  name: string | null;
  note: string | null;
  items: ClosetItem[];
  createdAt: string;
}

export interface OutfitItem {
  id: string;
  outfitId: string;
  closetItemId: string;
}
