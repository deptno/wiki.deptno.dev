import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { createRenderer } from './marked/createRenderer'
import Prism from 'prismjs'

export function getMarked(params: Params) {
  if (__cache[params.wiki]) {
    return __cache[params.wiki]
  }

  const m = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        if (lang === 'mermaid') {
          return code
        }
        if (!Prism.languages[lang]) {
          console.debug(`${lang} is not supported`)
        }

        return Prism.highlight(
          code,
          Prism.languages[lang] || Prism.languages.plain,
          lang,
        )
      },
    }),
  )
  m.use({
    mangle: false,
    renderer: createRenderer(params),
  })
  m.use(gfmHeadingId())

  return __cache[params.wiki] = m
}

type Params = {
  wiki: string
}

const __cache = {}
