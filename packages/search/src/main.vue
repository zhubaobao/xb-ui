<template>
  <div
    class="xb-search"
    v-if="searchConfig && searchConfig.formItems.length > 0"
  >
    <xb-form :config="config" ref="xbFormRef" style="flex: 1">
      <template
        v-for="(item, key, index) in slots"
        :key="index"
        #[`${key}`]="slotScope"
      >
        <slot :name="key" v-bind="slotScope"></slot>
      </template>
    </xb-form>
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
  </div>
</template>
<script >
import XbForm from "../../form/src/main.vue";
import { defineComponent } from "vue";
import useSearch from "./use/useSearch";
import useMergeConfig from "./use/useMergeConfig";
// icons
import XbIconRefresh from "main/icons/refresh";
import XbIconSearch from "main/icons/search";
export default defineComponent({
  name: "XbSearch",
  components: {
    XbIconRefresh,
    XbIconSearch,
    XbForm,
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
    const { handleSearch, handleRefresh, xbFormRef } = useSearch(
      props,
      ctx,
      config
    );
    return {
      slots: ctx.slots,
      config,
      xbFormRef,
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
  display: flex;
  justify-content: space-between;
}

.xb-btn-list {
  flex-shrink: 0;
  margin-left: 80px;
}
</style>
