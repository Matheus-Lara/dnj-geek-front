import type { Directive } from 'vue'

const formatPhoneNumber = (value: string): string => {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const len = digits.length

  if (len <= 2) return `(${digits}`
  if (len <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (len <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

const handleInput = (el: HTMLInputElement) => {
  const formattedValue = formatPhoneNumber(el.value)
  if (el.value !== formattedValue) {
    el.value = formattedValue
    el.dispatchEvent(new Event('input'))
  }
}

export const vPhoneMask: Directive<HTMLInputElement> = {
  mounted(el) {
    el.addEventListener('input', () => handleInput(el))
  },
  updated(el) {
    handleInput(el)
  }
}