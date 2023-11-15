<template>
  <el-form
    ref="formRef"
    v-bind="config.formAttrs"
    :rules="rules"
    class="xb-submit-form el-row"
    :disabled="submitStatus"
    :model="formData"
    :inline="false"
    @submit.prevent
    style="margin-left: -10px; margin-right: -10px"
  >
    <template v-for="item in config.formItems" :key="item.propName">
      <!-- text 可以用于布局/标题 -->
      <div
        v-if="item.type === 'text'"
        class="el-col"
        :class="getClassesFn(item.layout || config.layout || { span: 24 })"
        style="padding-right: 10px; padding-left: 10px"
      >
        {{ item.label }}
      </div>
      <el-form-item
        style="padding-right: 10px; padding-left: 10px"
        class="el-col"
        :class="getClassesFn(item.layout || config.layout || { span: 24 })"
        :label="item.label ? item.label + '：' : ''"
        :prop="item.propName"
        v-bind="item.formItemPropAttrs"
        v-else
      >
        <template v-if="item.type === 'template'">
          <slot :name="`${item.propName}XbS`" :formData="formData"></slot>
          <slot :name="`${item.propName}XbF`" :formData="formData"></slot>
        </template>
        <xb-form-item
          v-else
          :formItem="item"
          :formData="formData"
          @eventChange="handleEventChange"
        >
        </xb-form-item>
      </el-form-item>
    </template>
  </el-form>
</template>

    <script>
import { nextTick, onMounted, ref } from "vue";
import XbFormItem from "main/components/formItem";
export default {
  name: "XbForm",
  components: {
    XbFormItem,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    submitStatus: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const formRef = ref(null);
    // 表单的值
    const formData = ref({});
    // 表单值初始化
    const formDataInit = () => {
      props.config.formItems.forEach((item) => {
        if (item.type === "text") return;
        // 处理时间范围，后台需要2个字段的情况
        if (item.propName && item.propName.includes("-")) {
          const defaultValue = item.defaultValue || [];
          item.propName.split("-").forEach((key, index) => {
            formData.value[key] = defaultValue[index] || "";
          });
        } else {
          formData.value[item.propName] = item.defaultValue || "";
        }
      });
    };
    formDataInit();
    // from 表单值变化
    const handleEventChange = (data) => {
      formData.value = { ...formData.value, ...data };
    };
    // 栅格化 class
    const getClassesFn = (layout = {}) => {
      const classes = [];
      const sizes = ["span", "xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (size === "span") {
          layout.span && classes.push(`el-col-${layout.span}`);
        } else {
          layout[size] && classes.push(`el-col-${size}-${layout[size]}`);
        }
      });
      return classes;
    };
    return {
      formRef,
      formData,
      handleEventChange,
      formDataInit,
      getClassesFn,
    };
  },
};
</script>
