import { create } from 'zustand'
import { emptyInputs } from '../lib/types'
import type { RawInputs } from '../lib/types'

interface PromptStore {
  inputs: RawInputs
  update: (patch: Partial<RawInputs>) => void
  updateCamera: (key: keyof RawInputs['camera'], value: string) => void
  reset: () => void
}

export const usePromptStore = create<PromptStore>((set) => ({
  inputs: emptyInputs,
  update: (patch) => set((state) => ({ inputs: { ...state.inputs, ...patch } })),
  updateCamera: (key, value) => set((state) => ({ inputs: { ...state.inputs, camera: { ...state.inputs.camera, [key]: value } } })),
  reset: () => set({ inputs: emptyInputs }),
}))