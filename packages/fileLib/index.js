import FileLib from './src/main';

/* istanbul ignore next */
FileLib.install = function (Vue) {
  Vue.component(FileLib.name, FileLib);
};

export default FileLib;
