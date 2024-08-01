
import { define } from '../utils/types';
import ElementPlus from 'element-plus';
import "element-plus/dist/index.css";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import XbDemo from './XbDemo/index.vue';
import DefaultTheme from 'vitepress/theme'
import XbAdminUi from 'xb-admin-ui';
import "./styles/app.scss"




export default define({
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus, { locale: zhCn });
    app.use(XbAdminUi);
    app.component('XbDemo', XbDemo);
  },
})


