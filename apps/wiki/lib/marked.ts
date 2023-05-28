import { marked as _marked } from 'marked'
import { renderer } from './marked/renderer'

_marked.use({
  headerIds: false,
  mangle: false,
  renderer,
})

export const marked = _marked
