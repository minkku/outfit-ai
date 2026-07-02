export type ClothingCategory = 'top' | 'bottom' | 'outer' | 'shoes' | 'accessory';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface Brand {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
  hexCode: string;
}

export interface StyleTag {
  id: string;
  name: string;
}

export interface ClosetItem {
  id: string;
  userId: string;
  brand: Brand | null;
  imageUrl: string;
  category: ClothingCategory;
  colors: Color[];
  seasons: Season[];
  styleTags: StyleTag[];
  createdAt: string;
}
