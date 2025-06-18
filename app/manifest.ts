import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fahmi Ramadhan - Full Stack Developer',
    short_name: 'Fahmi Ramadhan',
    description: 'Portfolio of a passionate software engineer specializing in web development',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1b26',
    theme_color: '#bb9af7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icons/icon1.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/icons/icon2.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icons/icon3.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon4.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
  }
}
