import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { navItems } from '../../lib/constants'

type TopbarProps = {
  onMenuToggle: () => void
}

function Topbar({ onMenuToggle }: TopbarProps) {
  const { pathname } = useLocation()
  const currentItem =
    navItems.find((item) =>
      item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
    ) ?? navItems[0]

  return (
    <header className="sticky top-0 z-20 border-b border-[#ede3f1] bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-full border border-[#e3d9ec] bg-white p-2.5 text-slate-700 shadow-sm lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="size-4" />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#b56df3] to-[#f36ab6] text-lg shadow-[0_8px_18px_rgba(203,111,214,0.32)]">
            <span aria-hidden="true">🍵</span>
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-[#9b4de1]">SweetTea</h2>
            <p className="text-[14px] text-[#71788a]">Connect, learn, and nurture</p>
          </div>
        </div>

        <div className="hidden text-[14px] text-[#71788a] lg:block">
          {currentItem.label}
        </div>
      </div>
    </header>
  )
}

export default Topbar