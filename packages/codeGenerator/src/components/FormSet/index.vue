<template>
  <div class="formSet-page">
    <div class="formSet-material">
      <div class="formSet-material__title">物料区</div>
      <el-scrollbar class="formSet-material-w">
        <el-collapse v-model="activeArray" class="formSet-material__list">
          <el-collapse-item
            v-for="(item, listIndex) in leftComponents"
            :key="listIndex"
            :title="item.title"
            :name="item.id"
            class="formSet-material__item"
          >
            <draggable
              :list="item.list"
              class="formSet-material__child-list"
              v-bind="{
                handle: '.formSet-material__child',
                sort: false,
                group: { name: 'componentsGroup', pull: 'clone', put: false },
                tag: 'ul',
              }"
              :clone="handleCloneM"
              @end="handleMaterialMoveEnd"
            >
              <template #item="{ element, index }">
                <li :key="index" class="formSet-material__child">
                  <!-- <svg-icon :icon-class="element.__config__.tagIcon" /> -->
                  {{ element.__config__.label }}
                </li>
              </template>
            </draggable>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>

    <div class="formSet-preview">
      <div class="formSet-preview-top">
        <el-button class="delete-btn" icon="el-icon-delete" type="text">
          清空
        </el-button>
      </div>
      <el-scrollbar class="formSet-preview-area">
        <el-form
          class="formSet-preview-area__form"
          :size="formConf.size"
          :label-position="formConf.labelPosition"
          :disabled="formConf.disabled"
          :label-width="formConf.labelWidth + 'px'"
        >
          <draggable
            class="formSet-preview__drawing-board"
            :list="drawingList"
            :animation="340"
            group="componentsGroup"
          >
            <template #item="{ element, index }">
              <draggable-item
                :ref="'refs' + element.__config__.formId"
                :key="element.renderKey"
                :drawing-list="drawingList"
                :current-item="element"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
              />
            </template>
          </draggable>
          <div v-show="!drawingList.length" class="formSet-preview__empty-info">
            从左侧拖入或点选组件进行表单设计
          </div>
        </el-form>
      </el-scrollbar>
    </div>
    <div class="formSet-setting"></div>
    <!-- <right-panel
      :active-data="activeData"
      :form-conf="formConf"
      :show-field="!!drawingList.length"
      @tag-change="tagChange"
      @fetch-data="fetchData"
    /> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import DraggableItem from "./DraggableItem";
import {
  inputComponents,
  selectComponents,
  layoutComponents,
  formConf,
} from "./config";
let tempActiveData = "";
const leftComponents = [
  {
    id: 1,
    title: "输入型组件",
    list: inputComponents,
  },
  {
    id: 2,
    title: "选择型组件",
    list: selectComponents,
  },
  {
    id: 3,
    title: "布局型组件",
    list: layoutComponents,
  },
];
const activeId = ref("");
const drawingList = ref([]);
const activeArray = ref([1, 2, 3]);
const handleMaterialMoveEnd = (obj) => {
  if (obj.from !== obj.to) {
    drawingList.value.push(tempActiveData);
  }
};
const handleCloneM = (origin) => {
  tempActiveData = origin;
};
</script>

<style lang="less" scope>
.formSet-page {
  display: flex;
  height: 100%;
  .el-collapse-item__header {
    padding-left: 20px;
    padding-right: 12px;
  }
}
.formSet-material__child {
  list-style: none;
  border: 1px solid #e6e6e6;
  padding: 0 8px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  cursor: pointer;
}
.formSet-material__child-list {
  display: grid;
  grid-template-columns: repeat(2, 48%);
  grid-gap: 10px 4%;
  padding: 0px 20px;
}
.formSet-material {
  width: 260px;
}
.formSet-preview {
  flex: 1;
  height: 100%;
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
}
.formSet-setting {
  width: 260px;
}
.formSet-preview-top {
  height: 40px;
  padding: 0 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
}
.formSet-preview-area {
  flex: 1;
}
.formSet-preview-area__form,
.el-scrollbar__view {
  height: 100%;
  position: relative;
}
.formSet-preview__empty-info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #409eff;
  width: 100%;
  font-size: 18px;
}
.formSet-material__title {
  height: 39px;
  padding: 0 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.formSet-material-w {
  height: calc(100% - 40px);
}
.formSet-preview__drawing-board {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
