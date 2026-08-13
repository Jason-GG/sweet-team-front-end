import { useEffect, useMemo, useState } from 'react'
import { Heart, Plus, X } from 'lucide-react'
import SelectBox from '../../components/ui/SelectBox'
import { boothMocks } from '../../features/booths/mocks/booths'
import GroupListItem from '../../features/groups/components/GroupListItem'
import { useGroups } from '../../features/groups/hooks/useGroups'
import type { GroupCard } from '../../features/groups/types'
import { useI18n } from '../../lib/i18n'

type GroupFormState = {
  name: string
  boothId: string
  description: string
  capacity: string
  isPrivate: boolean
}

const defaultFormState: GroupFormState = {
  name: '',
  boothId: '',
  description: '',
  capacity: '10',
  isPrivate: false,
}

function GroupsPage() {
  const t = useI18n()
  const { groups, addGroup } = useGroups()
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
      setFormError(t.groups.errors.requiredName)
      return
    }

    if (!selectedBooth) {
      setFormError(t.groups.errors.chooseBooth)
      return
    }

    if (!Number.isFinite(parsedCapacity) || parsedCapacity < 2) {
      setFormError(t.groups.errors.minCapacity)
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

    addGroup(nextGroup)
    closeCreateModal()
  }

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[44px] font-bold tracking-[-0.04em] text-[#283042]">{t.groups.title}</h1>
            <p className="mt-2 text-[17px] text-[#677083]">
              {t.groups.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-3 self-start rounded-[10px] bg-gradient-to-r from-[#f255a7] to-[#a857ef] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(200,86,196,0.3)] transition-transform hover:-translate-y-0.5"
          >
            <Plus className="size-4" />
            <span>{t.groups.createButton}</span>
          </button>
        </section>

        <section>
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em] text-[#283042]">
            {t.groups.listTitle}
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <GroupListItem key={group.id} group={group} />
            ))}
          </div>
        </section>
      </div>

      {isCreateModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-[2px]">
          <div className="w-full max-w-[480px] rounded-[18px] bg-white p-6 shadow-[0_26px_60px_rgba(24,20,42,0.28)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[24px] font-extrabold tracking-[-0.03em] text-[#171a23]">
                {t.groups.modalTitle}
              </h2>
              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-full p-1 text-[#777d8c] transition-colors hover:bg-[#f4f0f6] hover:text-[#444d5d]"
                aria-label={t.groups.closeDialog}
              >
                <X className="size-5" />
              </button>
            </div>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-[14px] font-bold text-[#262d3a]">{t.groups.groupNameLabel}</span>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((currentState) => ({ ...currentState, name: event.target.value }))
                  }
                  placeholder={t.groups.groupNamePlaceholder}
                  className="mt-2 h-11 w-full rounded-[10px] border border-[#d8dce5] px-4 text-[15px] text-[#2b3240] outline-none transition focus:border-[#8f58de] focus:ring-2 focus:ring-[#efe5ff]"
                />
              </label>

              <div className="block">
                <span className="text-[14px] font-bold text-[#262d3a]">{t.groups.selectBoothLabel}</span>
                <SelectBox
                  value={formState.boothId}
                  onChange={(nextBoothId) =>
                    setFormState((currentState) => ({ ...currentState, boothId: nextBoothId }))
                  }
                  options={boothOptions}
                  placeholder={t.groups.selectBoothPlaceholder}
                  className="mt-2"
                />
              </div>

              <label className="block">
                <span className="text-[14px] font-bold text-[#262d3a]">{t.groups.descriptionLabel}</span>
                <textarea
                  value={formState.description}
                  onChange={(event) =>
                    setFormState((currentState) => ({
                      ...currentState,
                      description: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder={t.groups.descriptionPlaceholder}
                  className="mt-2 w-full rounded-[10px] border border-[#e4e6ee] px-4 py-3 text-[15px] text-[#2b3240] outline-none transition focus:border-[#8f58de] focus:ring-2 focus:ring-[#efe5ff]"
                />
              </label>

              <label className="block">
                <span className="text-[14px] font-bold text-[#262d3a]">{t.groups.maxPeopleLabel}</span>
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
                <span>{t.groups.privateOnly}</span>
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
                <span>{t.groups.submit}</span>
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default GroupsPage
