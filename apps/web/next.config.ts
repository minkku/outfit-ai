import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
  transpilePackages: ['@outfit-ai/ui', '@outfit-ai/types', '@outfit-ai/api-client'],
};

export default nextConfig;
