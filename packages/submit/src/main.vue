<template>
  <el-drawer
    v-if="config.popupType === 'drawer'"
    class="xb-drawer-form"
    v-bind="config.drawerAttrs"
    v-model="drawerShow"
    :title="config[type].title"
    @closed="handleCancel"
    @open="handleOpen"
    :zIndex="999"
  >
    <el-form
      ref="formRef"
      v-bind="config.formAttrs"
      :rules="rules"
      class="xb-submit-form"
      :disabled="submitStatus"
      :model="formData"
      @submit.prevent
    >
      <template v-for="item in config.formItems" :key="item.propName">
        <div v-if="item.type === 'text'" class="xb-form-item-tie">
          {{ item.label }}
        </div>
        <el-form-item
          :label="item.label ? item.label + '：' : ''"
          :prop="item.propName"
          v-bind="item.formItemPropAttrs"
          v-else
        >
          <template v-if="item.type === 'template'">
            <slot :name="`${item.propName}Form`" :formData="formData"></slot>
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
    <div class="xb-drawer-form__footer">
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
  </el-drawer>
  <el-dialog
    v-if="config.popupType === 'dialog'"
    class="xb-drawer-form"
    v-bind="config.drawerAttrs"
    v-model="drawerShow"
    :title="config[type].title"
    @closed="handleCancel"
    @open="handleOpen"
    :zIndex="999"
  >
    <el-form
      ref="formRef"
      v-bind="config.formAttrs"
      :rules="rules"
      class="xb-submit-form"
      :disabled="submitStatus"
      :model="formData"
      @submit.prevent
    >
      <template v-for="item in config.formItems" :key="item.propName">
        <div v-if="item.type === 'text'" class="xb-form-item-tie">
          {{ item.label }}
        </div>
        <el-form-item
          :label="item.label ? item.label + '：' : ''"
          :prop="item.propName"
          v-bind="item.formItemPropAttrs"
          v-else
        >
          <template v-if="item.type === 'template'">
            <slot :name="`${item.propName}Form`" :formData="formData"></slot>
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
    <div class="xb-drawer-form__footer">
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
  </el-dialog>
</template>
<script>
import { defineComponent } from "vue";
import XbFormItem from "main/components/formItem";
import useMergeConfig from "./use/useMergeConfig";
import useSubmit from "./use/useSubmit";
// icons
import XbIconLoading from "main/icons/loading";
import XbIconCheck from "main/icons/check";
import XbIconClose from "main/icons/close";
export default defineComponent({
  name: "XbSubmit",
  components: {
    XbFormItem,
    XbIconLoading,
    XbIconCheck,
    XbIconClose,
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
      drawerShow,
      submitStatus,
      formData,
      formRef,
      handleEventChange,
      handleSubmit,
      handleCancel,
      handleOpen,
    } = useSubmit(props, ctx, config);
    return {
      config,
      rules,
      drawerShow,
      submitStatus,
      formData,
      formRef,
      handleEventChange,
      handleSubmit,
      handleCancel,
      handleOpen,
    };
  },
});
</script>
<style lang="less" scope>
.xb-form-item-tie {
  padding: 20px 0;
  font-weight: bold;
}

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
.xb-drawer-form {
  .el-drawer__body {
    margin-bottom: 60px;
    padding: 0 20px 20px;
  }
  .el-dialog__body {
    padding: 0 20px 80px;
    max-height: 80vh;
    overflow: auto;
    .xb-drawer-form__footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
