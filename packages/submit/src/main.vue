<template>
  <component
    class="xb-drawer-form"
    v-bind="config.popupAttrs"
    v-model="popupShow"
    :title="config[type].title"
    @closed="handleCancel"
    @open="handleOpen"
    :size="config.width || 600"
    :width="config.width || 800"
    :zIndex="999"
    :is="config.popupType === 'drawer' ? 'ElDrawer' : 'ElDialog'"
  >
    <xb-form
      :config="config"
      :rules="rules"
      :submitStatus="submitStatus"
      ref="xbFormRef"
    >
      <template
        v-for="(item, key, index) in slots"
        :key="index"
        #[`${key}`]="slotScope"
      >
        <slot :name="key" v-bind="slotScope"></slot>
      </template>
    </xb-form>
    <div
      class="xb-drawer-form__footer"
      :class="{ 'xb-dialog-form__footer': config.popupType === 'dialog' }"
    >
      <el-button type="primary" :disabled="submitStatus" @click="handleSubmit">
        <template #icon>
          <el-icon v-if="submitStatus"
            ><component :is="'xb-icon-loading'"
          /></el-icon>
          <el-icon v-else><component :is="'xb-icon-check'" /></el-icon>
        </template>
        提交
      </el-button>
      <el-button :disabled="submitStatus" @click="handleCancel">
        <template #icon>
          <el-icon><component :is="'xb-icon-close'" /></el-icon>
        </template>
        取消
      </el-button>
    </div>
  </component>
</template>
<script>
import { computed, defineComponent } from "vue";
import XbFormItem from "main/components/formItem";
import useMergeConfig from "./use/useMergeConfig";
import useSubmit from "./use/useSubmit";
// icons
import XbIconLoading from "main/icons/loading";
import XbIconCheck from "main/icons/check";
import XbIconClose from "main/icons/close";
// 组件
import XbForm from "../../form/src/main.vue";
export default defineComponent({
  name: "XbSubmit",
  components: {
    XbFormItem,
    XbIconLoading,
    XbIconCheck,
    XbIconClose,
    XbForm,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    formConfig: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: "add",
    },
    editParams: {
      // 编辑参数
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["submit"],
  setup(props, ctx) {
    const { config, rules } = useMergeConfig(props);
    const {
      popupShow,
      submitStatus,
      xbFormRef,
      handleSubmit,
      handleCancel,
      handleOpen,
    } = useSubmit(props, ctx, config);

    return {
      slots: ctx.slots,
      config,
      rules,
      popupShow,
      submitStatus,
      xbFormRef,
      handleSubmit,
      handleCancel,
      handleOpen,
    };
  },
});
</script>
<style lang="less" scope>
.xb-drawer-form__footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #e6e6e6;
  padding: 13px 15px;
  background-color: #fff;
  box-sizing: border-box;
}
.xb-drawer-form__footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.xb-dialog-form__footer {
  flex-direction: row-reverse;
  justify-content: flex-start;
  .el-button {
    margin-left: 12px;
  }
}
.xb-drawer-form {
  .el-drawer__body {
    margin-bottom: 60px;
    padding: 0 20px 20px;
  }
  .el-dialog__body {
    padding: 0 20px 80px;
    max-height: 80vh;
    overflow: auto;
  }
}
</style>
