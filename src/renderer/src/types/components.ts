import BScroll from '@better-scroll/core'
import type { InfinityOptions } from '@better-scroll/infinity'

export type ScrollPageProps = {
  wrapperClassName?: string
  infinity?: InfinityOptions
  probeType?: number
  autoPullDownRefresh?: boolean
  disabled?: boolean
  loading?: boolean
  pullUp?: (done: (state: -1 | 0 | 1 | 2) => void) => Promise<void>
  pullDown?: (done: () => void) => Promise<void>
  init?: (bs: BScroll) => void
  mouseWheel?: boolean
}

export type ScrollBoxProps = {
  wrapperClassName?: string
  infinity?: InfinityOptions
  probeType?: number
  loading?: boolean
  direction?: 'auto' | 'x' | 'y'
  init?: (bs: BScroll) => void
  reload?: (more: boolean) => Promise<void>
}
