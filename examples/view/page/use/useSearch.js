const useSearch = () => {
  const searchConfig = {
    formAttrs: {},
    formItems: [
      {
        type: "XbSelect",
        label: "联动效果",
        propName: "ani",
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
        type: "XbSelect",
        label: "状态",
        propName: "status",
        defaultOptions: [],
        propAttrs: {
          placeholder: "请选择状态",
        },
        linkOptionsProps: ["ani"],
        linkOptionsCb(val, key, resolve) {
          if (val == 2) {
            resolve(
              [
                {
                  id: "pending",
                  name: "pending",
                },
              ]
            )
          } else if (val == 3) {
            resolve([
              {
                id: "available",
                name: "available",
              },
              {
                id: "sold",
                name: "sold",
              },
            ])
          } else {
            resolve([])
          }
        },
        show: false,
      },

      {
        type: "template",
        label: "时间",
        propName: "time",
        propAttrs: {},
      },
      {
        type: "XbTimePicker",
        label: "时间",
        propName: "time2",
        propAttrs: {
          start: "08:30",
          step: "00:15",
          end: "18:30",
          placeholder: "Select time",
        },
      },
      {
        type: "XbDatePicker",
        label: "日期区间",
        propName: "startTime-endTime",
        defaultValue: [],
        propAttrs: {
          type: "daterange",
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间'
        }
      },
      {
        type: "XbSwitch",
        label: "是否显示地址",
        propName: "showAddress",
        defaultValue: true,
      },
      {
        type: "XbInput",
        label: "地址",
        propName: "address",
        linkShowProps: ["showAddress"],
        linkShowCb: (val, key, formData) => {
          return formData.showAddress
        }
      }
    ],
  };
  return {
    searchConfig,
  };
};
export default useSearch;
