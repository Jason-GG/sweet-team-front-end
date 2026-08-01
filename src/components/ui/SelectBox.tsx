import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export type SelectOption<T extends string = string> = {
  value: T
  label: string
  description?: string
  disabled?: boolean
}

type SelectBoxProps<T extends string = string> = {
  value: T | ''
  options: Array<SelectOption<T>>
  onChange: (value: T) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  triggerClassName?: string
  dropdownClassName?: string
}

function SelectBox<T extends string = string>({
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className,
  triggerClassName,
  dropdownClassName,
}: SelectBoxProps<T>) {
  const selectId = useId()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value]
  )

  const enabledOptions = useMemo(
    () => options.filter((option) => !option.disabled),
    [options]
  )

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsOpen(false)
        return
      }

      if (enabledOptions.length === 0) {
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((currentIndex) => (currentIndex + 1) % enabledOptions.length)
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((currentIndex) =>
          currentIndex <= 0 ? enabledOptions.length - 1 : currentIndex - 1
        )
      }

      if (event.key === 'Home') {
        event.preventDefault()
        setActiveIndex(0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        setActiveIndex(enabledOptions.length - 1)
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        const activeOption = enabledOptions[activeIndex]

        if (activeOption) {
          onChange(activeOption.value)
          setIsOpen(false)
        }
      }
    }

    window.addEventListener('mousedown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, enabledOptions, isOpen, onChange])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const selectedIndex = enabledOptions.findIndex((option) => option.value === value)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }, [enabledOptions, isOpen, value])

  useEffect(() => {
    if (!isOpen || activeIndex < 0) {
      return
    }

    optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, isOpen])

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(true)
    }
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${selectId}-listbox`}
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          'flex h-11 w-full items-center justify-between gap-3 rounded-[10px] border border-[#e4e6ee] bg-white px-4 text-left text-[15px] text-[#2b3240] outline-none transition focus-visible:border-[#8f58de] focus-visible:ring-2 focus-visible:ring-[#efe5ff] disabled:cursor-not-allowed disabled:bg-[#f6f3f8] disabled:text-[#99a1b3]',
          triggerClassName
        )}
      >
        <span className={cn('truncate', !selectedOption && 'text-[#8b93a3]')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn('size-4 shrink-0 text-[#71788a] transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen ? (
        <div
          id={`${selectId}-listbox`}
          role="listbox"
          aria-activedescendant={activeIndex >= 0 ? `${selectId}-option-${activeIndex}` : undefined}
          className={cn(
            'absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-[16px] border border-[#e3dbeb] bg-white p-2 shadow-[0_22px_50px_rgba(56,39,88,0.18)]',
            dropdownClassName
          )}
        >
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => {
              const enabledIndex = enabledOptions.findIndex((item) => item.value === option.value)
              const isSelected = option.value === value
              const isActive = enabledIndex >= 0 && enabledIndex === activeIndex

              return (
                <button
                  key={option.value}
                  id={`${selectId}-option-${enabledIndex}`}
                  ref={(node) => {
                    if (enabledIndex >= 0) {
                      optionRefs.current[enabledIndex] = node
                    }
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onMouseEnter={() => {
                    if (enabledIndex >= 0) {
                      setActiveIndex(enabledIndex)
                    }
                  }}
                  onClick={() => {
                    if (option.disabled) {
                      return
                    }

                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-start justify-between gap-3 rounded-[12px] px-3 py-3 text-left transition',
                    option.disabled
                      ? 'cursor-not-allowed text-[#acb2bf]'
                      : isActive
                        ? 'bg-[#f7efff] text-[#7f44d7]'
                        : 'text-[#2b3240] hover:bg-[#faf6fd]',
                    isSelected && !option.disabled && 'bg-[#f6efff] text-[#7f44d7]'
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-semibold">{option.label}</span>
                    {option.description ? (
                      <span className="mt-0.5 block truncate text-[12px] font-medium text-[#7e8696]">
                        {option.description}
                      </span>
                    ) : null}
                  </span>

                  {isSelected ? <Check className="mt-0.5 size-4 shrink-0" /> : null}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SelectBox