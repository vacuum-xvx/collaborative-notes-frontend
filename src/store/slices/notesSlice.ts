import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  authorId: string
  collaborators: string[]
  tags: string[]
  isPublic: boolean
  shareLink?: string
}

interface NotesState {
  notes: Note[]
  currentNote: Note | null
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedTags: string[]
}

const initialState: NotesState = {
  notes: [],
  currentNote: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedTags: [],
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload)
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id)
      if (index !== -1) {
        state.notes[index] = action.payload
      }
      if (state.currentNote?.id === action.payload.id) {
        state.currentNote = action.payload
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
      if (state.currentNote?.id === action.payload) {
        state.currentNote = null
      }
    },
    setCurrentNote: (state, action: PayloadAction<Note | null>) => {
      state.currentNote = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload
    },
  },
})

export const {
  setNotes,
  addNote,
  updateNote,
  deleteNote,
  setCurrentNote,
  setLoading,
  setError,
  setSearchQuery,
  setSelectedTags,
} = notesSlice.actions

export default notesSlice.reducer
