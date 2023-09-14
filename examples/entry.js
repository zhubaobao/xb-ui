import { createApp } from 'vue'
import App from './app'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Element from 'main/index.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './route.config';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(ElementPlus);
app.use(Element, {
  tableConfig: {
    responseFormat(val) {
      return {
        code: val.code === 200 ? 1 : code,
        data: {
          list: val.data.data
        }
      }
    }
  }
});
app.mount('#app');