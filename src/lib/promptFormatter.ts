import { modelPresets } from './modelPresets'
import type { RawInputs } from './types'

export function formatPrompt(inputs: RawInputs): string {
  if (!inputs.subject.trim()) return ''

  const preset = modelPresets[inputs.targetModel]
  const sections = [inputs.subject.trim()]
  const styles = [...inputs.styles, inputs.customStyle.trim()].filter(Boolean)
  if (styles.length) sections.push(`in ${styles.join(' and ')} style`)
  if (inputs.lighting.length) sections.push(`${inputs.lighting.join(', ')} lighting`)

  const camera = Object.values(inputs.camera).filter(Boolean)
  if (camera.length) sections.push(camera.join(', '))
  if (inputs.palette) sections.push(`${inputs.palette} color palette`)
  if (inputs.qualityTags.length) sections.push(inputs.qualityTags.join(', '))
  sections.push(preset.ratio(inputs.aspectRatio))

  const negative = preset.negative(inputs.negativePrompt.trim())
  if (negative) sections.push(negative)
  return sections.join(', ')
}