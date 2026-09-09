import { describe, expect, it, vi } from 'vitest'
import { onRequestPost } from './enhance-prompt'

const request = (subject: string, ip = crypto.randomUUID()) => new Request('https://example.test/api/enhance-prompt', { method: 'POST', headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': ip }, body: JSON.stringify({ subject }) })

describe('enhance-prompt function', () => {
  it('rejects an empty subject and does not call Gemini', async () => {
    const response = await onRequestPost({ request: request(''), env: { GEMINI_API_KEY: 'test' } })
    expect(response.status).toBe(400)
  })

  it('returns a normalized draft from Gemini', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '{"subject":"cinematic cat","styles":["Photorealistic"],"lighting":["Soft"]}' }] } }] }), { status: 200 })))
    const response = await onRequestPost({ request: request('cat astronaut'), env: { GEMINI_API_KEY: 'test' } })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ draft: { subject: 'cinematic cat', styles: ['Photorealistic'], lighting: ['Soft'] } })
    vi.unstubAllGlobals()
  })

  it('returns a gateway timeout when Gemini aborts', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new DOMException('Timeout', 'AbortError')))
    const response = await onRequestPost({ request: request('cat astronaut'), env: { GEMINI_API_KEY: 'test' } })
    expect(response.status).toBe(504)
    vi.unstubAllGlobals()
  })

  it('limits an IP to 20 requests per minute', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '{"subject":"cat"}' }] } }] }), { status: 200 })))
    const ip = crypto.randomUUID()
    const responses = []
    for (let index = 0; index < 21; index += 1) responses.push(await onRequestPost({ request: request('cat', ip), env: { GEMINI_API_KEY: 'test' } }))
    expect(responses.at(-1)?.status).toBe(429)
    vi.unstubAllGlobals()
  })
})