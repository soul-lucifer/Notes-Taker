import { cn } from '@/lib/utils'
import { TranscriptBlock } from '@flownote/shared'
import { useAppStore } from '@/store/useAppStore'

interface TranscriptViewProps {
    transcript: TranscriptBlock[]
}

export default function TranscriptView({ transcript }: TranscriptViewProps) {
    const currentTime = useAppStore(s => s.currentTime)

    return (
        <div className="space-y-6 pb-20">
            {transcript.map((block) => {
                const isActive = currentTime >= block.startTime && currentTime <= (block.endTime + 0.5)

                return (
                    <div
                        key={block.id}
                        className="flex flex-col group cursor-pointer transition-colors"
                        onClick={() => {
                            // Usually we'd seek wavesurfer here, simplified for display
                            console.log("Seek to:", block.startTime)
                        }}
                    >
                        <div className="text-accent font-bold text-[13px] mb-1">
                            {block.speakerLabel}
                        </div>
                        <div className={cn(
                            "text-[15px] leading-[1.7] transition-colors duration-200",
                            isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
                        )}>
                            {block.text}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
