import CodeGenerator from './src/main';

      /* istanbul ignore next */
      CodeGenerator.install = function(Vue) {
        Vue.component(CodeGenerator.name, CodeGenerator);
      };

      export default CodeGenerator;
