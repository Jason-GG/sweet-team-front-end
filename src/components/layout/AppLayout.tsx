import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '../../lib/utils'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <div
        className={cn(
          'fixed inset-0 z-30 bg-slate-950/20 backdrop-blur-sm transition-opacity lg:hidden',
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:pl-[214px]">
        <Topbar onMenuToggle={() => setIsSidebarOpen((open) => !open)} />
        <main className="min-h-[calc(100vh-73px)] bg-[linear-gradient(180deg,#fcf8fd_0%,#f8f4fb_100%)] px-4 pb-12 pt-8 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout