import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Collaborator {
  id: string
  name: string
  avatar?: string
  isOnline: boolean
  cursor?: {
    x: number
    y: number
  }
}

interface CollaborationState {
  activeCollaborators: Collaborator[]
  isConnected: boolean
  roomId: string | null
}

const initialState: CollaborationState = {
  activeCollaborators: [],
  isConnected: false,
  roomId: null,
}

const collaborationSlice = createSlice({
  name: 'collaboration',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
    setRoomId: (state, action: PayloadAction<string | null>) => {
      state.roomId = action.payload
    },
    setActiveCollaborators: (state, action: PayloadAction<Collaborator[]>) => {
      state.activeCollaborators = action.payload
    },
    addCollaborator: (state, action: PayloadAction<Collaborator>) => {
      const existingIndex = state.activeCollaborators.findIndex(
        collab => collab.id === action.payload.id
      )
      if (existingIndex === -1) {
        state.activeCollaborators.push(action.payload)
      }
    },
    removeCollaborator: (state, action: PayloadAction<string>) => {
      state.activeCollaborators = state.activeCollaborators.filter(
        collab => collab.id !== action.payload
      )
    },
    updateCollaborator: (state, action: PayloadAction<Collaborator>) => {
      const index = state.activeCollaborators.findIndex(
        collab => collab.id === action.payload.id
      )
      if (index !== -1) {
        state.activeCollaborators[index] = action.payload
      }
    },
  },
})

export const {
  setConnected,
  setRoomId,
  setActiveCollaborators,
  addCollaborator,
  removeCollaborator,
  updateCollaborator,
} = collaborationSlice.actions

export default collaborationSlice.reducer
