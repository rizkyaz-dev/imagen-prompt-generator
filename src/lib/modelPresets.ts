import type { AspectRatio, ModelTarget } from './types'

export interface ModelPreset {
  label: string
  ratio: (value: AspectRatio) => string
  negative: (value: string) => string
  description: string
}

export const modelPresets: Record<ModelTarget, ModelPreset> = {
  'imagen-3': {
    label: 'Google Imagen 3',
    ratio: (value) => `aspect ratio ${value}`,
    negative: (value) => (value ? `Avoid: ${value}` : ''),
    description: 'Natural language parameters for Imagen.',
  },
  'midjourney-v6': {
    label: 'Midjourney v6',
    ratio: (value) => `--ar ${value}`,
    negative: (value) => (value ? `--no ${value}` : ''),
    description: 'Midjourney v6 parameters.',
  },
  'dalle-3': {
    label: 'DALL-E 3',
    ratio: (value) => `size ${value}`,
    negative: (value) => (value ? `Exclude: ${value}` : ''),
    description: 'DALL-E natural language constraints.',
  },
  'stable-diffusion': {
    label: 'Stable Diffusion',
    ratio: (value) => `--aspect ${value}`,
    negative: (value) => (value ? `Negative prompt: ${value}` : ''),
    description: 'Stable Diffusion prompt parameters.',
  },
}

export const modelOptions = Object.entries(modelPresets).map(([value, preset]) => ({
  value: value as ModelTarget,
  label: preset.label,
}))

export const aspectRatios: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3']

export const artStyles = [
  'Photorealistic', '3D Render', 'Anime', 'Cyberpunk', 'Oil Painting',
  'Watercolor', 'Editorial', 'Minimalist', 'Film Noir', 'Concept Art',
]

export const lightingOptions = [
  'Volumetric', 'Cinematic', 'Soft', 'Neon', 'Dark', 'Dramatic', 'Golden Hour', 'Studio',
]

export const cameraOptions = {
  angle: ['Eye level', 'Low angle', 'High angle', 'Dutch angle', 'Overhead', 'Worms-eye view'],
  shotType: ['Wide shot', 'Medium shot', 'Close-up', 'Extreme close-up', 'Macro', 'Full body'],
  lens: ['24mm lens', '35mm lens', '50mm lens', '85mm lens', '135mm lens', 'Fisheye lens'],
  perspective: ['Front view', 'Side profile', 'Three-quarter view', 'Birds-eye view', 'Drone view', 'Isometric'],
}

export const qualityTags = ['8K', 'Ultra HD', 'Unreal Engine 5', 'Octane Render', 'Highly detailed', 'Sharp focus']
export const palettes = ['Natural', 'Warm editorial', 'Cool monochrome', 'Vibrant', 'Pastel', 'Neon contrast']
export const commonNegatives = 'blurry, watermark, extra limbs, distorted hands, low quality'