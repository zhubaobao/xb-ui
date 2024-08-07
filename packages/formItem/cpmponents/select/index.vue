<template>
  <el-tree-select
    v-if="configData.selectType === 'tree'"
    v-bind="configData.propAttrs"
    v-model="searchVal"
    @change="handleValueChange"
    :data="options"
    :clearable="
      !(configData.propAttrs && configData.propAttrs.clearable === false)
    "
  />

  <el-select
    v-else
    v-model="searchVal"
    @change="handleValueChange"
    v-bind="configData.propAttrs"
    :clearable="
      !(configData.propAttrs && configData.propAttrs.clearable === false)
    "
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
import { computed, defineComponent, ref, watch } from "vue";
import { deepCopy } from "main/utils";
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
    modelValue: {},
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const {
      requestApi,
      selectType,
      isChooseFirstVal,
      responseFormat = (val) => {
        return val;
      },
      valChangeCb,
      requestParams = {},
      keysCustom,
    } = props.configData;
    const searchVal = ref(props.modelValue);
    // 监听值的变化
    watch(
      () => props.modelValue,
      (val) => {
        searchVal.value = val;
      }
    );
    const handleValueChange = (val) => {
      valChangeCb && valChangeCb(val);
      ctx.emit("update:modelValue", val);
    };

    // options 数据处理
    const defaultKeys = {
      label: "name",
      value: "id",
      children: "children",
    };
    const dealOptions = (data) => {
      const { label, value, children } = {
        ...defaultKeys,
        ...(keysCustom || {}),
      };

      if (!Array.isArray(data)) return [];
      return data.map((item) => {
        return selectType === "tree"
          ? {
              value: item[value],
              label: item[label],
              children: dealOptions(item[children]),
            }
          : {
              id: item[value],
              name: item[label],
            };
      });
    };

    // 列表值
    const optionsData = ref(props.configData.defaultOptions || []);
    const options = computed(() => {
      if (keysCustom) {
        return dealOptions(optionsData.value);
      } else {
        return optionsData.value;
      }
    });
    // 参数
    const _requestParams = ref(requestParams);
    // 远程获取获取option的值
    const getOptionsData = async () => {
      let res = await requestApi(_requestParams.value);
      res = responseFormat(res);
      if (res.code === 1) {
        optionsData.value = res.data;
      }
    };
    if (requestApi) {
      getOptionsData();
    }
    // 是否默认选择一个值
    if (isChooseFirstVal) {
      watch(options, (val) => {
        if (Array.isArray(val) && val.length > 0) handleValueChange(val[0].id);
      });
    }
    // 是否是第一次加载
    let isFristLoad = true;
    // 关联表单 key 和 val, cb 为改变值后触发的回调
    const linkOptionsCb = (val, key, cb) => {
      if (!isFristLoad) {
        searchVal.value = "";
        handleValueChange("");
      }
      isFristLoad = false;
      if (requestApi) {
        _requestParams.value = { ..._requestParams.value, [key]: val };
        getOptionsData();
      } else {
        new Promise((resolve) => {
          cb(deepCopy(val), key, resolve, deepCopy(props.formData));
        }).then((res) => {
          optionsData.value = res;
        });
      }
    };
    useLink(props, linkOptionsCb);
    return {
      searchVal,
      options,
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
