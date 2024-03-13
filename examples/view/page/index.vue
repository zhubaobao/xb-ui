<template>
  <xb-curd-table
    ref="curdTable"
    :tableConfig="tableConfig"
    :formConfig="formConfig"
    :searchConfig="searchConfig"
  >
    <!-- 表头 -->
    <!-- <template #nameHeader> 222 </template> -->
    <!-- 表格内容 -->
    <template #photoUrls="{ scope }">
      <el-image
        style="width: 40px; height: 40px"
        :src="scope.row.photoUrls"
        fit="cover"
      ></el-image>
    </template>
    <template #tags="{ scope }">
      <el-tag v-for="item in scope.row.tags" :key="item.id">{{
        item.name
      }}</el-tag>
    </template>
    <!-- 自定义表单 -->
    <!-- <template #detailsXbF="{formData}">
      <el-input v-model="formData.details"></el-input>
    </template>

     <template #XbInputXbF="{formData}">
      <el-input v-model="formData.XbInput"></el-input>
    </template> -->

    <template #inputAppendXbF>
      <span>44444</span>
    </template>

    <!-- <template #aniextraXbF>
      <span><el-button text>22</el-button></span>
    </template> -->
  </xb-curd-table>
</template>

<script setup>
import useTable from "./use/useTable";
import useSearch from "./use/useSearch";
import useForm from "./use/useForm";
import { ref } from "vue";

const c = ref(false);
const a = {
  b: {
    c,
  },
};
setTimeout(() => {
  c.value = true;
}, 6000);
const d = ref(a.b.c);
const { tableApi, tableConfig } = useTable();
const { searchConfig } = useSearch();
const { formConfig } = useForm();
const curdTable = ref(null);
</script>
