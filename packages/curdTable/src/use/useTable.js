import { nextTick, ref } from 'vue';
import { deepCopy } from 'main/utils'
const useTable = (props) => {
  // 表单单独页面显隐
  const fromPageShow = ref(false);
  // 表单类型 add-添加 edit-修噶
  const formType = ref('add')
  // 表格
  const tableRef = ref(null)
  // 表单
  const formRef = ref(null)
  // 表格接口参数
  const requestParams = ref(props.tableConfig.requestParams);
  // 筛选 - 搜索
  const handleSearchValChange = (val) => {
    requestParams.value = { ...props.tableConfig.requestParams, ...val };
  };
  // 表单提交 - 刷新表格
  const handleFormSubmit = () => {
    if (props.formConfig.popupType == 'page') {
      fromPageShow.value = false;
    }
    tableRef.value.getData();
  }
  // 表单页面取消
  const handleCancel = () => {
    fromPageShow.value = false;
  }
  // 添加
  const handleAdd = () => {
    if (props.formConfig.popupType == 'page') {
      fromPageShow.value = true;
    }
    formType.value = 'add'
    formRef.value && (formRef.value.popupShow = true);
    props.tableConfig.addCb && props.tableConfig.addCb();
  }
  // 编辑
  const handleEdit = async (data, type) => {
    if (formRef.value) {
      let { config } = formRef.value
      if (props.formConfig.popupType == 'page') {
        fromPageShow.value = true;
      }
      formRef.value.popupShow = true;
      formType.value = type == 'copy' ? 'add' : 'edit'
      // 处理编辑的数据
      nextTick(async () => {
        const { formDataFormat: format } = props.tableConfig;
        let formData = formRef.value.xbFormRef.formData;
        if (format) {
          data = await new Promise((resolve) => {
            format(resolve, deepCopy(data), deepCopy(formData));
          })
          // .then(res => {
          //   // console.log(formRef.value.xbFormRef.formData, 'formRef.value.xbFormRef.formData')
          //   // console.log(res, 'res')
          //   // console.log(res.name, '222')
          //   // res && (formRef.value.xbFormRef.formData = []);
          //   // console.log(formRef.value.xbFormRef, 'formRef.value.xbFormRef')
          //   for (let key in formData) {
          //     formData[key] = res[key];
          //   }
          //   // 赋值 id
          //   const idKey = config.edit.idKey;
          //   const idValueKey = config.edit.idValueKey;
          //   idKey && (formData[idKey] = type == 'copy' ? '' : res[idValueKey]);
          //   console.log(formData, 'formData')

          // })
        }
        // } else {

        // }

        // 遍历赋值
        for (let key in formData) {
          formData[key] = data[key];
        }
        // 赋值 id
        const idKey = config.edit.idKey;
        const idValueKey = config.edit.idValueKey;
        idKey && (formData[idKey] = type == 'copy' ? '' : data[idValueKey]);

      })

    }
  }
  // 复制
  const handleCopy = async (data) => {
    handleEdit(data, 'copy')
  }
  return {
    requestParams,
    tableRef,
    formRef,
    formType,
    fromPageShow,
    handleSearchValChange,
    handleAdd,
    handleEdit,
    handleFormSubmit,
    handleCancel,
    handleCopy
  }
}
export default useTable