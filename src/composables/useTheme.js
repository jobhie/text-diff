import { ref, watch } from 'vue'

export function useTheme() {
  const stored = localStorage.getItem('text-diff-theme')
  const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = ref(stored ? stored === 'dark' : preferDark)

  watch(isDark, (val) => {
    localStorage.setItem('text-diff-theme', val ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', val)
  }, { immediate: true })

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('text-diff-theme')) {
      isDark.value = e.matches
    }
  })

  return { isDark }
}
