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
  >
    <!-- tab 切换 -->
    <template v-if=" Array.isArray(config.tabs) && config.tabs.length">
      <el-tabs v-model="curTabName" style="width: 100%">
        <el-tab-pane v-for="(tab, index) in tabs" :key="tab.name" :label="tab.label" :name="`tab${index}`">
          <xb-form-item
            v-for="item in tab.formItems || []" 
            :key="item.propName"
            :layout="config.layout"
            :formItem="item"
            :formData="formData"
            :slotSuffix="slotSuffix"
          ></xb-form-item>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template  v-else>
      <xb-form-item
        v-for="item in formItems" 
        :key="item.propName"
        :layout="config.layout"
        :formItem="item"
        :formData="formData"
        :slotSuffix="slotSuffix"
      ></xb-form-item>
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
      default: "XbF", // 默认是 form 提交
    },
  },
  setup(props, ctx) {
    const { formData, formRef, formDataInit, curTabName, tabsFormItemKeys } = useInit(props, ctx);
    const { formItems, showProp, tabs } = useLink(props, formData);

    return {
      formRef,
      formData,
      formDataInit,
      formItems,
      tabs,
      showProp,
      curTabName,
      tabsFormItemKeys
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
.xb-submit-form{
  height: 100%;
  &:deep(.el-tabs){
    height: 100%;
  }
  &:deep(.el-tabs__header){
    margin: 0;
  }
  &:deep(.el-tabs__content){
    padding: 20px 0;
    height: calc(100% - 40px);
    box-sizing: border-box;
    overflow: scroll;
  }
}
</style>
