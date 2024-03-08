import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        port: 5172,
    },
 plugins: [
  shopify({
   themeRoot: 'extensions/dimensions',
  }),
  react({
   babel: {
    presets: ['jotai/babel/preset'],
   },
  }),
 ],
})
