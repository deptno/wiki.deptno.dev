import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'deptno\'s wiki',
    short_name: 'vimwiki',
    description: 'deptno\'s vimwiki',
    start_url: '/',
    display: 'standalone',
    background_color: '#DDE719',
    theme_color: '#1F2937',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
