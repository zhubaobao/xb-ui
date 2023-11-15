import { nextTick, ref } from 'vue';
const useTable = (props) => {
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
    tableRef.value.getData();
  }
  // 添加
  const handleAdd = () => {
    formType.value = 'add'
    formRef.value && (formRef.value.popupShow = true)
    props.tableConfig.addCb && props.tableConfig.addCb()
  }
  // 编辑
  const handleEdit = async (data) => {
    if (formRef.value) {
      let { config } = formRef.value
      formRef.value.popupShow = true;
      formType.value = 'edit'
      // 处理编辑的数据
      nextTick(() => {
        const { formDataFormat: format, editCb } = props.tableConfig
        let formData = formRef.value.xbFormRef.formData;
        if (format) {
          new Promise((resolve) => {
            format(resolve, data, formData)
          }).then(res => {
            res && (formData = res)
          })
        } else {
          // 遍历赋值
          for (let key in formData) {
            formData[key] = data[key]
          }
          // 赋值 id
          const idKey = config.edit.idKey
          idKey && (formData[idKey] = data[idKey])
        }
        editCb && editCb(data)
      })

    }
  }
  return {
    requestParams,
    tableRef,
    formRef,
    formType,
    handleSearchValChange,
    handleAdd,
    handleEdit,
    handleFormSubmit
  }
}
export default useTable