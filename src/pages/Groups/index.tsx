import { useEffect, useMemo, useState } from 'react'
import { Heart, Plus, Users, X } from 'lucide-react'
import SelectBox from '../../components/ui/SelectBox'
import { boothMocks } from '../../features/booths/mocks/booths'
import type { BoothCategory } from '../../features/booths/types'

type GroupCard = {
  id: string
  name: string
  boothId: string
  boothTitle: string
  description: string
  category: BoothCategory
  currentMembers: number
  capacity: number
  isPrivate: boolean
}

type GroupFormState = {
  name: string
  boothId: string
  description: string
  capacity: string
  isPrivate: boolean
}

const GROUPS_STORAGE_KEY = 'sweet-tea-groups'

const seededGroups: GroupCard[] = [
  {
    id: 'recording-menstrual-cycles',
    name: 'Recording Menstrual Cycles and Blood Sugar Levels',
    boothId: 'menstruation-blood-sugar-levels',
    boothTitle: 'Menstruation and blood sugar levels',
    description: "Let's record and share changes in your menstrual cycle and blood sugar levels.",
    category: 'Menstruation and Physical Condition',
    currentMembers: 0,
    capacity: 12,
    isPrivate: false,
  },
  {
    id: 'hypoglycemic-prevention-goods',
    name: 'Hypoglycemic Prevention Goods',
    boothId: 'career-desk',
    boothTitle: 'Consultation about meal concerns',
    description: "Let's share recommended hypoglycemic products",
    category: 'Meals',
    currentMembers: 0,
    capacity: 20,
    isPrivate: false,
  },
  {
    id: 'carbo-count-beginners',
    name: 'Carbo Count Beginners Group',
    boothId: 'career-desk',
    boothTitle: 'Consultation about meal concerns',
    description: "If you're just starting Carbo Counting, let's learn together.",
    category: 'Meals',
    currentMembers: 0,
    capacity: 15,
    isPrivate: false,
  },
  {
    id: 'physical-education-class',
    name: 'Tips in Physical Education Class',
    boothId: 'health-corner',
    boothTitle: 'Tips for School Life',
    description: "Let's talk about blood sugar management in physical education classes.",
    category: 'School Life',
    currentMembers: 0,
    capacity: 10,
    isPrivate: false,
  },
  {
    id: 'jk-group',
    name: 'JK',
    boothId: 'health-corner',
    boothTitle: 'Tips for School Life',
    description: 'A small room for casual school-life check-ins.',
    category: 'School Life',
    currentMembers: 1,
    capacity: 10,
    isPrivate: false,
  },
  {
    id: 'basketball-club',
    name: 'Basketball Club Member—!',
    boothId: 'health-corner',
    boothTitle: 'Tips for School Life',
    description: 'Compare routines for practices, tournaments, and after-school snacks.',
    category: 'School Life',
    currentMembers: 1,
    capacity: 10,
    isPrivate: false,
  },
  {
    id: 'sweets-lover',
    name: 'Sweets lover',
    boothId: 'career-desk',
    boothTitle: 'Consultation about meal concerns',
    description: 'Sweets lovers, gather~!!',
    category: 'Meals',
    currentMembers: 3,
    capacity: 100,
    isPrivate: false,
  },
  {
    id: 'housing-concerns',
    name: '20Consultation Room for Concerns About Housing',
    boothId: 'career-desk',
    boothTitle: 'Consultation about meal concerns',
    description:
      'A place where diabetic patients of different generations can easily talk with each other.',
    category: 'Meals',
    currentMembers: 0,
    capacity: 20,
    isPrivate: false,
  },
  {
    id: 'students-gather',
    name: 'Students, gather',
    boothId: 'health-corner',
    boothTitle: 'Tips for School Life',
    description: "Let's share the worries of school life",
    category: 'School Life',
    currentMembers: 0,
    capacity: 8,
    isPrivate: false,
  },
]

const defaultFormState: GroupFormState = {
  name: '',
  boothId: '',
  description: '',
  capacity: '10',
  isPrivate: false,
}

function getAccentClass(category: BoothCategory) {
  if (category === 'School Life') {
    return 'before:bg-[#4b82f5]'
  }

  if (category === 'Meals') {
    return 'before:bg-[#27c96c]'
  }

  return 'before:bg-[#f55aa4]'
}

function GroupsPage() {
  const [groups, setGroups] = useState<GroupCard[]>(seededGroups)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [formState, setFormState] = useState<GroupFormState>(defaultFormState)
  const [formError, setFormError] = useState<string | null>(null)

  const boothOptions = useMemo(
    () =>
      boothMocks.map((booth) => ({
        value: booth.id,
        label: booth.title,
        description: booth.category,
      })),
    []
  )

  useEffect(() => {
    const storedGroups = window.localStorage.getItem(GROUPS_STORAGE_KEY)

    if (!storedGroups) {
      return
    }

    try {
      const parsedGroups = JSON.parse(storedGroups) as GroupCard[]

      if (Array.isArray(parsedGroups) && parsedGroups.length > 0) {
        setGroups(parsedGroups)
      }
    } catch {
      window.localStorage.removeItem(GROUPS_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups))
  }, [groups])

  useEffect(() => {
    if (!isCreateModalOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCreateModalOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isCreateModalOpen])

  const openCreateModal = () => {
    setFormState(defaultFormState)
    setFormError(null)
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
    setFormError(null)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedName = formState.name.trim()
    const trimmedDescription = formState.description.trim()
    const parsedCapacity = Number.parseInt(formState.capacity, 10)
    const selectedBooth = boothMocks.find((booth) => booth.id === formState.boothId)

    if (!trimmedName) {
      setFormError('Group name is required.')
      return
    }

    if (!selectedBooth) {
      setFormError('Please choose a booth before creating a group.')
      return
    }

    if (!Number.isFinite(parsedCapacity) || parsedCapacity < 2) {
      setFormError('Maximum number of people must be at least 2.')
      return
    }

    const nextGroup: GroupCard = {
      id: `group-${Date.now()}`,
      name: trimmedName,
      boothId: selectedBooth.id,
      boothTitle: selectedBooth.title,
      description: trimmedDescription || selectedBooth.description,
      category: selectedBooth.category,
      currentMembers: 1,
      capacity: parsedCapacity,
      isPrivate: formState.isPrivate,
    }

    setGroups((currentGroups) => [nextGroup, ...currentGroups])
    closeCreateModal()
  }

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[44px] font-bold tracking-[-0.04em] text-[#283042]">Group</h1>
            <p className="mt-2 text-[17px] text-[#677083]">
              A safe place to have deep conversations with a small group
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-3 self-start rounded-[10px] bg-gradient-to-r from-[#f255a7] to-[#a857ef] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(200,86,196,0.3)] transition-transform hover:-translate-y-0.5"
          >
            <Plus className="size-4" />
            <span>Create a new group</span>
          </button>
        </section>

        <section>
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em] text-[#283042]">
            Groups you can participate in
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <article
                key={group.id}
                className={`relative overflow-hidden rounded-[16px] border border-[#e7dfea] bg-white p-5 shadow-[0_10px_28px_rgba(75,58,98,0.08)] before:absolute before:inset-x-0 before:top-0 before:h-1 ${getAccentClass(group.category)}`}
              >
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-md bg-[#f3f1f4] px-2.5 py-1 text-[12px] font-semibold text-[#47414e]">
                      Participation Available
                    </span>
                    <span className="rounded-md border border-[#e6e1ea] bg-white px-2.5 py-1 text-[12px] font-semibold text-[#47414e]">
                      {group.boothTitle}
                    </span>
                    {group.isPrivate ? (
                      <span className="rounded-md border border-[#ead7fb] bg-[#f7f0ff] px-2.5 py-1 text-[12px] font-semibold text-[#8e54d6]">
                        Private
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <h3 className="text-[17px] font-extrabold leading-8 text-[#2d3443]">{group.name}</h3>
                    <p className="mt-1 text-[13px] leading-6 text-[#5d6677]">{group.description}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#6f7688]">
                    <Users className="size-3.5" />
                    <span>
                      {group.currentMembers} / {group.capacity}person
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {isCreateModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-[2px]">
          <div className="w-full max-w-[480px] rounded-[18px] bg-white p-6 shadow-[0_26px_60px_rgba(24,20,42,0.28)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[24px] font-extrabold tracking-[-0.03em] text-[#171a23]">
                Create a new group
              </h2>
              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-full p-1 text-[#777d8c] transition-colors hover:bg-[#f4f0f6] hover:text-[#444d5d]"
                aria-label="Close create group dialog"
              >
                <X className="size-5" />
              </button>
            </div>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-[14px] font-bold text-[#262d3a]">Group Name *</span>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((currentState) => ({ ...currentState, name: event.target.value }))
                  }
                  placeholder="Example: Consultation Room for Concerns in Their 20s"
                  className="mt-2 h-11 w-full rounded-[10px] border border-[#d8dce5] px-4 text-[15px] text-[#2b3240] outline-none transition focus:border-[#8f58de] focus:ring-2 focus:ring-[#efe5ff]"
                />
              </label>

              <div className="block">
                <span className="text-[14px] font-bold text-[#262d3a]">Select your booth *</span>
                <SelectBox
                  value={formState.boothId}
                  onChange={(nextBoothId) =>
                    setFormState((currentState) => ({ ...currentState, boothId: nextBoothId }))
                  }
                  options={boothOptions}
                  placeholder="Please choose your booth"
                  className="mt-2"
                />
              </div>

              <label className="block">
                <span className="text-[14px] font-bold text-[#262d3a]">Description</span>
                <textarea
                  value={formState.description}
                  onChange={(event) =>
                    setFormState((currentState) => ({
                      ...currentState,
                      description: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="このグループについて説明してください"
                  className="mt-2 w-full rounded-[10px] border border-[#e4e6ee] px-4 py-3 text-[15px] text-[#2b3240] outline-none transition focus:border-[#8f58de] focus:ring-2 focus:ring-[#efe5ff]"
                />
              </label>

              <label className="block">
                <span className="text-[14px] font-bold text-[#262d3a]">maximum number of people</span>
                <input
                  type="number"
                  min="2"
                  value={formState.capacity}
                  onChange={(event) =>
                    setFormState((currentState) => ({ ...currentState, capacity: event.target.value }))
                  }
                  className="mt-2 h-11 w-full rounded-[10px] border border-[#e4e6ee] px-4 text-[15px] text-[#2b3240] outline-none transition focus:border-[#8f58de] focus:ring-2 focus:ring-[#efe5ff]"
                />
              </label>

              <label className="flex items-center gap-3 text-[14px] font-bold text-[#262d3a]">
                <input
                  type="checkbox"
                  checked={formState.isPrivate}
                  onChange={(event) =>
                    setFormState((currentState) => ({
                      ...currentState,
                      isPrivate: event.target.checked,
                    }))
                  }
                  className="size-4 rounded border-[#ccd2dd] text-[#ae5ae9] focus:ring-[#e8d6ff]"
                />
                <span>Hold a private group (invitation only)</span>
              </label>

              {formError ? (
                <p className="rounded-[10px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-[10px] bg-gradient-to-r from-[#f7a1c4] to-[#c895f4] text-[15px] font-bold text-white shadow-[0_12px_20px_rgba(208,146,220,0.3)] transition hover:brightness-[1.02]"
              >
                <Heart className="size-4" />
                <span>Create a group</span>
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default GroupsPage