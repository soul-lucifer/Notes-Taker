import { X, Sparkles } from 'lucide-react'
import { AIInsights } from '@flownote/shared'
import { useAppStore } from '@/store/useAppStore'

interface AIInsightsPanelProps {
    insights: AIInsights
}

export default function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
    const toggleAIPanel = useAppStore(s => s.toggleAIPanel)

    return (
        <div className="w-[300px] bg-bg-card border-l border-border h-full flex flex-col shrink-0 relative">
            <div className="p-4 flex items-center justify-between border-b border-border/50">
                <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>AI Insights</span>
                </h2>
                <button
                    onClick={toggleAIPanel}
                    className="text-text-muted hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-20 space-y-8">
                <section>
                    <div className="text-[13px] text-text-secondary leading-relaxed">
                        {insights.summary}
                    </div>
                </section>

                <section>
                    <h3 className="text-[13px] font-bold text-white mb-3">Key takeaways</h3>
                    <ul className="space-y-2">
                        {insights.keyTakeaways.map((item, i) => (
                            <li key={i} className="flex relative pl-4">
                                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-accent"></span>
                                <span className="text-[13px] text-text-secondary leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h3 className="text-[13px] font-bold text-white mb-3">Action Items</h3>
                    <ul className="space-y-2">
                        {insights.actionItems.map((item, i) => (
                            <li key={i} className="flex relative pl-4">
                                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-accent"></span>
                                <span className="text-[13px] text-text-secondary leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h3 className="text-[13px] font-bold text-white mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {insights.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 text-[11px] font-medium bg-accent-dim text-accent border border-accent/20 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>
            </div>

            <div className="absolute bottom-4 right-4 text-border-light pointer-events-none opacity-50">
                <Sparkles className="w-24 h-24" />
            </div>
        </div>
    )
}
