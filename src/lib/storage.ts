import localforage from 'localforage'
import type { PromptEntry } from './types'

const HISTORY_KEY = 'imagen-prompt-history'
const THEME_KEY = 'imagen-prompt-theme'

async function readHistory(): Promise<PromptEntry[]> {
  return (await localforage.getItem<PromptEntry[]>(HISTORY_KEY)) ?? []
}

export async function getHistory(): Promise<PromptEntry[]> {
  return (await readHistory()).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function saveToHistory(entry: PromptEntry): Promise<void> {
  const history = await readHistory()
  const next = [entry, ...history.filter((item) => item.id !== entry.id)].slice(0, 100)
  await localforage.setItem(HISTORY_KEY, next)
}

export async function deleteFromHistory(id: string): Promise<void> {
  await localforage.setItem(HISTORY_KEY, (await readHistory()).filter((item) => item.id !== id))
}

export async function toggleFavorite(id: string): Promise<void> {
  await localforage.setItem(HISTORY_KEY, (await readHistory()).map((item) => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
}

export async function getFavorites(): Promise<PromptEntry[]> {
  return (await getHistory()).filter((item) => item.isFavorite)
}

export async function clearAllHistory(): Promise<void> {
  await localforage.setItem(HISTORY_KEY, [])
}

export async function getTheme(): Promise<'light' | 'dark'> {
  return (await localforage.getItem<'light' | 'dark'>(THEME_KEY)) ?? 'light'
}

export async function saveTheme(theme: 'light' | 'dark'): Promise<void> {
  await localforage.setItem(THEME_KEY, theme)
}