import { createApp, h } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ThemeProvider from '@/components/theme/ThemeProvider.vue'

// Initialize theme class on HTML element
const savedTheme = localStorage.getItem('theme') || 'system'
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const html = document.documentElement

if (savedTheme === 'dark' || (savedTheme === 'system' && systemDark)) {
  html.classList.add('dark')
} else {
  html.classList.remove('dark')
}

const app = createApp({
  render: () => h(ThemeProvider, null, { default: () => h(App) })
})

app.use(router)
app.mount('#app')
