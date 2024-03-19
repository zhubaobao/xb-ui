<template>
  <div style="height: 100%" v-show="!fromPageShow">
    <el-container class="xb-curd-table">
      <!-- 列表搜索 -->
      <xb-search
        v-if="searchConfig && searchConfig.formItems.length > 0"
        :searchConfig="searchConfig"
        @change="handleSearchValChange"
      >
      </xb-search>

      <!-- 列表 -->
      <xb-table
        ref="tableRef"
        :tableConfig="tableConfig"
        :requestParams="requestParams"
        :name="name"
        @add="handleAdd"
        @edit="handleEdit"
        @copy="handleCopy"
      >
        <template
          v-for="(item, key, index) in tableSlots"
          :key="index"
          #[`${key}`]="slotScope"
        >
          <slot :name="key" v-bind="slotScope" :tableRef="tableRef"></slot>
        </template>
      </xb-table>
    </el-container>
  </div>
  <xb-submit
    ref="formRef"
    :form-config="formConfig"
    @submit="handleFormSubmit"
    @cancel="handleCancel"
    :type="formType"
    :name="name"
  >
    <template #formBotton="slotScope">
      <slot name="formBotton" v-bind="slotScope" :tableRef="tableRef"></slot>
    </template>
  </xb-submit>
</template>
<script >
import { defineComponent } from "vue";
import XbSearch from "../../search/src/main.vue";
import XbSubmit from "../../submit/src/main.vue";
import XbTable from "../../table/src/main.vue";
import XbFormPage from "../../formPage/src/main.vue";
import useSlots from "./use/useSlots";
import useTable from "./use/useTable";
export default defineComponent({
  name: "XbCurdTable",
  components: {
    XbSearch,
    XbSubmit,
    XbTable,
    XbFormPage,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    // 表格配置
    tableConfig: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    // 搜索配置
    searchConfig: {
      type: Object,
      default: () => ({
        formItems: [],
      }),
    },
    // 表单配置
    formConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const { tableSlots } = useSlots(slots);
    const {
      requestParams,
      formRef,
      tableRef,
      formType,
      fromPageShow,
      handleSearchValChange,
      handleFormSubmit,
      handleAdd,
      handleEdit,
      handleCancel,
      handleCopy,
    } = useTable(props);

    return {
      requestParams,
      tableRef,
      formRef,
      formType,
      fromPageShow,
      handleFormSubmit,
      handleSearchValChange,
      handleAdd,
      handleEdit,
      handleCancel,
      handleCopy,
      // slots
      tableSlots,
    };
  },
});
</script>


<style lang="less" scope>
.xb-curd-table {
  height: 100%;
  flex-direction: column;
}
</style>
