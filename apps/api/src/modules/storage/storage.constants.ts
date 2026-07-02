export const STORAGE_PROVIDER = Symbol('STORAGE_PROVIDER');

export const STORAGE_FOLDERS = ['closet'] as const;
export type StorageFolder = typeof STORAGE_FOLDERS[number];
