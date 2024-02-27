<template>
  <el-card shadow="never" class="xb-ans-wrap">
    <el-card class="xb-ans-item" shadow="never" v-for="(item, index) in list" :key="item">
      <div class="xb-ans-item-con">
        <xb-form-item
          v-for="ele in configData.formItems"
          :key="ele"
          :layout="configData.layout"
          :formItem="ele"
          :formData="list[index]"
          slotSuffix="XbJ"
        ></xb-form-item>
      </div>
      <el-popconfirm
        title="确认删除？"
        @confirm="deleteItem(index)"
        v-if="list.length > config.min"
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
import { defineComponent, ref, watch } from "vue";
import { deepMerge } from "main/utils/index";
// icon
import XbIconPlus from "main/icons/plus";
import XbIconDelete from "main/icons/delete";
// components

export default defineComponent({
  name: "XbFormJson",
  components: {
    XbIconPlus,
    XbIconDelete,
  },
  props: {
    modelValue: {
      type: Array,
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
      min: 0,
      max: Infinity,
      formItems: [],
    };
    const config = deepMerge(defaultConfig, props.configData);
    const childVal = {};
    config.formItems.forEach((item) => {
      childVal[item.propName] = item.defaultValue || "";
    })

    const list = ref(props.modelValue);
    const addItem = () => {
      list.value.push(childVal);
    };
    // 初始化值
    for (let i = 0; i < config.min; i++) {
      addItem();
    }
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
    watch(
      () => props.modelValue,
      (val) => {
        list.value = val;
      },
      { deep: true }
    );
    return {
      list,
      config,
      addItem,
      deleteItem
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
  &:deep(>.el-card__body) {
    display: flex;
    align-items: center;
  }
}
.xb-ans-item-con {
  flex: 1;
  &:deep .el-form-item {
    margin-bottom: 18px;
  }
}
</style>