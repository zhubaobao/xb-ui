import { tableApi } from "./api";
import { ref } from 'vue'
const useTable = () => {
  const hasSelection = ref(true);
  const tableConfig = {
    requestApi: tableApi,
    operationConfig: {
      hasCopy: true
    },
    columns: [
      {
        prop: "name",
        label: "名称",
        showHeader: true,
        propAttrs: {
          width: 100,
        },
      },
      {
        prop: "photoUrls",
        label: "图片",
        contentType: "template",
        propAttrs: {
          width: 100,
        },
      },
      {
        prop: "tags",
        label: "标签",
        contentType: "template",
        propAttrs: {
          width: 400
        }
      },
      {
        prop: "sort",
        label: "排序",
        contentType: "sort",
        propAttrs: {
          width: 200
        }
      },
      {
        prop: "status",
        label: "状态",
      },
    ],
    propAttrs: {
      // stripe: true,
      border: true,
      rowClassName({
        row,
        rowIndex,
      }) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      // spanMethod({
      //   row,
      //   column,
      //   rowIndex,
      //   columnIndex,
      // }) {
      //   if (rowIndex % 2 === 0) {
      //     if (columnIndex === 0) {
      //       return [1, 2]
      //     } else if (columnIndex === 1) {
      //       return [0, 0]
      //     }
      //   }
      // }
    },
    hasSelection,
  };

  return {
    tableConfig,
  };
};
export default useTable;
