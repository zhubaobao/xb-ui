import { defineConfig } from 'vite'

import { MarkdownTransform } from './.vitepress/plugins/markdown-transform'


export default defineConfig({
  plugins: [
    MarkdownTransform(),
  ],
})
