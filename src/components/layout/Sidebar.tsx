import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../../lib/constants'
import { useI18n } from '../../lib/i18n'
import { cn } from '../../lib/utils'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const t = useI18n()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex w-[214px] flex-col px-6 py-6 transition-transform duration-300 lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="lg:hidden flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-[#e3d9ec] bg-white p-2 text-slate-500"
          aria-label={t.topbar.closeSidebar}
        >
          <X className="size-4" />
        </button>
      </div>

      <nav
        className="mt-20 rounded-[18px] border border-[#ebe3f0] bg-white p-2 shadow-[0_18px_30px_rgba(84,63,112,0.1)] lg:mt-[175px]"
        aria-label={t.topbar.primaryNavigation}
      >
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'mb-1 flex items-center gap-3 rounded-[12px] border px-4 py-3 transition-colors last:mb-0',
                  isActive
                    ? 'border-transparent bg-gradient-to-r from-[#a85cf5] to-[#f04fa3] text-white shadow-[0_10px_22px_rgba(206,95,214,0.32)]'
                    : 'border-transparent text-[#5c6474] hover:bg-[#faf7fc] hover:text-[#2b3240]'
                )
              }
            >
              <span className="shrink-0">
                <Icon className="size-4" />
              </span>
              <span className="block text-[15px] font-semibold">{t.nav[item.key]}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar