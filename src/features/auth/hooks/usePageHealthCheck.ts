import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getHealth } from '../api/authApi'

export function usePageHealthCheck() {
  const { pathname } = useLocation()

  useEffect(() => {
    let isCancelled = false

    async function checkHealth() {
      try {
        await getHealth()
      } catch (error) {
        if (!isCancelled) {
          console.error('Health check failed.', error)
        }
      }
    }

    void checkHealth()

    return () => {
      isCancelled = true
    }
  }, [pathname])
}