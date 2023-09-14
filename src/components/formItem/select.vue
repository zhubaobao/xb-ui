<template>
  <el-tree-select
    v-if="configData.selectType === 'tree'"
    v-bind="configData.propAttrs"
    v-model="searchVal"
    @change="handleValueChange"
    :data="options"
    :render-after-expand="false"
  />

  <el-select
    v-else
    v-model="searchVal"
    @change="handleValueChange"
    v-bind="configData.propAttrs"
    clearable
    :disabled="disabled"
  >
    <!-- <RecycleScroller
      class="virtualScroller"
      v-if="configData.hasVirtualList"
      :items="options"
      :item-size="34"
      key-field="id"
    >
      <template v-slot="{ item }">
        <el-option
          :label="item.name"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </template>
      <template #empty v-if="dataList.length == 0">
        <p class="el-select-dropdown__empty">无匹配数据</p>
      </template>
    </RecycleScroller> -->
    <!-- <template v-else> -->
    <el-option
      v-for="item in options"
      :label="item.name"
      :value="item.id"
      :key="item.id"
    ></el-option>
    <!-- </template> -->
  </el-select>
</template>

<script>
import { defineComponent, ref, toRefs, watch } from "vue";
// import { RecycleScroller } from "vue-virtual-scroller";
// import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import useLink from "./use/useLink";
export default defineComponent({
  name: "XbSelect",
  components: {
    // RecycleScroller,
  },
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["eventChange"],
  setup(props, ctx) {
    const {
      defaultOptions = [],
      propName,
      requestApi,
      responseFormat = (val) => {
        return val;
      },
      requestParams = {},
    } = props.configData;
    const searchVal = ref(props.formData[props.configData.propName]);
    // 监听值的变化
    watch(
      () => props.formData[props.configData.propName],
      (val) => {
        searchVal.value = val;
      }
    );
    const handleValueChange = (val) => {
      ctx.emit("eventChange", { [propName]: val });
    };

    // 列表值
    const options = ref(defaultOptions || []);
    // 参数
    const _requestParams = ref(requestParams);
    // 远程获取获取option的值
    const getOptionsData = async () => {
      let res = await requestApi(_requestParams.value || {});
      res = responseFormat(res);
      if (res.code === 1) {
        options.value = res.data;
      }
    };

    if (requestApi) {
      getOptionsData();
    }
    // 关联表单 key 和 val, cb 为改变值后触发的回调
    const linkOptionsCb = (val, key, cb) => {
      searchVal.value = "";
      handleValueChange("");
      if (requestApi) {
        _requestParams.value = { ..._requestParams.value, [key]: val };
        getOptionsData();
      } else {
        options.value = cb(val, key);
      }
    };
    const { disabled } = useLink(props, { linkOptionsCb });

    return {
      searchVal,
      options,
      disabled,
      handleValueChange,
    };
  },
});
</script>
<style  scoped>
.virtualScroller {
  max-height: 247px;
}
</style>
