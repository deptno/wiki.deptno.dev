import { JSDOM } from 'jsdom'
import { Slugger } from 'marked'

import React, { FC } from 'react'

export const TOC: FC<Props> = (props) => {
  const { html } = props
  const toc = new JSDOM(html).window.document.querySelectorAll('h1,h2,h3,h4,h5,h6')
  const headers = Array.from(toc.values())
  const slugger = new Slugger()
  return (
    <div>
      {
        headers.map((h) => {
          const n = +h.tagName.slice(1) * 2
          const anchor = slugger.slug(h.textContent)

          return (
            <div className={`pl-${n} underline`} key={anchor}>
              <a className={`pl-${n} underline`} href={`#${anchor}`}>
                {h.textContent}
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

type Props = {
  html: string
}
