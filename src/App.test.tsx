import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Prompt Canvas', () => {
  it('renders the builder and keeps preview empty without a subject', () => {
    render(<App />)
    expect(screen.getByText('Penyusun prompt')).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Sempurnakan dengan AI/ })).toBeNull()
    expect(screen.getByRole('button', { name: /Hasilkan prompt/ }).hasAttribute('disabled')).toBe(true)
  })
})
