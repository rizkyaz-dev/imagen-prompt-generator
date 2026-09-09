import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { PromptEntry } from './types'

const records = new Map<string, unknown>()
vi.mock('localforage', () => ({ default: { getItem: vi.fn(async (key: string) => records.get(key)), setItem: vi.fn(async (key: string, value: unknown) => { records.set(key, value); return value }) } }))

const { clearAllHistory, getFavorites, getHistory, saveToHistory, toggleFavorite } = await import('./storage')

function entry(id: string, favorite = false): PromptEntry { return { id, createdAt: `2026-09-09T00:00:${id.padStart(2, '0')}Z`, isFavorite: favorite, targetModel: 'imagen-3', aspectRatio: '1:1', rawInputs: { subject: id, styles: [], customStyle: '', lighting: [], camera: { angle: '', shotType: '', lens: '', perspective: '' }, palette: '', qualityTags: [], negativePrompt: '', targetModel: 'imagen-3', aspectRatio: '1:1' }, finalPromptText: id } }

describe('history storage', () => {
  beforeEach(async () => { records.clear(); await clearAllHistory() })

  it('keeps newest 100 entries and sorts newest first', async () => {
    for (let index = 0; index < 101; index += 1) await saveToHistory(entry(String(index).padStart(2, '0')))
    const history = await getHistory()
    expect(history).toHaveLength(100)
    expect(history[0].id).toBe('99')
    expect(history.some((item) => item.id === '00')).toBe(false)
  })

  it('toggles and filters favorites', async () => {
    await saveToHistory(entry('01'))
    await toggleFavorite('01')
    expect((await getFavorites()).map((item) => item.id)).toEqual(['01'])
  })
})