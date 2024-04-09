import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue'
import { deepCopy } from "main/utils/index";

const useUpload = (props, ctx, config) => {
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
    } else {
      const { url, name } = config.keysCustom;
      newVal = newVal.map(item => {
        item.image = item[url];
        item.name = item[name];
        return item;
      })
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
      const val = typeof res.data == 'string' ? { image: res.data } : res.data
      handleLibSubmit([val]);
    } else {
      ElMessage.error(res.msg || '上传失败')
    }
  };
  // 上传回调
  const handleRequest = (param) => {
    if (config.hasCrop) {
      cropRef.value.handleStartCrop(param.file);
    } else {
      upLoadRequest(param.file);
    }
  };
  // 裁剪回调
  const handleCropConfirm = (file) => {
    upLoadRequest(file)
  }
  // 删除文件
  const handleFileDelete = (index) => {
    searchVal.value.splice(index, 1);
    previewList.value.splice(index, 1);
    upDateVal();
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
    const { url, name } = config.keysCustom;
    const _value = value.map(item => {
      item.image = item[url];
      item.name = item[name];
      return item;
    })
    previewList.value.push(..._value);
    searchVal.value.push(..._value);
    upDateVal()
  }
  // 更新值
  const upDateVal = () => {
    let val = searchVal.value;
    if (config.valueType != 'object') {
      val = searchVal.value.map(item => item.image);
      if (config.valueType === 'string') {
        val = val.join(config.separator);
      }
    }
    ctx.emit("update:modelValue", val);
  }

  // 初始化
  const init = (val) => {
    const initValue = dealVal(val);
    searchVal.value = initValue;
    previewList.value = deepCopy(initValue);
  }
  init(props.modelValue)

  const unWatch = watch(() => props.modelValue, (val) => {
    init(val)
    unWatch();
  })

  return {
    handleRequest,
    handleFileDelete,
    handleDragEnd,
    handleLibSubmit,
    handleCropConfirm,
    searchVal,
    previewList,
    cropRef
  }
}
export default useUpload