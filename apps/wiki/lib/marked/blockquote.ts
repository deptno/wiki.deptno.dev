export function blockquote(str) {
  return `<blockquote class="border-l-8 border-gray-800 pl-8 h-16 py-1 text-gray-800 flex items-center">
<p style="word-break: break-word" class="black">${str.trim()}
</blockquote>`
}
