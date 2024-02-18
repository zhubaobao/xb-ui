const useForm = () => {
  let count = 0;
  const pics = [
    "https://bianguo.com.cn/uploads/news/20230308/5cfa64e90ab305157e08405a40f88669.jpg",
    "https://static.yoshop.xany6.com/201906101321536e2883041.jpg",
    "https://static.yoshop.xany6.com/10001/20210313/074646782cfec5e7d327148c3fe61dce.jpg",
    "https://static.yoshop.xany6.com/20190610153602a29925572.png"
  ]
  const formConfig = {
    popupType: 'dialog',
    formAttrs: {
      rules: {
        ani: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
      },
      "label-position": "left"
    },
    formItems: [
      {
        type: "XbInput",
        label: "input",
        propName: "input",
        propAttrs: {
          placeholder: '222'
        },
        slots: {
          append: 'xbTemplate'
        }
      },
      {
        type: "XbSelect",
        label: "联动效果1",
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
        extra: "xbTemplate"
      },
      {
        type: "XbUpload",
        label: '图片',
        proName: 'pic',
        limit: 10,
        uploadType: 'library',
        requestApi() {
          return new Promise(resolve => {
            resolve({
              code: 1,
              src: pics[count]
            })
            count++;
            if(count > 3) {
              count = 0
            }
          })
        },
        libConfig: {
          requestApi() {
            return new Promise(resolve => {
              resolve({
                code: 1,
                data: {
                  list: new Array(15).fill({
                    image: "https://bianguo.com.cn/uploads/news/20230308/5cfa64e90ab305157e08405a40f88669.jpg",
                    name: "白.jpg"
                  })
                }
              })
            })
          }
        }
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
        type: "text",
        label: "标题",
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
    ],
  };
  return {
    formConfig,
  };
};
export default useForm;
