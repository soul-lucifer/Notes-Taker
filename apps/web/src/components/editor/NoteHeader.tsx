import { Edit2, MoreHorizontal } from 'lucide-react'

interface NoteHeaderProps {
    title: string
}

export default function NoteHeader({ title }: NoteHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-2">
            <div>
                <div className="text-[11px] text-text-muted uppercase tracking-wider font-semibold mb-1">
                    Audio Transcript
                </div>
                <h1 className="text-[28px] font-bold text-white tracking-tight flex items-center space-x-2">
                    <span>{title}</span>
                    <button className="text-text-muted hover:text-white transition-colors p-1">
                        <Edit2 className="w-4 h-4" />
                    </button>
                </h1>
            </div>
            <button className="text-text-muted hover:text-white transition-colors p-2 rounded-md hover:bg-bg-hover">
                <MoreHorizontal className="w-5 h-5" />
            </button>
        </div>
    )
}
