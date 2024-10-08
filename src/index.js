/* Automatically generated by './build/bin/build-entry.js' */

import CurdTable from '../packages/curdTable/index.js';
import Search from '../packages/search/index.js';
import Table from '../packages/table/index.js';
import Submit from '../packages/submit/index.js';
import Form from '../packages/form/index.js';
import CodeGenerator from '../packages/codeGenerator/index.js';
import FormItem from '../packages/formItem/index.js';
import FormPage from '../packages/formPage/index.js';
import Upload from '../packages/upload/index.js';
import FileLib from '../packages/fileLib/index.js';

const components = [
  CurdTable,
  Search,
  Table,
  Submit,
  Form,
  CodeGenerator,
  FormItem,
  FormPage,
  Upload,
  FileLib
];

const install = function(Vue, opts = {}) {
  Vue.provide('globalConfig', opts)
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.33',
  install,
  CurdTable,
  Search,
  Table,
  Submit,
  Form,
  CodeGenerator,
  FormItem,
  FormPage,
  Upload,
  FileLib
};
