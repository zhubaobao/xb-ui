import { defineConfig } from 'vitepress';
import mdContainer from 'markdown-it-container';
import MarkdownIt from 'markdown-it'
import fs from 'fs';
import path from 'path';
import tag from './plugins/tag'
import { highlight } from './utils/highlight';

export default defineConfig({
  title: 'xb-ui',
  base: '/xb-ui/',
  description: '一个基于element-plus二次开发的组件库,适用于后台管理系统',
  appearance: false,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/favicon.ico',
      },
    ],
  ],
  themeConfig: {
    logo: '/images/xb-logo.png',
    nav: [
      { text: '组件', link: '/component/curdTable' },
    ],
    sidebar: [
      {
        text: '基础组件',
        items: [
          { text: 'CurdTable', link: '/component/curdTable' },
          { text: 'table', link: '/component/table' },
          { text: 'form', link: '/component/form' },
          { text: 'search', link: '/component/search' },
          { text: 'submit', link: '/component/submit' },
          { text: 'upload', link: '/component/upload' }
        ]
      }
    ]
  },
  markdown: {
    config: (md) => {
      const localMd = MarkdownIt().use(tag)
      md.use(mdContainer, 'demo', {
        validate(params: string) {
          return params.trim().match(/^demo\s*(.*)$/);
        },
        render(tokens: any, idx: any) {
          const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
          if(tokens[idx].nesting === 1) {
            const description = m && m.length > 1 ?  m[1] : '';
            const sourceFileToken = tokens[idx + 2];
            let source = ''
            const sourceFile = sourceFileToken.children?.[0].content ?? '';
            if (sourceFileToken.type === 'inline') {
              source = fs.readFileSync(path.resolve(__dirname, `../examples/${sourceFile}.vue`), 'utf-8');
            }
            if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);
           
            return `<XbDemo :demos="demos"  source="${encodeURIComponent(
              highlight(source, 'vue')
            )}" path="${sourceFile}" raw-source="${encodeURIComponent(
              source
            )}" description="${encodeURIComponent(localMd.render(description))}">`
          } else {
            return '</XbDemo>'
          }
        }
      })
    },
  },
})
