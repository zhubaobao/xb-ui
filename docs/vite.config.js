import { defineConfig } from 'vite'
import path from 'path'

import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'


export default defineConfig({
  plugins: [
    MarkdownTransform(),
  ],
  resolve: {
    alias: {
      main: path.resolve(__dirname, "../src"),
    },
  },
})
