import type { Directive } from 'vue'

const formatPhoneNumber = (value: string): string => {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').substring(0, 11)

  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.substring(0, 2)}) ${digits.substring(2)}`
  return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`
}

export const vPhoneMask: Directive<HTMLInputElement> = {
  mounted(el) {
    el.oninput = () => {
      const formatted = formatPhoneNumber(el.value)
      el.value = formatted
    }
  },
  updated(el) {
    const formatted = formatPhoneNumber(el.value)
    if (el.value !== formatted) {
      el.value = formatted
    }
  }
}