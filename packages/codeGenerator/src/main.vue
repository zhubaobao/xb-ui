<template>
  <div class="create-page">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="表格设置" name="tableSet">
        <el-form class="create-table-setting__form" label-position="top">
          <div class="create-table-setting__form-left">
            <div class="create-form-item-w">
              <el-form-item
                label="名称"
                class="create-form-item"
                style="width: 37%"
              >
                <el-input
                  v-model="name"
                  placeholder="请输入页面名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="表格数据接口地址" style="width: 60%">
                <el-input
                  v-model="tableConfig.requestApi"
                  placeholder="请输入表格数据接口地址"
                ></el-input>
              </el-form-item>
            </div>

            <el-form-item label="功能 ">
              <el-checkbox
                v-model="tableConfig.headerConfig.hasDelete"
                label="批量删除"
              >
              </el-checkbox>
              <el-checkbox
                v-model="tableConfig.headerConfig.hasAdd"
                label="添加"
              ></el-checkbox>
              <el-checkbox
                v-model="tableConfig.headerConfig.hasImport"
                label="导入"
              ></el-checkbox>
              <el-checkbox
                v-model="tableConfig.headerConfig.hasBack"
                label="返回"
              ></el-checkbox>
              <el-checkbox
                v-model="tableConfig.operationConfig.hasDelete"
                label="删除"
              >
              </el-checkbox>
              <el-checkbox
                v-model="tableConfig.operationConfig.hasEdit"
                label="编辑"
              >
              </el-checkbox>
              <el-checkbox
                v-model="tableConfig.operationConfig.hasDelete"
                label="删除"
              >
              </el-checkbox>
            </el-form-item>
            <div
              class="create-delete-setting create-setting-card"
              v-if="
                (tableConfig.headerConfig.show &&
                  tableConfig.headerConfig.hasDelete) ||
                (tableConfig.operationConfig.show &&
                  tableConfig.operationConfig.hasDelete)
              "
            >
              <div class="create-setting-card__title">删除功能设置</div>
              <el-form-item label="删除接口地址">
                <el-input
                  v-model="tableConfig.deleteConfig.requestApi"
                  placeholder="请输入删除接口地址"
                ></el-input>
              </el-form-item>
            </div>
            <div
              class="create-setting-card"
              v-if="
                tableConfig.headerConfig.show &&
                tableConfig.headerConfig.hasImport
              "
            >
              <div class="create-setting-card__title">导入功能设置</div>
              <el-form-item label="导入接口地址">
                <el-input
                  v-model="tableConfig.deleteConfig.requestApi"
                  placeholder="请输入导入接口地址"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="create-table-setting__form-right">
            <div class="create-table-key-setting create-setting-card">
              <div class="create-setting-card__title">表格字段设置</div>
              <draggable
                :list="tableConfig.columns"
                v-bind="{
                  ghostClass: 'ghost',
                  handle: '.table-key-item__drag',
                }"
              >
                <template #item="{ element, index }">
                  <div class="table-key-item">
                    <div class="table-key-item__drag">
                      <!-- <img src="../../../assets/move-icon.png" alt="" /> -->
                    </div>
                    <div class="table-key-item__setting">
                      <el-input
                        v-model="element.label"
                        placeholder="字段名"
                        style="width: 33%"
                      />
                      <el-input
                        placeholder="字段"
                        :value="element.prop"
                        style="width: 33%; margin: 0 5px"
                      />
                      <el-select
                        v-model="element.contentType"
                        placeholder="请选择"
                        style="width: 33%"
                      >
                        <el-option
                          v-for="item in tableContentTypeList"
                          :key="item.value"
                          :value="item.value"
                          :label="item.name"
                        ></el-option>
                      </el-select>
                    </div>
                    <el-button
                      @click="tableConfig.columns.splice(index, 1)"
                      type="danger"
                      icon="el-icon-delete"
                      circle
                    />
                  </div>
                </template>
                <template #footer>
                  <el-button
                    @click="handleTableKeyAdd"
                    class="table-key-item__add"
                    >添加</el-button
                  >
                </template>
              </draggable>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="表单设置" name="formSet">
        <!-- <FormSet /> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
import FormSet from "./components/FormSet";
import { reactive, defineComponent, ref } from "vue";

export default defineComponent({
  name: "XbCodeGenerator",
  components: {
    Draggable,
    FormSet,
  },
  setup() {
    const activeName = ref("tableSet");
    // 页面名称
    const name = ref("");
    // 表格配置
    const tableConfig = reactive({
      propAttrs: {
        height: "100%",
      },
      hasSelection: true,
      headerConfig: {
        show: true,
        hasAdd: true,
        hasDelete: true,
        hasImport: false,
        hasBack: false,
        backCb() {},
      },
      importConfig: {
        requestApi: "",
        fileKey: "file",
        accept: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ],
        responseFormat(val) {
          return val;
        },
      },
      operationConfig: {
        show: true,
        hasDelete: true,
        hasEdit: true,
        hasDetails: false,
        width: 100,
      },
      deleteConfig: {
        deleteItemIdKey: "id",
        deleteIdKey: "ids",
        responseFormat(val) {
          return val;
        },
      },
      columns: [
        {
          prop: "",
          label: "",
          contentType: "",
        },
      ],
      responseFormat(val) {
        return val;
      },
    });
    const tableContentTypeList = [
      {
        name: "默认",
        value: "default",
      },
      {
        name: "自定义",
        value: "template",
      },
      {
        name: "排序",
        value: "sort",
      },
    ];
    // 表格字段添加
    const handleTableKeyAdd = () => {
      tableConfig.columns.push({
        prop: "",
        label: "",
        contentType: "",
      });
    };
    return {
      activeName,
      name,
      tableConfig,
      tableContentTypeList,
      handleTableKeyAdd,
    };
  },
});
</script>
<style lang="less" scope>
.create-setting-card {
  border-radius: 5px;
  padding: 20px;
  width: 33%;
  border: 1px solid #dcdfe6;
  position: relative;
  margin-top: 40px;
  width: 100%;
}
.create-setting-card__title {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  background-color: #fff;
  padding: 0 20px;
  font-weight: 500;
  color: #303133;
  font-size: 14px;
  top: -10px;
}
.create-form-item-w {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.create-form-item {
  margin-right: 20px;
  &:last-child {
    margin-right: 20px;
  }
}
.create-page {
  height: 100%;
  overflow: hidden;
  width: 100%;
  background: #fff;
  .el-tabs__nav-scroll {
    padding: 0 20px;
  }
  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs,
  .el-tab-pane {
    height: 100%;
  }
  .el-tabs__content {
    height: calc(100% - 40px);
  }
}

.create-table-setting__title {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  border-bottom: 1px solid #edebeb;
}
.create-table-setting__form {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100%;
  overflow: scroll;
  & > div {
    width: 48%;
  }
}
.create-table-key-setting {
  margin-top: 30px;
}
.table-key-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.table-key-item__setting {
  margin: 0 10px;
  display: flex;
}
.table-key-item__add {
  margin-top: 20px;
}
.table-key-item__drag {
  height: 30px;
  display: flex;
  align-items: center;
  cursor: move;
}
.table-key-item__drag img {
  height: 25px;
}
</style>
