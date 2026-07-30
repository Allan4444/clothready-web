'use client'

import { useRef } from 'react'

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}

/**
 * Tracks form_start once per mount, plus per-field focus/blur so GA4 can
 * surface which field visitors abandon on, and form_submit/form_error.
 */
export function useFormAnalytics(formName: string) {
  const started = useRef(false)

  function onFormInteract() {
    if (started.current) return
    started.current = true
    trackEvent('form_start', { form_name: formName })
  }

  function onFieldFocus(fieldName: string) {
    onFormInteract()
    trackEvent('field_focus', { form_name: formName, field_name: fieldName })
  }

  function onFieldBlur(fieldName: string, value: string) {
    trackEvent('field_blur', {
      form_name: formName,
      field_name: fieldName,
      field_filled: value.trim().length > 0,
    })
  }

  function onSubmitSuccess(extra: Record<string, any> = {}) {
    trackEvent('form_submit', { form_name: formName, ...extra })
  }

  function onSubmitError(errorMessage: string) {
    trackEvent('form_error', { form_name: formName, error_message: errorMessage.slice(0, 150) })
  }

  return { onFormInteract, onFieldFocus, onFieldBlur, onSubmitSuccess, onSubmitError }
}
