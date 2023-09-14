import PageCreate from './src/main';

      /* istanbul ignore next */
      PageCreate.install = function(Vue) {
        Vue.component(PageCreate.name, PageCreate);
      };

      export default PageCreate;
