import { ref, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const theme = ref<Theme>('system')
  const isDark = ref(false)

  // Get theme from localStorage or system preference
  const getSystemTheme = (): Theme => {
    if (import.meta.env.SSR) return 'light'
    return (localStorage.getItem('theme') as Theme) || 'system'
  }

  // Apply theme class to html element
  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    root.classList.remove('light', 'dark')
    
    if (newTheme === 'system') {
      isDark.value = systemDark
      root.classList.add(systemDark ? 'dark' : 'light')
    } else {
      isDark.value = newTheme === 'dark'
      root.classList.add(newTheme)
    }
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark.value ? '#020817' : '#ffffff')
    }
  }

  // Set theme and save to localStorage
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  // Initialize
  onMounted(() => {
    const savedTheme = getSystemTheme()
    theme.value = savedTheme
    applyTheme(savedTheme)
    
    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme.value === 'system') {
        applyTheme('system')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  })

  return {
    theme,
    isDark,
    setTheme
  }
}
