<template>
  <component
    class="xb-drawer-form"
    v-bind="config.popupAttrs"
    destroy-on-close
    v-model="popupShow"
    :title="config[type].title"
    @closed="handleCancel"
    @open="handleOpen"
    :size="config.width || 600"
    :width="config.width || 800"
    :is="
      config.popupType === 'drawer'
        ? 'ElDrawer'
        : config.popupType === 'page'
        ? 'XbFormPage'
        : 'ElDialog'
    "
  >
    <xb-form
      :config="config"
      :rules="rules"
      slotSuffix="XbF"
      :submitStatus="submitStatus"
      ref="xbFormRef"
    >
      <template #headContent><slot name="headContent"></slot></template>
    </xb-form>
    <div
      class="xb-drawer-form__footer"
      :class="{
        'xb-dialog-form__footer': config.popupType == 'dialog',
        'xb-page-form__footer': config.popupType == 'page',
      }"
    >
      <slot
        name="formBotton"
        :xbFormRef="xbFormRef"
        :changePopupStatus="changePopupStatus"
        :changeSubmitStatus="changeSubmitStatus"
        :submit="handleSubmit"
      ></slot>
      <!-- 保存 -->
      <el-button
        type="primary"
        :disabled="submitStatus"
        @click="handleSave(config.save)"
        v-if="hasBtnShow(config.footerConfig.saveBtnShow, { type, xbFormRef })"
      >
        <template #icon>
          <el-icon v-if="submitStatus"
            ><component :is="'xb-icon-loading'"
          /></el-icon>
          <el-icon v-else><component :is="'xb-icon-save'" /></el-icon>
        </template>
        {{ config.footerConfig.saveBtnTitle }}
      </el-button>
      <!-- 提交 -->
      <el-button
        type="primary"
        :disabled="submitStatus"
        @click="handleSubmit(config[type])"
        v-if="hasBtnShow(config.footerConfig.submitBtnShow, { type, xbFormRef })"
      >
        <template #icon>
          <el-icon v-if="submitStatus"
            ><component :is="'xb-icon-loading'"
          /></el-icon>
          <el-icon v-else><component :is="'xb-icon-check'" /></el-icon>
        </template>
        {{ config.footerConfig.submitBtnTitle }}
      </el-button>
      <!-- 取消 -->
      <el-button
        :disabled="submitStatus"
        @click="handleCancel"
        v-if="hasBtnShow(config.footerConfig.cancelBtnShow, { type, xbFormRef })"
      >
        <template #icon>
          <el-icon><component :is="'xb-icon-close'" /></el-icon>
        </template>
        {{ config.footerConfig.cancelBtnTitle }}
      </el-button>
    </div>
  </component>
</template>
<script>
import { defineComponent } from "vue";
// 组件
import XbForm from "../../form/src/main.vue";
import XbFormPage from "../../formPage/src/main.vue";
// tool
import { hasBtnShow } from "main/utils";
// use
import useMergeConfig from "./use/useMergeConfig";
import useSubmit from "./use/useSubmit";
// icons
import XbIconLoading from "main/icons/loading";
import XbIconCheck from "main/icons/check";
import XbIconClose from "main/icons/close";
import XbIconSave from "main/icons/save";

export default defineComponent({
  name: "XbSubmit",
  components: {
    XbIconLoading,
    XbIconCheck,
    XbIconSave,
    XbIconClose,
    XbForm,
    XbFormPage,
  },
  props: {
    isPage: {
      type: Boolean,
      default: false,
    },
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
  emits: ["submit", "cancel"],
  setup(props, ctx) {
    const { config, rules } = useMergeConfig(props);
    const {
      popupShow,
      submitStatus,
      xbFormRef,
      handleSubmit,
      handleCancel,
      handleOpen,
      handleSave,
      changePopupStatus,
      changeSubmitStatus,
    } = useSubmit(props, ctx, config);

    return {
      slots: ctx.slots,
      config,
      rules,
      popupShow,
      submitStatus,
      xbFormRef,
      handleSubmit,
      handleSave,
      handleCancel,
      handleOpen,
      changePopupStatus,
      changeSubmitStatus,
      hasBtnShow,
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
  padding: 0 15px;
  height: 60px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 99;
}
.xb-dialog-form__footer {
  flex-direction: row-reverse;
  justify-content: flex-start;
  .el-button {
    margin-left: 12px;
  }
}
.xb-page-form__footer {
  justify-content: flex-start;
}
.xb-drawer-form {
  .el-drawer__body {
    margin-bottom: 60px;
    padding: 0 20px;
  }
  .el-dialog__body {
    padding: 0 20px 80px;
    max-height: 80vh;
    overflow: auto;
  }
}
</style>
