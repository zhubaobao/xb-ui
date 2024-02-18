<template>
  <el-input
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
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
export default defineComponent({
  name: "XbInput",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    formData: {
      type: Object,
      default: () => {},
    },
    slotSuffix: {
      type: String,
      default: 'XbF'
    }
  },
  emits: ["eventChange"],
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
    // 值
    const searchVal = ref(props.formData[propName]);
    // 监听值的变化
    watch(
      () => props.formData[propName],
      (val) => {
        searchVal.value = val;
      }
    );
    const handleValueChange = (val) => {
      ctx.emit("eventChange", { [propName]: val });
    };
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
