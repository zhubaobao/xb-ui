<template>
  <div style="height: 100%">
    <el-container class="xb-curd-table">
      <!-- 列表搜索 -->
      <xb-search
        v-if="searchConfig && searchConfig.formItems.length > 0"
        :searchConfig="searchConfig"
        @change="handleSearchValChange"
      ></xb-search>

      <!-- 列表 -->
      <xb-table
        ref="tableRef"
        :tableConfig="tableConfig"
        :requestParams="requestParams"
        :name="name"
        @add="handleAdd"
        @edit="handleEdit"
      >
        <template
          v-for="(item, key, index) in slots"
          :key="index"
          #[`${key}`]="slotScope"
        >
          <slot :name="key" v-bind="slotScope"></slot>
        </template>
        <!-- 自定义内容表头 -->
        <!-- <template
          v-for="item in columnsHasHeaderList"
          :key="item.prop"
          #[`${item.prop}Header`]="{ scope }"
        >
          <slot :name="`${item.prop}Header`" :scope="scope"> </slot>
        </template> -->
        <!-- 自定义表格内容 -->
        <!-- <template
          v-for="item in columnsHasTemplateList"
          :key="item.prop"
          #[item.prop]="{ scope, refresh }"
        >
          <slot :name="item.prop" :scope="scope" :refresh="refresh"> </slot>
        </template> -->
        <!-- 自定义操作按钮 -->
        <!-- <template #tableOperations="{ data, refresh }">
          <slot
            name="tableOperations"
            :data="data"
            :refresh="refresh"
            :tableRef="tableRef"
          ></slot>
        </template> -->
        <!-- 自定义头部按钮 -->
        <!-- <template #headerOperations="{ refresh }">
          <slot
            name="headerOperations"
            :refresh="refresh"
            :tableRef="tableRef"
          ></slot
        ></template> -->

        <!-- 无数据 -->
        <!-- <template #empty>
          <slot name="empty" />
        </template> -->
      </xb-table>
    </el-container>
  </div>
  <!-- 编辑添加表单 -->
  <xb-submit
    ref="formRef"
    :form-config="formConfig"
    @submit="handleFormSubmit"
    :type="formType"
    :name="name"
  ></xb-submit>
</template>
<script >
import { defineComponent } from "vue";
import XbSearch from "../../search/src/main.vue";
import XbSubmit from "../../submit/src/main.vue";
import XbTable from "../../table/src/main.vue";
import useSlot from "./use/useSlot";
import useTable from "./use/useTable";
export default defineComponent({
  name: "XbCurdTable",
  components: {
    XbSearch,
    XbSubmit,
    XbTable,
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
    const {
      requestParams,
      formRef,
      tableRef,
      formType,
      handleSearchValChange,
      handleFormSubmit,
      handleAdd,
      handleEdit,
    } = useTable(props);

    const { columnsHasTemplateList, columnsHasHeaderList } = useSlot(props);

    return {
      requestParams,
      columnsHasTemplateList,
      columnsHasHeaderList,
      tableRef,
      formRef,
      formType,
      handleFormSubmit,
      handleSearchValChange,
      handleAdd,
      handleEdit,
      slots,
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
