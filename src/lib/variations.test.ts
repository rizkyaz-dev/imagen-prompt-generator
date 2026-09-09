import { describe, expect, it } from 'vitest'
import { generateVariations } from './variations'
import { emptyInputs } from './types'

describe('generateVariations', () => {
  it('returns the requested count and preserves the subject', () => {
    const variations = generateVariations({ ...emptyInputs, subject: 'a mountain cabin' }, 5)
    expect(variations).toHaveLength(5)
    expect(variations.every((prompt) => prompt.startsWith('a mountain cabin'))).toBe(true)
  })

  it('returns no output for an empty subject', () => {
    expect(generateVariations(emptyInputs, 2)).toEqual([])
  })
})