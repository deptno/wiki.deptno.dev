import { marked as _marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { renderer } from './marked/renderer'

_marked.use({
  mangle: false,
  renderer,
})
_marked.use(gfmHeadingId())
// 렌더러 적용 이 후 적용 필요
_marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'

    return hljs.highlight(code, { language }).value
  },
}))

export const marked = _marked
