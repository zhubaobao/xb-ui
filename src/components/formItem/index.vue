<template>
  <component
    :is="formItem.type"
    :configData="formItem"
    v-bind="$attrs"
  ></component>
</template>
<script>
import { defineComponent } from "vue";
import XbInput from "./input";
import XbSelect from "./select";
import XbSwitch from "./switch";
import XbTimePicker from "./timePicker";
import XbTimeSelect from "./timeSelect";
import XbDatePicker from "./datePicker";
import XbUpload from "./upload";
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
  },
  props: {
    formItem: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {},
});
</script>

