
import { define } from '../utils/types'
// import ElementPlus from 'element-plus'
// import VPApp, { globals, NotFound } from '../vitepress'

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

export default define<Theme>({
  ...DefaultTheme
  // NotFound,
  // Layout: VPApp,
  // enhanceApp: ({ app }) => {
  //   app.use(ElementPlus)
  //   globals.forEach(([name, Comp]) => {
  //     app.component(name, Comp)
  //   })
  // },
})
