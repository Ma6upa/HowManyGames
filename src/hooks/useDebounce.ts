import { useMemo } from "react"
import { useLatest } from "./useLatest"

const useDebounce = (cb: () => void, ms: readonly unknown[]) => {
  const latestCb = useLatest(cb)

  return useMemo((...args: any) => {
    latestCb.current(...args)
  }, ms),
  [ms, latestCb]
}