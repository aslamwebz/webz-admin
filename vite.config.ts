import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon',
          enabledCollections: ['radix-icons'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Group vendor dependencies
          'vendor': [
            'vue',
            'vue-router',
            'pinia',
            'vue-i18n',
          ],
          // Group UI components
          'ui': [
            '@radix-ui/*',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'tailwindcss-animate',
          ],
          // Group icons
          'icons': [
            'lucide-vue-next',
            'unplugin-icons',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 kB
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
  },
})
