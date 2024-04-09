<template>
  <el-dialog
    class="xb-lib__dialog"
    v-model="libDialogShow"
    append-to-body
    width="840"
    title="图片库"
    v-bind="$attrs"
  >
    <div class="xb-lib__box">
      <!-- 分类 -->
      <div class="xb-lib__group" v-if="config.hasGroup">
        <el-tree :data="classifyList">
          <template #default="{ data }">
            <div
              class="xb-lib__group-item"
              :class="{ active: groupId == data.id }"
              @click.stop="handleChooseClassify(data.id)"
            >
              <span>{{ data.name }}</span>
            </div>
          </template>
        </el-tree>
      </div>
      <div class="xb-lib-content">
        <!-- 列表头部 -->
        <div
          class="xb-lib-content__top"
          v-if="config.operationConfig && config.operationConfig.show"
        >
          <el-input
            v-if="config.operationConfig.hasSearch"
            v-model="searchName"
            placeholder="搜索文件名称"
            class="xb-lib__search"
          >
            <template #append>
              <el-button @click="handleSearch">
                <template #icon>
                  <el-icon><component :is="'xb-icon-search'" /></el-icon>
                </template>
              </el-button>
            </template>
          </el-input>
          <el-upload
            v-if="config.operationConfig.hasUpload"
            class="xb-upload-btn"
            action="#"
            :before-upload="handleBeforeUpload"
            :http-request="httpRequest"
            :show-file-list="false"
            :disabled="upLoading"
          >
            <el-button
              :icon="upLoading ? 'el-icon-loading' : 'el-icon-upload-filled'"
              >{{ upLoading ? "上传中" : "上传" }}</el-button
            >
          </el-upload>
        </div>
        <!-- 列表内容 -->
        <ul class="xb-lib-content__list">
          <li
            class="xb-lib-content__item"
            :class="{ active: chooseFileIndex.has(index) }"
            v-for="(item, index) in fileInfo.list"
            :key="index"
            @click="handleChooseFile(index)"
          >
            <div
              class="xb-lib-content__file"
              :style="{
                backgroundImage: `url('${item[keysCustom.url]}')`,
              }"
            ></div>
            <p class="xb-lib-content__file-name">
              {{ item[keysCustom.name] }}
            </p>
            <div class="xb-lib-content__select-mask">
              <el-icon><component :is="'xb-icon-check'" /></el-icon>
            </div>
          </li>
        </ul>
        <!-- 列表底部 -->
        <div class="xb-lib-content__footer">
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              :total="fileInfo.total"
              :pager-count="5"
              :page-size="requestParams.pageSize"
              @current-change="handlePageChange"
            />
          </div>
          <div class="operation__btns">
            <el-button
              @click="getFileList"
              icon="el-icon-refresh"
              circle
              style="margin-left: 15px"
            >
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗按钮 -->
    <div class="xb-lib__footer">
      <el-button @click="handleCancel">
        <template #icon>
          <el-icon><component :is="'xb-icon-close'" /></el-icon>
        </template>
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        <template #icon>
          <el-icon><component :is="'xb-icon-check'" /></el-icon>
        </template>
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
    <script>
import { defineComponent, watch } from "vue";
// icons
import XbIconCheck from "main/icons/check";
import XbIconClose from "main/icons/close";
import XbIconSearch from "main/icons/search";
import XbIconMoreFilled from "main/icons/moreFilled";
// use
import useGroup from "./use/useGroup";
import useFile from "./use/useFile";
import useOperate from "./use/useOperate";

export default defineComponent({
  name: "XbFileLib",
  components: {
    XbIconCheck,
    XbIconClose,
    XbIconSearch,
    XbIconMoreFilled,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    keysCustom: {
      type: Object,
      default: () => ({}),
    },
    limit: {
      type: Number,
      default: 1,
    },
  },
  emits: ["cancel", "submit"],
  setup(props, ctx) {
    const { classifyList, getClassifyList } = useGroup(props);
    const {
      groupId,
      chooseFileIndex,
      searchName,
      fileInfo,
      requestParams,
      getFileList,
      handlePageChange,
      handleSearch,
      handleChooseClassify,
    } = useFile(props);
    const {
      libDialogShow,
      handleChooseFile,
      handleCancel,
      handleSubmit,
      upLoading,
      handleBeforeUpload,
      httpRequest,
    } = useOperate(props, ctx, fileInfo, groupId, getFileList, chooseFileIndex);

    watch(libDialogShow, (val) => {
      if (val) {
        props.config.hasGroup && getClassifyList();
        getFileList();
      }
    });
    return {
      searchName,
      groupId,
      classifyList,
      fileInfo,
      libDialogShow,
      handlePageChange,
      handleChooseFile,
      requestParams,
      chooseFileIndex,
      handleCancel,
      handleSubmit,
      handleChooseClassify,
      handleSearch,
      getFileList,
      upLoading,
      handleBeforeUpload,
      httpRequest,
    };
  },
});
</script>
  <style lang="less">
.xb-lib__dialog {
  .el-dialog__body {
    padding: 0 10px 0px;
  }
}
</style>
    <style lang="less" scoped>
.xb-lib-content__footer {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  position: relative;
  z-index: 99;
}

.xb-lib__footer {
  border-top: 1px solid #e6e6e6;
  padding: 13px 15px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.xb-lib__box {
  display: flex;
}
.xb-lib__group {
  border-right: 1px solid #e6e6e6;
  margin-right: 20px;
  width: 170px;
}
.xb-lib__group-btn {
  display: none;
}
.xb-lib__group-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  &.active {
    color: var(--el-color-primary);
  }
  &:hover {
    .xb-lib__group-btn {
      display: block;
    }
  }
}
.xb-lib-content {
  flex: 1;
}

.xb-lib-content__list {
  height: 460px;
  padding: 0;
  overflow: auto;
}
.xb-lib-content__top {
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
}

.xb-lib__search {
  width: 200px;
}
.xb-lib__upload {
  display: flex;
  align-items: center;
}

.xb-lib__upload-tip {
  font-size: 12px;
  padding-right: 10px;
  color: #999;
}

.xb-lib-content__file {
  height: 96px;
  width: 96px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.xb-lib-content__file-name {
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-top: 10px;
  padding: 0;
  width: 100%;
}
.xb-lib-content__select-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.41);
  text-align: center;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: #fff;
  line-height: 122px;
  text-align: center;
  display: none;
}
.xb-lib-content__item {
  width: 104px;
  border-radius: 2px;
  float: left;
  padding: 4px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: All 0.2s ease-in-out;
  margin: 8px;
  position: relative;
  cursor: pointer;
  &:hover {
    border: 1px solid #16bce2;
  }
  &.active {
    .xb-lib-content__select-mask {
      display: flex;
    }
  }
}
</style>
    