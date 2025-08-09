declare module 'next-pwa' {
  import { NextConfig } from 'next';
  
  export default function withPWA(config?: {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    scope?: string;
    sw?: string;
    skipWaiting?: boolean;
    runtimeCaching?: any[];
    [key: string]: any;
  }): (nextConfig: NextConfig) => NextConfig;
}
