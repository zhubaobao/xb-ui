<template>
  <div style="width: 100%">
    <component
      :is="formItem.type"
      :configData="formItem"
      :disabled="formItem.disabled"
      v-bind="$attrs"
    >
    </component>
    <template v-for="(item, index) in extraSlots" :key="index">
      <slot v-if="item.slot" :name="`${formItem.propName}-extra${slotSuffix}`"></slot>
      <div class="xb-form-extra" v-else>{{ item.con }}</div>
    </template>
  </div>
</template>
<script>
import { defineComponent, getCurrentInstance } from "vue";
import { getSlots } from "main/utils";
// component
import XbInput from "../cpmponents/input";
import XbSelect from "../cpmponents/select";
import XbSwitch from "../cpmponents/switch";
import XbTimePicker from "../cpmponents/timePicker";
import XbTimeSelect from "../cpmponents/timeSelect";
import XbDatePicker from "../cpmponents/datePicker";
import XbRadio from "../cpmponents/radio";
import XbUpload from "../cpmponents/upload";
export default defineComponent({
  name: "XbFormItem",
  components: {
    XbInput,
    XbSelect,
    XbSwitch,
    XbTimePicker,
    XbTimeSelect,
    XbDatePicker,
    XbUpload,
    XbRadio,
  },
  props: {
    formItem: {
      type: Object,
      default: () => ({}),
    },
    slotSuffix: {
      type: String,
      default: 'XbS'
    }
  },
  setup(props) {
    const { slotSuffix, formItem } = props;
    const {  propName, extra } = formItem;
    // 获取当前实例
    const currentInstance = getCurrentInstance();
    // 获取插槽内容
    const  extraSlots = getSlots(
        currentInstance,
        ['extra'],
        extra ?{ extra: extra } : null,
        `${propName}-`,
        slotSuffix
      );
    return {
      extraSlots,
    };
  },
});
</script>
<style lang="less" scoped>
.xb-form-extra {
  font-size: 12.5px;
  width: 100%;
  padding-top: 6px;
  min-height: 20px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 1.5;
}
</style>

