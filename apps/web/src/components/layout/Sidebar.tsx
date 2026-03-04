import { Inbox, Calendar, Folder, Tag, Plus, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Sidebar() {
    const activeNav = "Inbox"

    const navItems = [
        { label: 'Inbox', icon: <Inbox className="w-4 h-4 text-accent" /> },
        { label: "Today's Notes", icon: <Calendar className="w-4 h-4 text-accent" /> },
        { label: 'Projects', icon: <Folder className="w-4 h-4 text-accent" /> },
        { label: 'Tags', icon: <Tag className="w-4 h-4 text-accent" /> },
    ]

    const dataSources = [
        { label: 'Product Sync 11/10', isPlaying: false },
        { label: 'Design Review', isPlaying: false },
    ]

    return (
        <div className="w-[220px] bg-bg-secondary border-r border-border h-full flex flex-col shrink-0">
            <div className="p-4 flex-1 overflow-y-auto">
                <h3 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">Workspace</h3>
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li
                            key={item.label}
                            className={cn(
                                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors",
                                activeNav === item.label
                                    ? "bg-accent-dim border-l-4 border-accent text-white"
                                    : "text-text-secondary hover:bg-bg-hover hover:text-white"
                            )}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex items-center justify-between mb-2">
                    <h3 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Data Sources</h3>
                    <Plus className="w-4 h-4 text-text-muted cursor-pointer hover:text-white" />
                </div>

                <button className="w-full mb-4 flex items-center justify-center space-x-2 py-2 border border-accent rounded-md text-accent text-sm font-medium hover:bg-accent-dim transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Add Source</span>
                </button>

                <ul className="space-y-1">
                    {dataSources.map((ds, i) => (
                        <li key={i} className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-bg-hover cursor-pointer group text-sm text-text-secondary transition-colors">
                            <Play className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="truncate group-hover:text-white">{ds.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
