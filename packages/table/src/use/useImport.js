import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const useImport = (config, refresh) => {
  // 上传加载
  const upLoading = ref(false)


  // 批量发货 
  const httpRequest = async (data) => {
    const { requestApi, responseFormat, paramsFormat, fileKey } = config.importConfig;
    if (requestApi == '') return;
    let params = {}
    if (paramsFormat) {
      params = paramsFormat(data)
    } else {
      const formData = new FormData()
      formData.set(fileKey, data.file)
      params = formData
    }
    upLoading.value = true
    let res = await requestApi(params)
    upLoading.value = false
    res = responseFormat(res)
    if (res.code === 1) {
      ElMessage.success('导入成功')
      refresh()
    } else {
      ElMessage.error(res.msg || '导入失败')
    }
  }
  return {

    httpRequest,
    upLoading
  }

}
export default useImport