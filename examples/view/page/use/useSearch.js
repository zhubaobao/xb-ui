import { ref } from "vue";
const useSearch = () => {
  let option = ref([
    {
      id: 1,
      name: "禁用姓名",
    },
    {
      id: 2,
      name: "改变状态的值1",
    },
    {
      id: 3,
      name: "改变状态的值2",
    },
  ]);
  const searchConfig = {
    formAttrs: {},
    formItems: [
      {
        type: "XbSelect",
        label: "联动效果",
        propName: "ani",
        defaultOptions: option.value,
        propAttrs: {
          type: "daterange",
        },

      },
      {
        type: "XbDatePicker",
        label: "课程周期",
        propName: "cycleStart-cycleEnd",
        propAttrs: {
          type: "daterange",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          valueFormat: "YYYY-MM-DD"
        },
      },
      {
        type: "XbSelect",
        label: "联动效果",
        propName: "aniTwo",
        defaultOptions: [
          {
            id: 1,
            name: "禁用姓名",
          },
          {
            id: 2,
            name: "改变状态的值1",
          },
          {
            id: 3,
            name: "改变状态的值2",
          },
        ],
        propAttrs: {
          placeholder: "请选择动效",
        },
      },
      {
        type: "XbInput",
        label: "姓名",
        propName: "name",
        propAttrs: {
          placeholder: "请输入姓名",
        },
        linkDisabledProps: ["ani", "aniTwo"],
        linkDisabledCb(val, key, formData) {
          console.log(formData.ani, formData.aniTwo)
          return formData.ani == 1 && formData.aniTwo == 1;
        },
      },
      {
        type: 'XbSwitch',
        label: "是否显示排序",
        propName: "isSort",
        defaultValue: false,
      },
      {
        type: "XbInput",
        label: "排序",
        propName: "sort",
        linkShowProps: ['isSort'],
        linkShowCb(val) {
          return val
        }
      }
    ],
  };
  return {
    searchConfig,
  };
};
export default useSearch;
