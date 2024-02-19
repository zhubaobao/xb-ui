

// import { defineConfig } from 'vite'
// import UnoCSS from 'unocss/vite'
// import Components from 'unplugin-vue-components/vite'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// import {
//   projRoot
// } from './.vitepress/utils/paths'
// export default defineConfig(async ({ mode }) => {
//   return {
//     server: {
//       host: true,
//       fs: {
//         allow: [projRoot],
//       },
//     },
//     plugins: [
//       Components({
//         dirs: ['.vitepress/vitepress/components'],
//         allowOverrides: true,
//         resolvers: [
//           IconsResolver(),
//         ],
//         include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
//       }),
//       Icons({
//         autoInstall: true,
//       }),
//       UnoCSS(
//         {
//           configFile: './uno.config.ts'
//         }
//       )
//     ]
//   }
// })
// import { defineConfig } from 'vite';
// export default defineConfig({
//     base: "./a", // index.html文件所在位置
//     root: "./a", // js导入的资源路径，src
// })
