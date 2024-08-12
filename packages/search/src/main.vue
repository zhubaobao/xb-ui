<template>
  <div class="xb-search-wrap" v-if="searchConfig && searchConfig.formItems.length > 0">
    <div class="xb-search" :style="{ height: searchConfig.hasExpand ? height : 'auto'}">
      <xb-form :config="config" ref="xbFormRef" slotSuffix="XbS" style="flex: 1">
        <template v-for="(_, key, index) in slots" :key="index" #[`${key}`]="slotScope">
          <slot :name="key" v-bind="slotScope"></slot>
        </template>
      </xb-form>
      <div class="xb-btn-list">
        <el-button type="primary" @click="handleSearch">
          <template #icon>
            <el-icon>
              <component :is="'xb-icon-search'" />
            </el-icon>
          </template>
          搜索
        </el-button>
        <el-button type="primary" plain @click="handleRefresh">
          <template #icon>
            <el-icon>
              <component :is="'xb-icon-refresh'" />
            </el-icon>
          </template>
          重置</el-button>
      </div>
    </div>
    
    <el-button 
      v-if="hasExpand && searchConfig.hasExpand" 
      class="xb-btn-expand" 
      link 
      type="primary" 
      @click="handleExpand"
    >
    <template #icon>
      <el-icon>
        <component :is=" height == 'auto' ? 'xb-icon-arrow-up' : 'xb-icon-arrow-down'" />
      </el-icon>
     </template>
      {{ height == 'auto' ? '收起' :'展开' }}
    </el-button>
  </div>
</template>
<script>
import XbForm from "../../form/src/main.vue";
import { defineComponent, onMounted } from "vue";
import useSearch from "./use/useSearch";
import useMergeConfig from "./use/useMergeConfig";
// icons
import XbIconRefresh from "main/icons/refresh";
import XbIconSearch from "main/icons/search";
import XbIconArrowUp from "main/icons/arrowUp";
import XbIconArrowDown from "main/icons/arrowDown";
import { ref } from "vue";
export default defineComponent({
  name: "XbSearch",
  components: {
    XbIconRefresh,
    XbIconSearch,
    XbIconArrowUp,
    XbIconArrowDown,
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
    const hasExpand = ref(false);
    let initHeight = 0;
    const height = ref('auto');
    const handleExpand = () => {
      height.value = height.value === 'auto' ? initHeight : 'auto';
    }

    onMounted(() => {
      const xbFormEl = xbFormRef.value.$el; // 获取form表单元素
      const xbFormItemEls = xbFormEl.children; // 获取form表单子元素
      if (xbFormItemEls && xbFormItemEls.length > 0) {
        const formItemsElH = xbFormItemEls[0].offsetHeight; // 获取form表单高度
        const xbFormElH = xbFormEl.offsetHeight;// 获取form表单子元素的高度
        hasExpand.value = xbFormElH > formItemsElH; // 判断是否需要展开
        initHeight =  formItemsElH + 20 + 'px';
        height.value = formItemsElH + 20 + 'px';
      }
    })
    return {
      slots: ctx.slots,
      config,
      xbFormRef,
      handleSearch,
      handleRefresh,
      height,
      handleExpand,
      hasExpand
    };
  },
});
</script>
<style lang="less" scoped>
.xb-search-wrap {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;

}
.xb-search {
  padding: 20px 20px 0 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}

.xb-btn-list {
  flex-shrink: 0;
  margin-left: 20px;
}

</style>
