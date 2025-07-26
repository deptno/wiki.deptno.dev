import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { createRenderer } from './marked/createRenderer'

export function getMarked(params: Params) {
  if (__cache[params.wiki]) {
    return __cache[params.wiki]
  }

  const m = new Marked()
  m.use({
    mangle: false,
    renderer: createRenderer(params),
  })
  m.use(gfmHeadingId())
// 렌더러 적용 이 후 적용 필요
  m.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'

      return hljs.highlight(code, { language }).value
    },
  }))

  return __cache[params.wiki] = m
}

type Params = {
  wiki: string
}

const __cache = {}
