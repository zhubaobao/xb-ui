<template>
  <!-- 列表头部 -->
  <el-header class="xb-table__header" v-if="config.headerConfig.show">
    <!-- 列表操作 -->
    <div class="xb-table__operation">
      <!-- 操作按钮 -->
      <div class="xb-table-operation-btns">
        <el-button
          type="primary"
          v-if="btnConfig.hasBack"
          @click="config.headerConfig.backCb"
        >
          <template #icon>
            <el-icon><component :is="'xb-icon-back'" /></el-icon>
          </template>
          返回</el-button
        >
        <el-button v-if="btnConfig.hasAdd" type="primary" @click="handleAdd">
          <template #icon>
            <el-icon><component :is="'xb-icon-plus'" /></el-icon>
          </template>
          添加{{ name }}
        </el-button>
        <el-button
          type="danger"
          plain
          v-if="btnConfig.hasHeaderDelete"
          @click="handleDelete(selectedItems)"
        >
          <template #icon>
            <el-icon><component :is="'xb-icon-delete'" /></el-icon>
          </template>
          删除{{ name }}</el-button
        >
        <el-upload
          class="xb-upload-btn"
          action="#"
          :before-upload="handleBeforeUpload"
          :http-request="httpRequest"
          :show-file-list="false"
          :disabled="upLoading"
          v-if="btnConfig.hasImport"
        >
          <el-button type="primary" :loading="upLoading">
            <template #icon>
              <el-icon
                ><component :is="'xb-icon-download'"
              /></el-icon> </template
            >导入{{ name }}</el-button
          >
        </el-upload>
        <slot name="headerOperations" :refresh="getData"></slot>
      </div>
    </div>
  </el-header>
  <el-main class="xb-table__main">
    <!-- 列表数据 -->
    <div class="xb-table__content">
      <el-table
        ref="table"
        v-loading="tableInfo.loading"
        :data="tableInfo.dataList"
        v-bind="config.propAttrs"
        @selection-change="handleSelectionChange"
      >
        <!-- 列表序号、选择框 -->
        <el-table-column
          v-if="btnConfig.hasSelection"
          type="selection"
          width="45"
        />
        <!-- 自内容 -->
        <template v-for="item in config.columns" :key="item">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            v-bind="item.propAttrs"
            v-if="item.show !== false"
          >
            <!-- 自定义表头 -->
            <template v-if="item.showHeader" #header>
              <slot :name="`${item.prop}Header`"></slot>
            </template>

            <template #default="scope">
              <!-- 自定义模板  使用slot -->
              <template v-if="item.contentType === 'template'">
                <slot :name="`${item.prop}`" :scope="scope" :refresh="getData">
                </slot>
              </template>
              <!-- 排序 -->
              <template v-else-if="item.contentType === 'sort'">
                <el-input
                  v-model="scope.row[item.prop]"
                  placeholder="请输入排序"
                  @focus="handleSortFocus(scope.row, item)"
                  @blur="handleSortBlur(scope.row, item)"
                ></el-input>
              </template>

              <!-- 正常渲染数据列 -->
              <template v-else>
                {{ scope.row[item.prop] }}{{ item.showHeader }}
              </template>
            </template>
          </el-table-column>
        </template>
        <!-- 列表项操作 -->
        <el-table-column
          v-if="config.operationConfig.show"
          label="操作"
          align="right"
          fixed="right"
          :width="config.operationConfig.width"
        >
          <template #default="{ row }">
            <slot name="tableOperations" :data="row" :refresh="getData"></slot>
            <el-button
              size="small"
              class="xb-operations-btn"
              text
              v-if="btnConfig.hasDetails"
              >详情
            </el-button>

            <el-button
              size="small"
              class="xb-operations-btn"
              text
              @click="handleEdit(row)"
              v-if="btnConfig.hasEdit"
              >编辑
            </el-button>

            <el-button
              size="small"
              class="xb-operations-btn"
              text
              style="color: var(--el-color-danger)"
              @click="handleDelete([row])"
              v-if="btnConfig.hasOperationDelete"
              >删除
            </el-button>
          </template>
        </el-table-column>
        <!-- 无数据提示 -->
        <template #empty>
          <slot name="empty">
            <el-empty description="对不起，暂无数据" />
          </slot>
        </template>
      </el-table>
    </div>
    <!-- 列表底部 -->
    <div class="xb-table__footer">
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="tableInfo.total"
          :page-size="+requestParams.pageSize"
          @current-change="handlePageChange"
        />
      </div>

      <div class="operation__btns">
        <el-button @click="getData" circle style="margin-left: 15px">
          <template #icon>
            <el-icon><component :is="'xb-icon-refresh'" /></el-icon>
          </template>
        </el-button>
        <slot name="table-tool"></slot>
      </div>
    </div>
  </el-main>
</template>
<script>
import { defineComponent, watch } from "vue";
import useTable from "./use/useTable";
import useSelection from "./use/useSelection";
import useMergeConfig from "./use/useMergeConfig";
import useImport from "./use/useImport";
import useSort from "./use/useSort";
// icons
import XbIconRefresh from "main/icons/refresh";
import XbIconPlus from "main/icons/plus";
import XbIconDownload from "main/icons/download";
import XbIconBack from "main/icons/back";
import XbIconDelete from "main/icons/delete";
export default defineComponent({
  name: "XbTable",
  components: {
    XbIconRefresh,
    XbIconPlus,
    XbIconDownload,
    XbIconBack,
    XbIconDelete,
  },
  props: {
    requestParams: {
      type: Object,
      default: () => ({}),
    },
    // 表格配置
    tableConfig: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    name: {
      type: String,
      default: "",
    },
  },
  emits: ["selectionChange", "add", "edit"],
  setup(props, ctx) {
    console.log(ctx, "ctx");
    const { config } = useMergeConfig(props);
    // 表格选择
    const { selectedItems, handleSelectionChange } = useSelection();
    // 表格
    const {
      tableInfo,
      getData,
      handlePageChange,
      requestParams,
      handleAdd,
      handleEdit,
      handleDelete,
      btnConfig,
    } = useTable(props, ctx, config);
    // 导入
    const { httpRequest, handleBeforeUpload, upLoading } = useImport(
      config,
      getData
    );
    const { handleSortFocus, handleSortBlur } = useSort(getData);

    return {
      // 配置
      config,
      // table
      tableInfo,
      requestParams,
      selectedItems,
      handleSelectionChange,
      getData,
      handlePageChange,
      handleAdd,
      handleEdit,
      handleDelete,
      btnConfig,
      // import
      httpRequest,
      handleBeforeUpload,
      upLoading,
      // sort
      handleSortFocus,
      handleSortBlur,
    };
  },
});
</script>
<style lang="less" scoap>
.xb-table-operation-btns {
  display: flex;
}
.xb-upload-btn {
  margin: 0 15px;
}
.xb-table__footer {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: #fff;
  position: relative;
  z-index: 99;
}
.el-main.xb-table__main {
  padding: 0;
}
.xb-table__content {
  height: calc(100% - 50px);
  // 头样式
  .el-table__header {
    th {
      background-color: #fafafa !important;
    }
  }
  .el-table__cell {
    min-height: 46px;
    &:first-child {
      padding-left: 5px;
    }
    &:last-child {
      padding-right: 5px;
    }
  }
  .xb-operations-btn {
    padding: 5px 0;
    color: var(--el-color-primary);
  }
}
</style>
