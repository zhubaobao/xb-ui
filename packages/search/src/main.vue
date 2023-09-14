<template>
  <div
    class="xb-search"
    v-if="searchConfig && searchConfig.formItems.length > 0"
  >
    <div class="xb-search-area">
      <el-form
        ref="searchForm"
        v-bind="searchConfig.formAttrs"
        label-width="100px"
        class="xb-search-form"
        :model="formData"
      >
        <div class="xb-search-form-item">
          <el-form-item
            v-for="item in config.formItems"
            :key="item.propName"
            :label="item.label + '：'"
            :prop="item.propName"
            v-bind="item.formItemPropAttrs"
          >
            <xb-form-item
              :formItem="item"
              :formData="formData"
              @eventChange="handleEventChange"
            >
            </xb-form-item>
          </el-form-item>
        </div>
        <div class="xb-btn-list">
          <el-button type="primary" @click="handleSearch">
            <template #icon>
              <el-icon><component :is="'xb-icon-search'" /></el-icon>
            </template>
            搜索
          </el-button>
          <el-button type="primary" @click="handleRefresh">
            <template #icon>
              <el-icon><component :is="'xb-icon-refresh'" /></el-icon>
            </template>
            重置</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script >
import { defineComponent } from "vue";
import XbFormItem from "main/components/formItem";
import useSearch from "./use/useSearch";
import useMergeConfig from "./use/useMergeConfig";
// icons
import XbIconRefresh from "main/icons/refresh";
import XbIconSearch from "main/icons/search";
export default defineComponent({
  name: "XbSearch",
  components: {
    XbFormItem,
    XbIconRefresh,
    XbIconSearch,
  },
  props: {
    searchConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["change"],
  setup(props, ctx) {
    const { config } = useMergeConfig(props);
    const { formData, handleEventChange, handleSearch, handleRefresh } =
      useSearch(props, ctx, config);
    return {
      config,
      formData,
      handleEventChange,
      handleSearch,
      handleRefresh,
    };
  },
});
</script>
<style lang="less" scoped>
.xb-search {
  margin-bottom: 10px;
  background: #fff;
  padding: 20px 20px 0 20px;
}
.xb-search-form {
  display: flex;
  justify-content: space-between;
}
.xb-search-form-item {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
</style>
