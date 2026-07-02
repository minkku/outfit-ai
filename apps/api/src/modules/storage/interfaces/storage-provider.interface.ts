export interface SignedUploadResult {
  signedUrl: string;
  path: string;
  publicUrl: string;
}

export interface IStorageProvider {
  getSignedUploadUrl(path: string): Promise<SignedUploadResult>;
  getPublicUrl(path: string): string;
  delete(paths: string[]): Promise<void>;
}
