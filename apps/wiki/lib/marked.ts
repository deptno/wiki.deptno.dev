import { marked as _marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import { renderer } from './marked/renderer'

_marked.use({
  headerIds: false,
  mangle: false,
  renderer,
})
_marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'

    return hljs.highlight(code, { language }).value
  },
}))

export const marked = _marked
