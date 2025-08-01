/**
 * 한글 - \uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF
 * (\|.*)? 의 경우 `filename|표현 이름` 형태의 링크를 잡기 위해 처리
 */

export const RE_VIMWIKI_LINK = /\[\[\/?([#@'A-z0-9-:_./\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF]+(#{1,6}.+)?(\|.*?)?)]]/g
/**
 * 링크가 허용되지 않는 특정 블락 내에서의 링크는 `[$1]($1)` 형식으로만 존재하게 되는데 이를 다시 `[[$1]]` 형태로 복구하기 위한 정규표현식
 *
 * ```sh
 * [[Link_A]]
 * ```
 * [[Link_B]]
 * ```
 *
 * 위와 같은 구문이 존재하는경우 파서가 필요하며 정규표현식만으로 처리하기 위해 허용되지 않는 블락안에서의 치환 구문은 다시 복구하는 형태로 구현
 */
export const RE_MARKDOWN_LINK = /\[(\S+)]\(\/?\1\)/g
export const RE_NAMED_VIMWIKI = /wn\.\w+:\w+/
export const RE_INDEXED_VIMWIKI = /^wiki[1-9]:/
