import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const dp = createDOMPurify(new JSDOM('').window)

export const sanitize = (html: string) => dp.sanitize(html)
