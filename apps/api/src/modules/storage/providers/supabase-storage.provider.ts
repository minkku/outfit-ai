import { Injectable, InternalServerErrorException } from '@nestjs/common';
import type { IStorageProvider, SignedUploadResult } from '../interfaces/storage-provider.interface';

@Injectable()
export class SupabaseStorageProvider implements IStorageProvider {
  private readonly url = process.env.SUPABASE_URL!;
  private readonly key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  private readonly bucket = process.env.SUPABASE_STORAGE_BUCKET!;

  private get headers() {
    return {
      Authorization: `Bearer ${this.key}`,
      apikey: this.key,
    };
  }

  async getSignedUploadUrl(path: string): Promise<SignedUploadResult> {
    const res = await fetch(
      `${this.url}/storage/v1/object/upload/sign/${this.bucket}/${path}`,
      { method: 'POST', headers: this.headers },
    );

    if (!res.ok) throw new InternalServerErrorException('Failed to generate upload URL');

    const data = (await res.json()) as { url: string; path: string };

    return {
      signedUrl: `${this.url}${data.url}`,
      path: data.path,
      publicUrl: this.getPublicUrl(data.path),
    };
  }

  getPublicUrl(path: string): string {
    return `${this.url}/storage/v1/object/public/${this.bucket}/${path}`;
  }

  async delete(paths: string[]): Promise<void> {
    const res = await fetch(`${this.url}/storage/v1/object/${this.bucket}`, {
      method: 'DELETE',
      headers: { ...this.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefixes: paths }),
    });

    if (!res.ok) throw new InternalServerErrorException('Failed to delete file');
  }
}
