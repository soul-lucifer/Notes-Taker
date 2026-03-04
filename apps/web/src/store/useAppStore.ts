import { create } from 'zustand'
import type { User, Note } from '@flownote/shared'

interface AppStore {
    // Auth
    user: User | null
    setUser: (user: User | null) => void

    // Notes
    notes: Note[]
    activeNoteId: string | null
    setNotes: (notes: Note[]) => void
    setActiveNote: (id: string | null) => void
    updateNote: (id: string, patch: Partial<Note>) => void

    // Recording
    isRecording: boolean
    recordingDuration: number
    audioBlob: Blob | null
    setIsRecording: (v: boolean) => void
    setRecordingDuration: (v: number | ((prev: number) => number)) => void
    setAudioBlob: (b: Blob | null) => void

    // AI Panel
    aiPanelOpen: boolean
    toggleAIPanel: () => void

    // Playback
    currentTime: number
    setCurrentTime: (t: number) => void
    activeTranscriptIndex: number
    setActiveTranscriptIndex: (i: number) => void
}

export const useAppStore = create<AppStore>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),

    notes: [],
    activeNoteId: null,
    setNotes: (notes: Note[]) => set({ notes }),
    setActiveNote: (id: string | null) => set({ activeNoteId: id }),
    updateNote: (id: string, patch: Partial<Note>) => set((state: AppStore) => ({
        notes: state.notes.map((n: Note) => n.id === id ? { ...n, ...patch } : n)
    })),

    isRecording: false,
    recordingDuration: 0,
    audioBlob: null,
    setIsRecording: (v: boolean) => set({ isRecording: v }),
    setRecordingDuration: (v: number | ((prev: number) => number)) => set((s: AppStore) => ({
        recordingDuration: typeof v === 'function' ? v(s.recordingDuration) : v
    })),
    setAudioBlob: (b: Blob | null) => set({ audioBlob: b }),

    aiPanelOpen: true,
    toggleAIPanel: () => set((state: AppStore) => ({ aiPanelOpen: !state.aiPanelOpen })),

    currentTime: 0,
    setCurrentTime: (t: number) => set({ currentTime: t }),
    activeTranscriptIndex: 0,
    setActiveTranscriptIndex: (i: number) => set({ activeTranscriptIndex: i })
}))
