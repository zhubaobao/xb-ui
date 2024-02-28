import { getCurrentInstance } from "vue";
const useForm = () => {
  const currentInstance = getCurrentInstance();
  let count = 0;
  const pics = [
    "https://bianguo.com.cn/uploads/news/20230308/5cfa64e90ab305157e08405a40f88669.jpg",
    "https://static.yoshop.xany6.com/201906101321536e2883041.jpg",
    "https://static.yoshop.xany6.com/10001/20210313/074646782cfec5e7d327148c3fe61dce.jpg",
    "https://static.yoshop.xany6.com/20190610153602a29925572.png"
  ]
  const formConfig = {
    popupType: "page",
    formAttrs: {
      rules: {
        XbInput: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
        detailsf: [{ required: true, message: 'wwww', trigger: 'blur' }],
      },
      "label-position": "left"
    },
    add: {
      requestApi(val){
        console.log(val)
        return new Promise(resolve => {
          resolve({
            code: 2,
            msg: 'ddd'
          })
        })
      }
    },
    tabs: [
      {
        name: "specification",
        label: "规格/库存",
        formItems: [
          {
            type: "XbFormJson",
            label: "input",
            propName: "input",
            min: 1,
            fixNum: 1,
            formItems: [
              {
                type: "XbInput",
                label: "input",
                propName: "input1",
                disabledControl(item, index) {
                  return index == 0
                }
              }
            ]
          },
          {
            type: "XbInput",
            label: "name",
            propName: "name",
          },
          {
            type: "XbInput",
            label: "thing",
            propName: "thing",
          },
          {
            type: "XbSelect",
            label: "select",
            propName: "select",
            defaultOptions: [
              {
                name: '22',
                id: 1
              },
              {
                name: '33',
                id: 2
              }
            ]
          },
          // {
          //   type: "XbRadio",
          //   label: "规格类型",
          //   propName: "ggType",
          //   defaultValue: 1,
          //   options: [
          //     {
          //       name: '单规格',
          //       id: 0,
          //     },
          //     {
          //       name: '多规格',
          //       id: 1
          //     }
          //   ]
          // },
          // {
          //   type: "template",
          //   label: "XbInput",
          //   propName: "XbInput",
          //   linkShowProps: ['ggType'],
          //   linkShowCb(val){
          //     console.log(currentInstance, 'currentInstance')
          //     return val === 1
          //   },
          // },
          // {
          //   type: "template",
          //   label: "商品详情",
          //   propName: "details",
          //   slots: {
          //     append: "111"
          //   }
          // },
          // {
          //   name: "details",
          //   label: "商品详情",
          //   formItems: [
          //     {
          //       type: "XbInput",
          //       label: "商品详情",
          //       propName: "detailsf",
          //       slots: {
          //         append: "111"
          //       }
          //     }
          //   ]
          // },
          // {
          //   type: "XbInputNumber",
          //   label: "inputNumber",
          //   propName: "inputNumber",
          // },
          // {
          //   type: "XbTimePicker",
          //   label: "timePicker",
          //   propName: "startTime-endTime",
          //   propAttrs: {
          //     isRange: true
          //   }
          // },
         
          // {
          //   type: "XbSelect",
          //   label: "联动效果1",
          //   propName: "ani",
          //   defaultOptions: [
          //     {
          //       id: 1,
          //       name: "禁用姓名",
          //     },
          //     {
          //       id: 2,
          //       name: "改变状态的值1",
          //     },
          //     {
          //       id: 3,
          //       name: "改变状态的值2",
          //     },
          //   ],
          //   propAttrs: {
          //     placeholder: "请选择动效",
          //   },
          //   slots: {
          //     append: '2333',
          //     prepend: '444',
          //     extra: "xbTemplate"
          //   }
            
          // },
          // {
          //   type: "XbUpload",
          //   label: '图片',
          //   propName: 'pic',
          //   limit: 10,
          //   uploadType: 'library',
          //   requestApi() {
          //     return new Promise(resolve => {
          //       resolve({
          //         code: 1,
          //         src: pics[count]
          //       })
          //       count++;
          //       if(count > 3) {
          //         count = 0
          //       }
          //     })
          //   },
          //   libConfig: {
          //     requestApi() {
          //       return new Promise(resolve => {
          //         resolve({
          //           code: 1,
          //           data: {
          //             list: new Array(15).fill({
          //               image: "https://bianguo.com.cn/uploads/news/20230308/5cfa64e90ab305157e08405a40f88669.jpg",
          //               name: "白.jpg"
          //             })
          //           }
          //         })
          //       })
          //     }
          //   }
          // },
          // {
          //   type: "XbSelect",
          //   label: "状态",
          //   propName: "status",
          //   defaultOptions: [],
          //   propAttrs: {
          //     placeholder: "请选择状态",
          //   },
          //   linkOptionsProps: ["ani"],
          //   linkOptionsCb(val) {
          //     if (val == 2) {
          //       return [
          //         {
          //           id: "pending",
          //           name: "pending",
          //         },
          //       ];
          //     } else if (val == 3) {
          //       return [
          //         {
          //           id: "available",
          //           name: "available",
          //         },
          //         {
          //           id: "sold",
          //           name: "sold",
          //         },
          //       ];
          //     } else {
          //       return [];
          //     }
          //   },
          // },
          // {
          //   type: "XbInput",
          //   label: "姓名",
          //   propName: "name",
          //   propAttrs: {
          //     placeholder: "请输入姓名",
          //   },
          //   linkDisabledProps: ["ani"],
          //   linkDisabledCb(val) {
          //     return val === 1;
          //   },
          // },
          // {
          //   type: "text",
          //   label: "标题",
          // },
          // {
          //   type: "XbDatePicker",
          //   label: "时间",
          //   propName: "startDate-endDate",
          //   propAttrs: {
          //     type: 'daterange'
          //   },
          // },
          // {
          //   type: "XbTimePicker",
          //   label: "时间",
          //   propName: "time2",
          //   propAttrs: {
          //     start: "08:30",
          //     step: "00:15",
          //     end: "18:30",
          //     placeholder: "Select time",
          //   },
          // },
          // {
          //   type: 'XbSwitch',
          //   label: "是否显示排序",
          //   propName: "isSort",
          //   defaultValue: false,
          // },
          // {
          //   type: "XbInput",
          //   label: "排序",
          //   propName: "sort",
          //   linkShowProps: ['isSort'],
          //   linkShowCb(val) {
          //     return val
          //   }
          // }
        ]
      },
      {
        label: "课程设置",
        formItems: [
          {
            type: "XbFormJson",
            formItemPropAttrs: {
              labelWidth: '0px',
            },
            propName: "formJson",
            formItems: [
              {
                type: "XbInput",
                label: "招生对象",
                propName: "obj"
              },
              {
                type: "XbFormJson",
                formItemPropAttrs: {
                  labelWidth: '0px',
                },
                propName: "list",
                formItems: [
                  {
                    type: "XbInput",
                    label: "课程",
                    propName: "calss",
                  }
                ]
              },
            ] 
          },
        ]
      }
    ]
    // formItems: [
    //   {
    //     type: "XbInput",
    //     label: "input",
    //     propName: "input",
    //     propAttrs: {
    //       placeholder: '222'
    //     },
    //     slots: {
    //       append: '2333',
    //       prepend: '444'
    //     }
    //   },
    //   {
    //     type: "XbInputNumber",
    //     label: "inputNumber",
    //     propName: "inputNumber",
    //   },
    //   {
    //     type: "XbTimePicker",
    //     label: "timePicker",
    //     propName: "startTime-endTime",
    //     propAttrs: {
    //       isRange: true
    //     }
    //   },
    //   {
    //     type: "XbFormJson",
    //     label: "formJson",
    //     propName: "formJson",
    //     min: 2,
    //     max: 4,
    //     formItems: [
    //       {
    //         type: "XbInput",
    //         label: "input",
    //         propName: "a",
    //       },
    //       {
    //         type: "XbInput",
    //         label: "input2",
    //         propName: "b",
    //       }
    //     ] 
    //   },
    //   {
    //     type: "XbSelect",
    //     label: "联动效果1",
    //     propName: "ani",
    //     defaultOptions: [
    //       {
    //         id: 1,
    //         name: "禁用姓名",
    //       },
    //       {
    //         id: 2,
    //         name: "改变状态的值1",
    //       },
    //       {
    //         id: 3,
    //         name: "改变状态的值2",
    //       },
    //     ],
    //     propAttrs: {
    //       placeholder: "请选择动效",
    //     },
    //     slots: {
    //       append: '2333',
    //       prepend: '444',
    //       extra: "xbTemplate"
    //     }
        
    //   },
    //   {
    //     type: "XbUpload",
    //     label: '图片',
    //     propName: 'pic',
    //     limit: 10,
    //     uploadType: 'library',
    //     requestApi() {
    //       return new Promise(resolve => {
    //         resolve({
    //           code: 1,
    //           src: pics[count]
    //         })
    //         count++;
    //         if(count > 3) {
    //           count = 0
    //         }
    //       })
    //     },
    //     libConfig: {
    //       requestApi() {
    //         return new Promise(resolve => {
    //           resolve({
    //             code: 1,
    //             data: {
    //               list: new Array(15).fill({
    //                 image: "https://bianguo.com.cn/uploads/news/20230308/5cfa64e90ab305157e08405a40f88669.jpg",
    //                 name: "白.jpg"
    //               })
    //             }
    //           })
    //         })
    //       }
    //     }
    //   },
    //   {
    //     type: "XbSelect",
    //     label: "状态",
    //     propName: "status",
    //     defaultOptions: [],
    //     propAttrs: {
    //       placeholder: "请选择状态",
    //     },
    //     linkOptionsProps: ["ani"],
    //     linkOptionsCb(val) {
    //       if (val == 2) {
    //         return [
    //           {
    //             id: "pending",
    //             name: "pending",
    //           },
    //         ];
    //       } else if (val == 3) {
    //         return [
    //           {
    //             id: "available",
    //             name: "available",
    //           },
    //           {
    //             id: "sold",
    //             name: "sold",
    //           },
    //         ];
    //       } else {
    //         return [];
    //       }
    //     },
    //   },
    //   {
    //     type: "XbInput",
    //     label: "姓名",
    //     propName: "name",
    //     propAttrs: {
    //       placeholder: "请输入姓名",
    //     },
    //     linkDisabledProps: ["ani"],
    //     linkDisabledCb(val) {
    //       return val === 1;
    //     },
    //   },
    //   {
    //     type: "text",
    //     label: "标题",
    //   },
    //   {
    //     type: "XbDatePicker",
    //     label: "时间",
    //     propName: "startDate-endDate",
    //     propAttrs: {
    //       type: 'daterange'
    //     },
    //   },
    //   {
    //     type: "XbTimePicker",
    //     label: "时间",
    //     propName: "time2",
    //     propAttrs: {
    //       start: "08:30",
    //       step: "00:15",
    //       end: "18:30",
    //       placeholder: "Select time",
    //     },
    //   },
    //   {
    //     type: 'XbSwitch',
    //     label: "是否显示排序",
    //     propName: "isSort",
    //     defaultValue: false,
    //   },
    //   {
    //     type: "XbInput",
    //     label: "排序",
    //     propName: "sort",
    //     linkShowProps: ['isSort'],
    //     linkShowCb(val) {
    //       return val
    //     }
    //   }
    // ],
  };
  return {
    formConfig,
  };
};
export default useForm;
