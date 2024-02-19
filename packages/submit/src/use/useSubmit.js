import { ref } from 'vue';
import { ElMessage } from 'element-plus'
const useSubmit = (props, ctx, config) => {
  // 表单
  const xbFormRef = ref(null);

  // 弹窗是否显示
  const popupShow = ref(false);
  // 加载
  const submitStatus = ref(false);

  // 提交保存
  const handleSubmit = () => {
  
    const { formData, formRef, showProp } = xbFormRef.value
    formRef.validate(async (valied) => {
      if (valied) {
        const { paramsFormat, requestApi, responseFormat, submitCb } = config[props.type];
        submitStatus.value = true;
        let finalData = {...formData};
        for (let k in showProp) {
          !showProp[k] && finalData.hasOwnProperty(k)
            ? delete finalData[k]
            : "";
        }
        const params = paramsFormat(finalData);
        if (!requestApi) {
          submitCb && (
            new Promise((resolve) => {
              submitCb(resolve, params)
            }).then(res => {
              popupShow.value = false;
              submitStatus.value = false;
              ctx.emit("submit", props.type);
            })
          )
        } else {
          try {
            let res = await requestApi(params);
            res = responseFormat(res)
            if (res.code === 1) {
              popupShow.value = false;
              ctx.emit("submit", props.type);
              ElMessage.success(res.msg || '操作成功')
            } else {
              ElMessage.error(res.msg || '操作失败')
            }
          } catch (err) {
            console.log(err);
            ElMessage.error('操作失败')
          }
          submitStatus.value = false;
        }

      }
    });
  };
  // 关闭弹窗
  const handleCancel = () => {
    popupShow.value = false;
    // 清空
    xbFormRef.value.formDataInit();
  };
  const handleOpen = () => {
    const { formDataFormat: format, popupOpenCb } = config;
    if (format) {
      new Promise((resolve) => {
        format(resolve, xbFormRef.value.formData, props.type)
      }).then(res => {
        res && (xbFormRef.value.formData = res)
      })
    }
    popupOpenCb && popupOpenCb(props.type, xbFormRef.value.formData)
  }
  return {
    popupShow,
    submitStatus,
    xbFormRef,
    handleSubmit,
    handleCancel,
    handleOpen
  }
}

export default useSubmit