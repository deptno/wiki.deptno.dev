import './global.css'
import './sm.css'
import './md.css'
import './lg.css'
import './xl.css'
import './2xl.css'
import './3xl.css'
import React from 'react'
import Script from 'next/script'
import { ENDPOINT, GOOGLE_ANALYTICS_ID, MS_CLARITY_ID } from '../constant'
import 'highlight.js/styles/rainbow.css'

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
    <Script
      async
      src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      crossOrigin="anonymous"
    />
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
      async
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GOOGLE_ANALYTICS_ID}');`,
      }}
    />
    <Script
      id="ms-clarify-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${MS_CLARITY_ID}");
  `,
      }}
    />
    <body className="md:text-lg lg:flex justify-center m-0 md:min-w-lg bg-gray-100">
      <main className="w-full max-w-screen-lg lg:border border-gray-800 min-h-screen">
        {children}
      </main>
    </body>
    </html>
  )
}

export const metadata = {
  metadataBase: new URL(ENDPOINT),
  title: 'deptno vimwiki',
  description: 'dev log',
  referrer: 'origin-when-cross-origin',
  keywords: ['typescript', 'kubernetes', 'react', 'react native', 'terminal', 'neovim', 'vim', 'lua', 'frontend', 'seo', 'k9s'],
  authors: [{ name: 'deptno', url: ENDPOINT }],
  creator: 'deptno@gmail.com',
  publisher: 'deptno@gmail.com',
  openGraph: {
    title: 'deptno vimwiki',
    description: 'dev log',
    locale: 'ko',
    siteName: ENDPOINT,
    url: ENDPOINT,
    images: '/icon.jpg',
    type: 'article',
  },
  icons: {
    icon: '/icon.jpg',
    shortcut: '/icon.jpg',
    apple: '/icon.jpg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon.jpg',
    },
  },
  appleWebApp: {
    title: 'deptno',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/icon.jpg',
    ],
  },
}
