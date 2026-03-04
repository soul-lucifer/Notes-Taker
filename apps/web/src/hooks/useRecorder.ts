import { useState, useRef, useCallback } from 'react'
import RecordRTC from 'recordrtc'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'react-hot-toast'

export function useRecorder() {
    const [stream, setStream] = useState<MediaStream | null>(null)
    const recorderRef = useRef<RecordRTC | null>(null)
    const timerRef = useRef<number | null>(null)

    const setIsRecording = useAppStore((s: any) => s.setIsRecording)
    const setRecordingDuration = useAppStore((s: any) => s.setRecordingDuration)
    const setAudioBlob = useAppStore((s: any) => s.setAudioBlob)

    const startRecording = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                }
            })

            setStream(mediaStream)

            const recorder = new RecordRTC(mediaStream, {
                type: 'audio',
                mimeType: 'audio/webm;codecs=opus', // standard for web audio
                recorderType: RecordRTC.StereoAudioRecorder,
                numberOfAudioChannels: 1, // mono is usually fine for voice
            })

            recorder.startRecording()
            recorderRef.current = recorder

            setIsRecording(true)
            setRecordingDuration(0)
            setAudioBlob(null)

            // Start duration timer
            timerRef.current = window.setInterval(() => {
                setRecordingDuration((prev: number) => prev + 1)
            }, 1000)

        } catch (error: any) {
            console.error('Error accessing microphone:', error)
            toast.error(error.message || 'Could not access the microphone. Please check permissions.')
            setIsRecording(false)
        }
    }, [setIsRecording, setRecordingDuration, setAudioBlob])

    const stopRecording = useCallback(() => {
        return new Promise<Blob | null>((resolve) => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }

            if (!recorderRef.current) {
                resolve(null)
                return
            }

            recorderRef.current.stopRecording(() => {
                const blob = recorderRef.current!.getBlob()
                setAudioBlob(blob)

                // Stop all tracks to release the microphone
                if (stream) {
                    stream.getTracks().forEach((track: MediaStreamTrack) => track.stop())
                    setStream(null)
                }

                // We keep isRecording true so the modal can show "uploading" or allow the user to review it.
                // The modal itself will call setIsRecording(false) when closed.

                resolve(blob)
                recorderRef.current?.destroy()
                recorderRef.current = null
            })
        })
    }, [stream, setAudioBlob])

    const cancelRecording = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }

        if (recorderRef.current) {
            recorderRef.current.stopRecording(() => {
                recorderRef.current?.destroy()
                recorderRef.current = null
            })
        }

        if (stream) {
            stream.getTracks().forEach((track: MediaStreamTrack) => track.stop())
            setStream(null)
        }

        setIsRecording(false)
        setRecordingDuration(0)
        setAudioBlob(null)
    }, [stream, setIsRecording, setRecordingDuration, setAudioBlob])

    return {
        startRecording,
        stopRecording,
        cancelRecording
    }
}
