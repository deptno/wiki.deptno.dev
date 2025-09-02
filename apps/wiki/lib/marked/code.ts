import { RE_MARKDOWN_LINK } from 'parser-vimwiki/constant'
import { sanitize } from '../sanitize'

export function code(code: string, infoString: string , escaped: boolean) {
  const lang = (infoString || '').split(/\s+/)[0] || 'bash'
  const sanitized = sanitize(code.replace(RE_MARKDOWN_LINK, '$1'))

  if (infoString === 'mermaid') {
    // mermaid render 에서 로딩을 위해그대로 피스
    return `<pre class="max-h-screen overflow-auto"><code class="language-${lang}">${code}</code></pre>`
  }

  return `<div class="relative pt-2"><span class="absolute bg-gray-900 top-5 right-0 text-xs rounded-md px-4 capitalize chartreuse z-10">${lang}</span><pre class="relative w-full language-${lang} jsx m-0"><code class="language-${lang}">${sanitized}</code></pre></div>`
}
