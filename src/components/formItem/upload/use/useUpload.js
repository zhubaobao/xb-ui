import { ElMessage } from 'element-plus';
import { ref } from 'vue'

const useUpload = (props, ctx, config) => {
  // 当前文件
  const file = ref({})
  // 预览文件列表
  const previewList = ref([]);
  // 裁剪dom
  const cropRef = ref(null);
  // 初始化值
  const searchVal = ref([]);
  // 初始化值
  let initValue = props.formData[props.configData.propName]
  // 值处理
  const dealVal = (oldVal) => {
    let newVal = ''
    if (config.valueType === 'string') {
      newVal = oldVal ? oldVal.split(config.separator) : []
    }
    previewList.value = [...newVal];
    return newVal
  }
  searchVal.value = dealVal(initValue)


  // 上传请求
  const upLoadRequest = async (val) => {
    previewList.value.push(val);
    const { requestApi, responseFormat, paramsFormat, fileKey } = config;
    let params = {}
    if (paramsFormat) {
      params = paramsFormat(val)
    } else {
      const formData = new FormData()
      formData.set(fileKey, val)
      params = formData
    }
    if (!requestApi) return false
    let res = await requestApi(params);
    res = responseFormat(res)
    if (res.code === 1) {
      searchVal.value.push(res.src);
      const val = config.valueType === 'string' ? searchVal.value.join(config.separator) : searchVal.value;
      ctx.emit("eventChange", { [props.configData.propName]: val });
    } else {
      ElMessage.error(res.msg || '上传失败')
    }
  };
  // 上传回调
  const handleRequest = (param) => {
    file.value = param.file;
    if (props.hasCrop) {
      cropRef.value.cropperDialogIsShow = true;
    } else {
      upLoadRequest(param.file);
    }
  };
  // 删除文件
  const handleFileDelete = (index) => {
    searchVal.value.splice(index, 1);
    previewList.value.splice(index, 1);
  }
  // 拖拽结束
  const handleDragEnd = (event) => {
    const { newIndex, oldIndex } = event;
    if (newIndex == oldIndex) return false;
    const moveVal = searchVal.value.splice(oldIndex, 1)[0];
    searchVal.value.splice(newIndex, 0, moveVal);
  }
  // 图库文件选择确认
  const handleLibSubmit = (value) => {
    previewList.value.push(...value);
    searchVal.value.push(...value);
  }
  return {
    handleRequest,
    handleFileDelete,
    handleDragEnd,
    handleLibSubmit,
    searchVal,
    previewList,
  }
}
export default useUpload