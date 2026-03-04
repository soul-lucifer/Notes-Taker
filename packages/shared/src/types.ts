export type NoteStatus = 'queued' | 'processing' | 'complete' | 'error'

export interface Note {
  id: string
  userId: string
  title: string
  audioUrl: string
  duration: number          // seconds
  status: NoteStatus
  createdAt: string
  updatedAt: string
  transcript?: TranscriptBlock[]
  insights?: AIInsights
}

export interface TranscriptBlock {
  id: string
  noteId: string
  speakerLabel: string      // "Speaker 1", "Speaker 2", etc.
  text: string
  startTime: number         // seconds from audio start
  endTime: number
  index: number
}

export interface AIInsights {
  summary: string
  keyTakeaways: string[]
  actionItems: string[]
  tags: string[]
}

export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  plan: 'free' | 'pro' | 'team'
}
