import { useEffect, useState } from 'react'
import { seededGroups } from '../mocks/groups'
import type { GroupCard } from '../types'

const GROUPS_STORAGE_KEY = 'sweet-tea-groups'

export function useGroups() {
  const [groups, setGroups] = useState<GroupCard[]>(() => {
    if (typeof window === 'undefined') {
      return seededGroups
    }

    const storedGroups = window.localStorage.getItem(GROUPS_STORAGE_KEY)

    if (!storedGroups) {
      return seededGroups
    }

    try {
      const parsedGroups = JSON.parse(storedGroups) as GroupCard[]
      return Array.isArray(parsedGroups) && parsedGroups.length > 0 ? parsedGroups : seededGroups
    } catch {
      window.localStorage.removeItem(GROUPS_STORAGE_KEY)
      return seededGroups
    }
  })

  useEffect(() => {
    window.localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups))
  }, [groups])

  const addGroup = (group: GroupCard) => {
    setGroups((currentGroups) => [group, ...currentGroups])
  }

  return { groups, addGroup }
}
