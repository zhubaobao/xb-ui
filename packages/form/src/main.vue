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
    <template v-for="item in formItems" :key="item.propName">
      <!-- text 可以用于布局/标题 -->
      <div
        v-if="item.type === 'text'"
        class="el-col xb-form-text"
        :class="[
          ...getClassesFn(item.layout || config.layout || { span: 24 }),
          item.formItemClass,
        ]"
        :style="item.style"
      >
        <span> {{ item.label }}</span>
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
        <slot v-if="item.type === 'template'" :name="`${item.propName}${slotSuffix}`" :formData="formData"></slot>
        <template v-else>
          <!-- 时间范围，formData 2 字段接受 -->
          <xb-form-item
            v-if="item.startPropName && item.endPropName"
            :formItem="item"
            :formData="formData"
            v-model:startValue="formData[item.startPropName]"
            v-model:endValue="formData[item.endPropName]"
            :slotSuffix="slotSuffix"
          >
          </xb-form-item>
          <xb-form-item
            v-else
            :formItem="item"
            :formData="formData"
            v-model="formData[item.propName]"
            :slotSuffix="slotSuffix"
          >
          </xb-form-item>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

    <script>
import useInit from "./use/useInit";
import useLink from "./use/useLink";
import XbFormItem from "packages/formItem/src/main.vue";
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
    slotSuffix: {
      type: String,
      default: 'XbF' // 默认是 form 提交
    }
  },
  setup(props) {
    const { formData, handleEventChange, formRef, formDataInit } = useInit(props);
    const { formItems, showProp } = useLink(props, formData);

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
      formDataInit,
      handleEventChange,
      getClassesFn,
      formItems,
      showProp
    };
  },
};
</script>
<style lang="less" scoped>
.xb-form-text {
  padding: 30px 10px;
  font-size: 14px;
  font-weight: bold;
}
</style>
