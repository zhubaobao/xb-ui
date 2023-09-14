import form from './src/main';
form.install = function (Vue) {
  Vue.component(form.name, form);
};

export default form;