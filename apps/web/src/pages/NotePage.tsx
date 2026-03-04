import NoteHeader from '@/components/editor/NoteHeader'
import WaveformPlayer from '@/components/editor/WaveformPlayer'
import TranscriptView from '@/components/editor/TranscriptView'
import AIInsightsPanel from '@/components/ai-panel/AIInsightsPanel'
import { useParams } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

export default function NotePage() {
    const { id } = useParams()
    const aiPanelOpen = useAppStore(s => s.aiPanelOpen)

    // Dummy data for visual development
    const title = "Product Review Meeting"
    const audioUrl = "" // leave empty for now, handle in player

    const dummyTranscript = [
        { id: '1', noteId: 'test', speakerLabel: 'Speaker 1', text: "Alright, let's get started. We need to go over the new features for Q3.", startTime: 2.5, endTime: 7.0, index: 0 },
        { id: '2', noteId: 'test', speakerLabel: 'Speaker 2', text: "I've reviewed the specs. The AI insights panel looks solid but I'm worried about the latency on the transcription side.", startTime: 8.0, endTime: 14.2, index: 1 },
        { id: '3', noteId: 'test', speakerLabel: 'Speaker 1', text: "Latency shouldn't be too bad if we use the smaller model for the first pass and upgrade it later.", startTime: 15.0, endTime: 22.0, index: 2 }
    ]

    const dummyInsights = {
        summary: "The team discussed the upcoming Q3 features, specifically focusing on the new AI insights panel and the potential latency issues during the transcription process.",
        keyTakeaways: [
            "AI insights panel design is approved.",
            "Transcription latency is a major concern for Speaker 2.",
            "A smaller AI model will be used initially to combat latency."
        ],
        actionItems: [
            "Test small vs large model performance.",
            "Finalise the backend API for transcriptions."
        ],
        tags: ["Meeting", "Product Review", "Q3", "AI"]
    }

    return (
        <div className="flex h-full w-full">
            <div className="flex-1 flex flex-col p-8 overflow-y-auto">
                <NoteHeader title={title} />
                <div className="mt-6 mb-8">
                    <WaveformPlayer audioUrl={audioUrl} />
                </div>
                <div className="flex-1">
                    <TranscriptView transcript={dummyTranscript} />
                </div>
            </div>

            {aiPanelOpen && (
                <AIInsightsPanel insights={dummyInsights} />
            )}
        </div>
    )
}
