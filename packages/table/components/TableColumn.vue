<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    v-bind="column.propAttrs"
    v-if="column.show !== false"
  >
    <!-- 自定义表头 -->
    <template v-if="column.showHeader" #header>
      <slot :name="`${column.prop}Header`"></slot>
    </template>

    <template #default="scope">
      <!-- 自定义模板  使用slot -->
      <template v-if="column.contentType === 'template'">
        <slot :name="`${column.prop}`" :scope="scope" > </slot>
      </template>
      <!-- 排序 -->
      <template v-else-if="column.contentType === 'sort'">
        <el-input
          v-model="scope.row[column.prop]"
          placeholder="请输入排序"
          @focus="handleSortFocus(scope.row, column)"
          @blur="handleSortBlur(scope.row, column)"
        ></el-input>
      </template>
      <!-- 正常渲染数据列 -->
      <template v-else>
        {{ scope.row[item.prop] }}{{ item.showHeader }}
      </template>
    </template>
  </el-table-column>
</template>
<script>
import { defineComponent } from "vue";
import useSort from "./use/useSort";
export default defineComponent({
  name: "TableColumn",
  props: {
    column: {
      type: Object,
      default: () => ({}),
    },
    refresh: {
      type: Function,
      default: () => {}
    },
  },
  setup() {
    const { handleSortFocus, handleSortBlur } = useSort(getData);
    return {
      handleSortFocus,
      handleSortBlur
    }
  },
});
</script>
