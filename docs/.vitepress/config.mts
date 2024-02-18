import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
export default defineConfig({
  title: 'xb-ui',
  base: '../',
  description: '一个基于element-plus二次开发的组件库,适用于后台管理系统',
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
          { text: 'submit', link: '/component/submit' }
        ]
      }
    ]
  },
  // markdown: {
  //   config: (md) => mdPlugin(md),
  // },
})
