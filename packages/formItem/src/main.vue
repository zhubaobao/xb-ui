<template>
  <div class="el-col" :class="getClassesFn(formItem.layout || layout)">
    <!-- text 可以用于布局/标题 -->
    <div
      v-if="formItem.type === 'text'"
      class="xb-form-text"
      :class="[formItem.formItemClass]"
      :style="formItem.style"
    >
      <span> {{ formItem.label }}</span>
    </div>

    <el-form-item
      style="padding-right: 10px; padding-left: 10px"
      :label="getLabel(formItem.label)"
      :prop="formItemProp"
      v-bind="formItem.formItemPropAttrs"
      v-else
    >
      <div
        class="xb-form-item-content"
        :class="{
          'el-input-group--append': formItem.slots && formItem.slots.append,
          'el-input-group--prepend': formItem.slots && formItem.slots.prepend,
        }"
      >
        <!-- 前缀内容 -->
        <template v-for="(item, index) in slotsMap.prepend" :key="index">
          <div class="el-input-group__prepend">
            <slot
              :name="`${parentProp}${formItem.propName}Prepend${slotSuffix}`"
              :formData="formData"
              >{{ item.con }}</slot
            >
          </div>
        </template>
        <!--自定义内容 -->
        <slot
          v-if="formItem.type == 'template'"
          :name="`${parentProp}${formItem.propName}${slotSuffix}`"
          :formData="formData"
          
        ></slot>
        <!-- 动态组件表单内容 -->
        <component
          v-else
          :is="formItem.type"
          :slotSuffix="slotSuffix"
          :configData="formItem"
          :formData="formData"
          :disabled="disabled"
          :parentProp="parentProp"
          v-model="formData[formItem.propName]"
          v-model:startValue="formData[formItem.startPropName]"
          v-model:endValue="formData[formItem.endPropName]"
          :style="{
            width: (formItem.propAttrs && formItem.propAttrs.width) || '100%',
          }"
          :placeholder="
            getPlaceholder(
              formItem.placeholder ||
                (formItem.propAttrs && formItem.propAttrs.placeholder)
            )
          "
        >
        </component>
        <!-- 后缀内容 -->
        <template v-for="(item, index) in slotsMap.append" :key="index">
          <div class="el-input-group__append">
            <slot
              :name="`${parentProp}${formItem.propName}Append${slotSuffix}`"
              :formData="formData"
              >{{ item.con }}</slot
            >
          </div>
        </template>
      </div>
      <!-- 表单下方提示文字 -->
      <template v-for="(item, index) in slotsMap.extra" :key="index">
        <slot
          v-if="item.slot"
          :name="`${parentProp}${formItem.propName}Extra${slotSuffix}`"
          :formData="formData"
        ></slot>
        <div class="xb-form-extra" v-else>{{ item.con }}</div>
      </template>
    </el-form-item>
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
import XbUpload from "packages/upload/src/main";
import XbFormJson from "../cpmponents/formJson";
import XbInputNumber from "../cpmponents/inputNumber";
import XbCheckbox from "../cpmponents/checkbox";
// use
import useLink from "./use/useLink";

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
    XbFormJson,
    XbInputNumber,
    XbCheckbox,
  },
  props: {
    formItem: {
      type: Object,
      default: () => ({}),
    },
    slotSuffix: {
      type: String,
      default: "XbS",
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    layout: {
      type: Object,
      default: () => ({ span: 24 }),
    },
    parentProp: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { slotSuffix, formItem } = props;
    const { propName } = formItem;
    const { disabled } = useLink(props);
    // 获取当前实例
    const currentInstance = getCurrentInstance();
    // 获取插槽内容
    const slotsMap = getSlots(
      currentInstance,
      ["extra", "prepend", "append", "default"],
      formItem,
      `${propName}`,
      slotSuffix
    );
    // 获取组件 label
    const getLabel = (label) => {
      if (label) {
        return (
          (typeof label === "function" ? label(props.formData) : label) + "："
        );
      }
      return "";
    };
    // 获取组件 placeholder
    const getPlaceholder = (placeholder) => {
      if (placeholder) {
        return typeof placeholder === "function"
          ? placeholder(props.formData)
          : placeholder;
      }
      return "";
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
    // 初始化 表单 prop
    const isRang = formItem.propName && formItem.propName.includes("-");
    const formItemProp =
      formItem.prop ||
      props.parentProp +
        (isRang ? formItem.propName.split("-")[0] : formItem.propName);

    return {
      getClassesFn,
      getLabel,
      getPlaceholder,
      slotsMap,
      formItemProp,
      disabled,
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

.xb-form-item-content {
  display: flex;
  width: 100%;
  &.el-input-group--append {
    &:deep(.el-input__wrapper) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &.el-input-group--prepend {
    &:deep(.el-input__wrapper) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
.el-input-group__append,
.el-input-group__prepend {
  padding: 0 11px;
  border-radius: var(--el-border-radius-base);
}
.el-input-group__append {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: 0 1px 0 0 var(--el-border-color) inset,
    0 -1px 0 0 var(--el-border-color) inset,
    -1px 0 0 0 var(--el-border-color) inset;
}
.el-input-group__prepend {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 1px 0 0 0 var(--el-border-color) inset,
    0 1px 0 0 var(--el-border-color) inset,
    0 -1px 0 0 var(--el-border-color) inset;
}
.xb-form-text {
  font-size: 13px;
  max-width: 100%;
  flex: 0 0 100%;
  display: table;
  white-space: nowrap;
  text-align: center;
  margin: 10px 0 30px;
  &::before,
  &::after {
    content: "";
    border-top: 1px solid #e8e8e8;
    display: table-cell;
    transform: translateY(50%);
    position: relative;
    top: 50%;
  }

  &::before {
    width: 3.8%;
  }

  &::after {
    width: 96.2%;
  }

  span {
    padding: 0 10px;
    font-weight: bold;
  }
}
</style>

