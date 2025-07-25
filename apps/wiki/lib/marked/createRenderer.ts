import { link } from './link'
import { list } from './list'
import { listitem } from './listitem'
import { heading } from './heading'
import { code } from './code'
import { blockquote } from './blockquote'
import { codespan } from './codespan'
import { createLink } from './createLink'

export function createRenderer(params: Params) {
  return {
    blockquote,
    code,
    codespan,
    // heading,
    link: createLink(params),
    // list,
    // listitem
  }
}

type Params = {
  wiki: string
}
