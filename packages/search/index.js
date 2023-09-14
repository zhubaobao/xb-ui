import search from './src/main';
search.install = function (Vue) {
  Vue.component(search.name, search);
};

export default search;