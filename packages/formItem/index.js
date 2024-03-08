import FormItem from './src/main';

/* istanbul ignore next */
FormItem.install = function (Vue) {
  Vue.component(FormItem.name, FormItem);
};

export default FormItem;
