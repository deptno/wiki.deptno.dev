import './global.css'
import './sm.css'
import './md.css'
import './lg.css'
import './xl.css'
import './2xl.css'
import './3xl.css'
import React from 'react'
import Script from 'next/script'
import { GOOGLE_ANALYTICS_ID, MS_CLARITY_ID } from '../constant'

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
    <body className="text-xs md:text-lg lg:flex justify-center m-0 md:min-w-lg bg-gray-100">
      <main className="w-full max-w-screen-lg lg:border border-gray-800 min-h-screen">
        {children}
      </main>
      <aside className="main fixed hidden 3xl:block w-96 p-2 break-words">
        sidebar
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dicta, earum excepturi iure maiores quibusdam repellat vitae. Accusamus dolorem earum eos, id minus mollitia nisi omnis repellendus sed vel voluptates?
      </aside>
    </body>
    </html>
  )
}
