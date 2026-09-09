export type ModelTarget = 'imagen-3' | 'midjourney-v6' | 'dalle-3' | 'stable-diffusion'
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3'

export interface CameraConfig {
  angle: string
  shotType: string
  lens: string
  perspective: string
}

export interface RawInputs {
  subject: string
  styles: string[]
  customStyle: string
  lighting: string[]
  camera: CameraConfig
  palette: string
  qualityTags: string[]
  negativePrompt: string
  targetModel: ModelTarget
  aspectRatio: AspectRatio
}

export interface PromptEntry {
  id: string
  createdAt: string
  isFavorite: boolean
  targetModel: ModelTarget
  aspectRatio: AspectRatio
  rawInputs: RawInputs
  finalPromptText: string
}

export const emptyInputs: RawInputs = {
  subject: '',
  styles: [],
  customStyle: '',
  lighting: [],
  camera: { angle: '', shotType: '', lens: '', perspective: '' },
  palette: '',
  qualityTags: [],
  negativePrompt: '',
  targetModel: 'imagen-3',
  aspectRatio: '1:1',
}