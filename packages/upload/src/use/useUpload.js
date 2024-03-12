import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue'
import { deepCopy } from "main/utils/index";

const useUpload = (props, ctx, config) => {
  // 当前文件
  const file = ref({})
  // 预览文件列表
  const previewList = ref([]);
  // 裁剪dom
  const cropRef = ref(null);
  // 初始化值
  const searchVal = ref([]);

  // 值处理
  const dealVal = (oldVal) => {

    let newVal = oldVal || [];
    const valueType = config.valueType;
    if (valueType !== 'object') {
      if (valueType === 'string') {
        newVal = oldVal ? oldVal.split(config.separator) : []
      }
      newVal = newVal.map(item => ({ image: item }))
    }

    return newVal
  }

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
      searchVal.value.push(res.data);

      handleLibSubmit(searchVal.value);
      // let val = searchVal.value;
      // if (config.valueType != 'object') {
      //   val = searchVal.value.map(item => item.image);
      //   if (config.valueType === 'string') {
      //     val = val.join(config.separator);
      //   }
      // }
      // ctx.emit("update:modelValue", val);
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
    // 返回值
    let val = searchVal.value;
    if (config.valueType != 'object') {
      val = searchVal.value.map(item => item.image);
      if (config.valueType === 'string') {
        val = val.join(config.separator);
      }
    }
    ctx.emit("update:modelValue", val);
  }
  watch(() => props.modelValue, (val) => {
    const initValue = dealVal(val);
    searchVal.value = initValue;
    previewList.value = deepCopy(initValue);
  })
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