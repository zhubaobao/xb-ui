import curdTable from './src/main';
curdTable.install = function (Vue) {
  Vue.component(curdTable.name, curdTable);
};

export default curdTable;