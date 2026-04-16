import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bimbelceriaanak',
  appName: 'bimbel-ceria-anak',
  webDir: 'dist',
  server: {
    url: 'https://32072887-d9ff-4b6e-8656-fa6d3c09595b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
