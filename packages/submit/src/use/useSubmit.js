import { ref } from 'vue';
import { deepCopy } from 'main/utils'
import { ElMessage } from 'element-plus'
const useSubmit = (props, ctx, config) => {
  // 表单
  const formRef = ref(null);

  // 初始化 data 数据
  const initFormData = {};
  config.formItems.forEach((item) => {
    if (item.type !== 'text') {
      initFormData[item.propName] = item.defaultValue || '';
    }
  });

  // 弹窗是否显示
  const drawerShow = ref(false);
  // 加载
  const submitStatus = ref(false);
  // formData
  const formData = ref(deepCopy(initFormData));
  // from 表单值变化
  const handleEventChange = (data) => {
    formData.value = { ...formData.value, ...data };
  };
  // 提交保存
  const handleSubmit = () => {
    formRef.value.validate(async (valied) => {
      if (valied) {
        const { paramsFormat, requestApi, responseFormat, submitCb } = config[props.type];
        submitStatus.value = true;
        const params = paramsFormat(formData.value);
        if (!requestApi) {
          submitCb && (
            new Promise((resolve) => {
              submitCb(resolve, params)
            }).then(res => {
              drawerShow.value = false;
              submitStatus.value = false;
              ctx.emit("submit", props.type);
            })
          )
        } else {
          try {
            let res = await requestApi(params);
            res = responseFormat(res)
            if (res.code === 1) {
              drawerShow.value = false;
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
    drawerShow.value = false;
    formData.value = deepCopy(initFormData);
  };
  const handleOpen = () => {
    const format = config.formDataFormat;
    if (format) {
      new Promise((resolve) => {
        format(resolve, formData.value)
      }).then(res => {
        res && (formData.value = res)
      })
    }
  }
  return {
    drawerShow,
    submitStatus,
    formData,
    formRef,
    handleEventChange,
    handleSubmit,
    handleCancel,
    handleOpen
  }
}

export default useSubmit