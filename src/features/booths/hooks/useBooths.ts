import { useEffect, useState } from 'react'
import { boothFilters } from '../../../lib/constants'
import { fetchBooths } from '../api/boothsApi'
import type { Booth, BoothFilter } from '../types'

export function useBooths(activeFilter: BoothFilter) {
  const [booths, setBooths] = useState<Booth[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadBooths() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchBooths()

        if (!cancelled) {
          setBooths(data)
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load booths right now.')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadBooths()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredBooths =
    activeFilter === 'All'
      ? booths
      : booths.filter((booth) => booth.category === activeFilter)

  return {
    categories: boothFilters,
    booths: filteredBooths,
    officialBooths: filteredBooths.filter((booth) => booth.isOfficial),
    communityBooths: filteredBooths.filter((booth) => !booth.isOfficial),
    isLoading,
    error,
  }
}