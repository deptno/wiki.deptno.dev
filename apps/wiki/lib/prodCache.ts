import { cache } from 'react'
import { IS_PROD } from '../constant'

export const prodCache: typeof cache = IS_PROD ? cache : <T>(t: T) => t
