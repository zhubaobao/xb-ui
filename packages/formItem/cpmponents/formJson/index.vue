<template>
  <el-card shadow="never" class="xb-ans-wrap">
    <el-card
      class="xb-ans-item"
      shadow="never"
      v-for="(item, index) in list"
      :key="item"
    >
      <div class="xb-ans-item-con">
        <xb-form-item
          v-for="ele in getFormItems(index)"
          :key="ele"
          :layout="config.layout"
          :formItem="ele"
          :parentProp="`${config.propName}.${index}.`"
          :formData="list[index]"
          :slotSuffix="config.propName + index + 'XbJ'"
        ></xb-form-item>
      </div>
      <el-popconfirm
        title="确认删除？"
        @confirm="deleteItem(index)"
        v-if="list.length > config.min && config.fixNum <= index"
      >
        <template #reference>
          <el-button circle type="danger" style="margin-left: 20px">
            <template #icon>
              <el-icon><component :is="'xb-icon-delete'" /></el-icon>
            </template>
          </el-button>
        </template>
      </el-popconfirm>
    </el-card>
    <div style="text-align: center">
      <el-button
        @click="addItem(data)"
        circle
        type="primary"
        v-if="list.length < config.max"
      >
        <template #icon>
          <el-icon><component :is="'xb-icon-plus'" /></el-icon>
        </template>
      </el-button>
    </div>
  </el-card>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { deepMerge, deepCopy } from "main/utils/index";
// icon
import XbIconPlus from "main/icons/plus";
import XbIconDelete from "main/icons/delete";
// use

export default defineComponent({
  name: "XbFormJson",
  components: {
    XbIconPlus,
    XbIconDelete,
  },
  props: {
    modelValue: {
      type: [Array, String],
      default: () => [],
    },
    configData: {
      type: Object,
      default: () => ({}),
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],
  setup(props, cxt) {
    const defaultConfig = {
      fixNum: -1,
      min: 0,
      max: Infinity,
      formItems: [],
    };
    const config = deepMerge(defaultConfig, props.configData);

    const getFormItems = (index) => {
      return deepCopy(config.formItems).map((item) => {
        item.disabled = item.disabledControl
          ? item.disabledControl(deepCopy(item), index)
          : item.disabled;
        return item;
      });
    };
    // 编辑时需要保留的 key 值
    const keys = new Set(config.extraKeys || []);
    // 初始化值
    const childVal = {};
    config.formItems.forEach((item) => {
      if (item.type === "text" || item.show === false) return;
      // 处理时间范围，后台需要2个字段的情况
      if (item.propName && item.propName.includes("-")) {
        const defaultValue = item.defaultValue || [];
        item.propName.split("-").forEach((key, index) => {
          keys.add(key);
          childVal[key] =
            defaultValue[index] === "undefined" ? "" : defaultValue[index];
        });
      } else {
        keys.add(item.propName);
        childVal[item.propName] =
          item.defaultValue === "undefined" ? "" : item.defaultValue;
      }
    });

    const list = ref([]);
    // 添加
    const addItem = () => {
      list.value.push(deepCopy(childVal));
    };
    // 初始化值
    for (let i = 0; i < config.min; i++) {
      addItem();
    }
    // 删除
    const deleteItem = (index) => {
      list.value.splice(index, 1);
    };
    watch(
      list,
      (val) => {
        cxt.emit("update:modelValue", val);
      },
      { deep: true }
    );

    const modelValueUnwatch = watch(
      () => props.modelValue,
      (val) => {
        list.value = val || [];
        modelValueUnwatch();
      }
    );

    return {
      list,
      config,
      addItem,
      deleteItem,
      getFormItems,
    };
  },
});
</script>
<style lang="less" scoped>
.xb-ans-wrap {
  background: #f5f7fa;
  width: 100%;
}
.xb-ans-item {
  margin-bottom: 20px;
  &:deep(> .el-card__body) {
    display: flex;
    align-items: center;
  }
}
.xb-ans-item-con {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  &:deep .el-form-item {
    margin-bottom: 18px;
  }
}
</style>