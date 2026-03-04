import { Search, Bell, User } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

export default function Topbar() {
    return (
        <header className="h-14 bg-bg-secondary border-b border-border flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center space-x-2 w-1/3">
                {/* Red flame/wave icon + FlowNote */}
                <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2C12 2 5 8.5 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 8.5 12 2 12 2ZM12 19C10.067 19 8.5 17.433 8.5 15.5C8.5 13.567 10.067 12 12 12C13.933 12 15.5 13.567 15.5 15.5C15.5 17.433 13.933 19 12 19Z" />
                    </svg>
                </div>
                <span className="font-bold text-white tracking-wide">FlowNote</span>
                <button className="p-1 ml-4 text-text-muted hover:text-white transition-colors">«</button>
            </div>

            <div className="flex-1 max-w-md mx-auto relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-bg-card rounded-full pl-9 pr-4 py-1.5 text-sm text-white placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-border focus:bg-bg-hover transition-colors"
                />
            </div>

            <div className="flex items-center justify-end space-x-4 w-1/3">
                <button
                    onClick={() => useAppStore.getState().setIsRecording(true)}
                    className="bg-accent hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                    New Note
                </button>
                <div className="relative cursor-pointer">
                    <Bell className="w-5 h-5 text-text-muted hover:text-white transition-colors" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border border-bg-secondary"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-bg-card flex items-center justify-center cursor-pointer border border-border">
                    <User className="w-4 h-4 text-text-muted" />
                </div>
            </div>
        </header>
    )
}
