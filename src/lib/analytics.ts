type AnalyticsEvent = 'copy_prompt' | 'enhance_click' | 'page_view' | 'generate_variations'

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number>): void {
  if (typeof window === 'undefined') return
  const plausible = (window as Window & { plausible?: (name: string, options?: { props: Record<string, string | number> }) => void }).plausible
  plausible?.(event, { props: properties ?? {} })
}