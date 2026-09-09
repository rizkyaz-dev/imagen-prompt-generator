import { describe, expect, it } from 'vitest'
import { formatPrompt } from './promptFormatter'
import { emptyInputs } from './types'

describe('formatPrompt', () => {
  it('returns an empty string when the subject is missing', () => {
    expect(formatPrompt(emptyInputs)).toBe('')
  })

  it('composes multi-style, lighting, camera, quality and model parameters', () => {
    expect(formatPrompt({ ...emptyInputs, subject: 'a fox', styles: ['Photorealistic', 'Editorial'], lighting: ['Cinematic', 'Soft'], camera: { angle: 'Low angle', shotType: 'Close-up', lens: '85mm lens', perspective: '' }, qualityTags: ['8K'], targetModel: 'midjourney-v6', aspectRatio: '16:9', negativePrompt: 'blurry' })).toContain('a fox, in Photorealistic and Editorial style, Cinematic, Soft lighting, Low angle, Close-up, 85mm lens, 8K, --ar 16:9, --no blurry')
  })

  it('supports custom style and platform-specific negative syntax', () => {
    expect(formatPrompt({ ...emptyInputs, subject: 'portrait', customStyle: 'glass sculpture', targetModel: 'stable-diffusion', negativePrompt: 'watermark' })).toContain('in glass sculpture style')
    expect(formatPrompt({ ...emptyInputs, subject: 'portrait', targetModel: 'stable-diffusion', negativePrompt: 'watermark' })).toContain('Negative prompt: watermark')
  })
})