import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useRecorder } from '@/hooks/useRecorder'
import { X, Square, Mic } from 'lucide-react'
import { formatDuration } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function RecordModal() {
    const isRecording = useAppStore((s: any) => s.isRecording)
    const recordingDuration = useAppStore((s: any) => s.recordingDuration)
    const audioBlob = useAppStore((s: any) => s.audioBlob)
    const setIsRecording = useAppStore((s: any) => s.setIsRecording)

    const { startRecording, stopRecording, cancelRecording } = useRecorder()
    const [isProcessing, setIsProcessing] = useState(false)

    // Automatically start recording when modal mounts/opens
    useEffect(() => {
        if (isRecording && !audioBlob && !isProcessing && recordingDuration === 0) {
            startRecording()
        }
    }, [isRecording, startRecording, audioBlob, isProcessing, recordingDuration])

    if (!isRecording) return null

    const handleStop = async () => {
        await stopRecording()
    }

    const handleCancel = () => {
        cancelRecording()
    }

    const handleSave = async () => {
        if (!audioBlob) return

        setIsProcessing(true)
        try {
            // TODO: Here we would upload the blob to our API / S3 via /api/recordings/upload
            // For now, we'll simulate an upload and close

            await new Promise(res => setTimeout(res, 1500))
            toast.success('Recording saved successfully!')
            setIsRecording(false) // Close modal

        } catch (error) {
            toast.error('Failed to save recording')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl relative flex flex-col items-center animate-in fade-in zoom-in duration-200">

                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-white text-lg font-semibold mb-8">
                    {isProcessing ? 'Processing Note...' : (audioBlob ? 'Review Recording' : 'Recording Audio')}
                </h2>

                {!isProcessing && !audioBlob && (
                    <>
                        <div className="relative flex items-center justify-center w-32 h-32 mb-8">
                            {/* Animated ring for active recording */}
                            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
                            <div className="absolute inset-2 bg-accent/40 rounded-full animate-pulse" />
                            <div className="relative bg-accent text-white w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(232,25,44,0.5)]">
                                <Mic className="w-8 h-8" />
                            </div>
                        </div>

                        <div className="text-4xl font-mono text-white mb-10 tracking-wider">
                            {formatDuration(recordingDuration)}
                        </div>

                        <button
                            onClick={handleStop}
                            className="bg-bg-secondary hover:bg-bg-hover border border-border transition-colors text-white py-3 px-8 rounded-full flex items-center space-x-2 font-medium"
                        >
                            <Square className="w-4 h-4 text-accent fill-accent" />
                            <span>Stop Recording</span>
                        </button>
                    </>
                )}

                {!isProcessing && audioBlob && (
                    <div className="w-full flex flex-col items-center">
                        <div className="text-2xl font-mono text-white mb-6">
                            {formatDuration(recordingDuration)}
                        </div>
                        <p className="text-sm text-text-secondary mb-8">Recording captured. Ready to transcribe?</p>

                        <div className="flex w-full space-x-3">
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-bg-secondary hover:bg-bg-hover text-white py-2.5 rounded-lg border border-border transition-colors"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-accent hover:bg-red-600 text-white font-medium py-2.5 rounded-lg shadow-[0_0_15px_rgba(232,25,44,0.3)] transition-colors"
                            >
                                Save & Transcribe
                            </button>
                        </div>
                    </div>
                )}

                {isProcessing && (
                    <div className="py-12 flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-bg-secondary border-t-accent rounded-full animate-spin mb-6" />
                        <p className="text-text-secondary text-sm">Uploading audio securely...</p>
                    </div>
                )}

            </div>
        </div>
    )
}
