import { lightingOptions, artStyles } from './modelPresets'
import { formatPrompt } from './promptFormatter'
import type { RawInputs } from './types'

const styleAlternatives = ['Editorial', 'Concept Art', 'Film Noir', 'Minimalist', 'Photorealistic']
const lightingAlternatives = ['Cinematic', 'Golden Hour', 'Volumetric', 'Soft', 'Dramatic']

export function generateVariations(inputs: RawInputs, count: 2 | 3 | 5): string[] {
  if (!inputs.subject.trim()) return []
  return Array.from({ length: count }, (_, index) => {
    const style = styleAlternatives[index % styleAlternatives.length]
    const lighting = lightingAlternatives[index % lightingAlternatives.length]
    const next: RawInputs = {
      ...inputs,
      styles: [style],
      lighting: [lighting],
      customStyle: '',
    }
    return formatPrompt(next)
  })
}

export function isKnownPreset(value: string): boolean {
  return artStyles.includes(value) || lightingOptions.includes(value)
}