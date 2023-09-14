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
        label: "状态",
        propName: "status",
        defaultOptions: [],
        propAttrs: {
          placeholder: "请选择状态",
        },
        linkOptionsProps: ["ani"],
        linkOptionsCb(val) {
          if (val == 2) {
            return [
              {
                id: "pending",
                name: "pending",
              },
            ];
          } else if (val == 3) {
            return [
              {
                id: "available",
                name: "available",
              },
              {
                id: "sold",
                name: "sold",
              },
            ];
          } else {
            return [];
          }
        },
      },
      {
        type: "XbInput",
        label: "姓名",
        propName: "name",
        propAttrs: {
          placeholder: "请输入姓名",
        },
        linkDisabledProps: ["ani"],
        linkDisabledCb(val) {
          return val === 1;
        },
      },
      {
        type: "XbSwitch",
        label: "是否启用",
        propName: "status",
        propAttrs: {
          size: "large",
        },
      },
      {
        type: "XbTimePicker",
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
      }
    ],
  };
  return {
    searchConfig,
  };
};
export default useSearch;
