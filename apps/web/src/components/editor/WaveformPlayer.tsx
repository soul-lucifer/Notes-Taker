import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { Play, Pause, Maximize2 } from 'lucide-react'
import { formatDuration } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

interface WaveformProps {
    audioUrl: string
}

export default function WaveformPlayer({ audioUrl }: WaveformProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const wsRef = useRef<WaveSurfer | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const currentTime = useAppStore(s => s.currentTime)
    const setCurrentTime = useAppStore(s => s.setCurrentTime)

    useEffect(() => {
        if (!containerRef.current) return

        const ws = WaveSurfer.create({
            container: containerRef.current,
            waveColor: 'rgba(232, 25, 44, 0.4)',
            progressColor: '#E8192C',
            cursorColor: '#E8192C',
            cursorWidth: 2,
            barWidth: 2,
            barGap: 1,
            barRadius: 2,
            height: 40,
            normalize: true,
            backend: 'WebAudio',
            url: audioUrl || 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg' // Fallback dummy audio
        })

        ws.on('ready', () => {
            setDuration(ws.getDuration())
        })

        ws.on('audioprocess', (time) => {
            setCurrentTime(time)
        })

        ws.on('finish', () => {
            setIsPlaying(false)
        })

        wsRef.current = ws

        return () => {
            ws.destroy()
        }
    }, [audioUrl, setCurrentTime])

    const togglePlay = () => {
        if (wsRef.current) {
            wsRef.current.playPause()
            setIsPlaying(wsRef.current.isPlaying())
        }
    }

    const handleFullscreen = () => {
        // fullscreen logic placeholder
    }

    return (
        <div className="bg-waveform-bg border border-accent-dim rounded-xl p-3 px-4 flex items-center space-x-4">
            <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0 hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(232,25,44,0.3)]"
            >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <div className="text-sm font-mono text-white w-12 text-center shrink-0">
                {formatDuration(currentTime)}
            </div>

            <div className="flex-1 overflow-hidden" ref={containerRef} />

            <div className="text-sm font-mono text-text-secondary w-14 text-right shrink-0">
                -{formatDuration(Math.max(0, duration - currentTime))}
            </div>

            <button className="text-text-muted hover:text-white p-1 transition-colors shrink-0" onClick={handleFullscreen}>
                <Maximize2 className="w-4 h-4" />
            </button>
        </div>
    )
}
