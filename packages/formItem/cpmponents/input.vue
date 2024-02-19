<template>
  <el-input
  style="box-sizing: border-box; "
    :style="{
      width: (configData.propAttrs && configData.propAttrs.width) || '100%',
    }"
    class="xb-input"
    v-model="searchVal"
    v-bind="configData.propAttrs"
    @change="handleValueChange"
    :placeholder="
      configData.placeholder ||
      (configData.propAttrs && configData.propAttrs.placeholder) ||
      '请输入'
    "
  >
    <template
      v-for="(item, index) in inputSlots"
      :key="index"
      #[`${item.name}`]="slotScope"
    >
      <slot
        v-if="item.slot"
        :name="`${propName}-input-${item.name}${slotSuffix}`"
        v-bind="slotScope"
      ></slot>
      <span v-else>{{ item.con }}</span>
    </template>
  </el-input>
</template>
<script>
import { getSlots } from "main/utils";
import { defineComponent, getCurrentInstance } from "vue";
import useCommon from './use/useCommon';
export default defineComponent({
  name: "XbInput",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: String,
      default: ''
    },
    slotSuffix: {
      type: String,
      default: 'XbF'
    }
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    // 获取当前实例
    const currentInstance = getCurrentInstance();
    const { configData,slotSuffix  }  = props;
    const { propName, slots } = configData;
    // 获取插槽内容
    let inputSlots = getSlots(
      currentInstance,
      ['prepend', 'append'],
       slots,
      `${propName}-input-`,
      slotSuffix
    );
    // 通用
    const { searchVal, handleValueChange } = useCommon(props, ctx);
   
    return {
      searchVal,
      handleValueChange,
      inputSlots,
      propName,
    };
  },
});
</script>
<style lang="less" scoped>
/deep/ .el-input-group__append,
/deep/ .el-input-group__prepend {
  padding: 0 11px;
}
</style>
