<template>
  <el-dialog
    class="xb-lib__dialog"
    v-model="libDialogShow"
    width="840"
    title="图片库"
  >
    <div class="xb-lib__box">
      <div class="xb-lib__group">
        <el-tree :data="groupList"></el-tree>
      </div>
      <div class="xb-lib__file-list">
        <div class="xb-lib__top-operate">
          <el-input placeholder="搜索文件名称" class="xb-lib__search">
            <template #append>
              <el-button>
                <template #icon>
                  <el-icon><component :is="'xb-icon-search'" /></el-icon>
                </template>
              </el-button>
            </template>
          </el-input>
          <!-- <div class="xb-lib__upload">
            <span class="xb-lib__upload-tip">图片大小不能超过2M</span>
            <el-button>上传</el-button>
          </div> -->
        </div>
        <div class="xb-lib__file-list-body">
          <ul class="xb-lib__file-list-ul">
            <li
              class="xb-lib__file-item"
              :class="{ active: chooseFileIndex.has(index) }"
              v-for="(item, index) in fileList"
              :key="index"
              @click="handleChooseFile(index)"
            >
              <div
                class="xb-lib__file"
                :style="{
                  backgroundImage: `url('${item.image}')`,
                }"
              ></div>
              <p class="xb-lib__file-name">{{ item.name }}</p>
              <div class="xb-lib__select-mask">
                <el-icon><component :is="'xb-icon-check'" /></el-icon>
              </div>
            </li>
          </ul>
          <div class="xb-lib__footer-operate">
            <el-pagination
              background
              small
              layout="prev, pager, next"
              :total="fileTotal"
              :page-size="+requestParams.pageSize"
              hide-on-single-page
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
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
import { defineComponent, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
// icons
import XbIconCheck from "main/icons/check";
import XbIconClose from "main/icons/close";
import XbIconSearch from "main/icons/search";

export default defineComponent({
  name: "XbFileLib",
  components: {
    XbIconCheck,
    XbIconClose,
    XbIconSearch,
  },
  props: {
    config: {
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
    const groupList = ref([
      {
        label: "全部",
      },
      {
        label: "商品",
      },
    ]);
    const fileList = ref([]);
    const fileTotal = ref(0);
    const chooseFileIndex = ref(new Set());
    const requestParams = reactive({
      page: 1,
      pageSize: 15,
      ...props.config.requestParams,
    });
    // 获取图库列表
    const getFileList = async () => {
      const { paramsFormat, requestApi, responseFormat } = props.config;
      if (!requestApi) return false;
      const params = paramsFormat ? paramsFormat(requestParams) : requestParams;
      try {
        let res = await props.config.requestApi(params);
        responseFormat && (res = responseFormat(res));
        if (res.code === 1) {
          fileList.value = res.data.list;
          fileTotal.value = res.data.total || res.data.list.length;
        } else {
          ElMessage.error(res.msg || "获取失败");
        }
      } catch (err) {
        console.log(err);
        ElMessage.error("获取失败");
      }
    };
    getFileList();
    // 是否显示
    const libDialogShow = ref(false);
    // 取消
    const handleCancel = () => {
      libDialogShow.value = false;
      chooseFileIndex.value.clear();
    };
    // 分页切换
    const handlePageChange = () => {
      requestParams.value.page = val;
      getFileList();
    };
    // 选择文件
    const handleChooseFile = (index) => {
      // 判断是否存在
      if (chooseFileIndex.value.has(index)) {
        chooseFileIndex.value.delete(index);
      } else {
        if (props.limit == chooseFileIndex.value.size) return false;
        chooseFileIndex.value.add(index);
      }
    };

    // 确认
    const handleSubmit = () => {
      ctx.emit(
        "submit",
        fileList.value.filter((_, index) => chooseFileIndex.value.has(index)).map(item => item.image)
      );
      handleCancel();
    };

    return {
      groupList,
      fileList,
      libDialogShow,
      handlePageChange,
      handleChooseFile,
      fileTotal,
      requestParams,
      chooseFileIndex,
      handleCancel,
      handleSubmit,
    };
  },
});
</script>
<style lang="less" scoped>
.xb-lib__dialog .el-dialog__body {
  padding: 0 10px 80px;
  max-height: auto;
  overflow: auto;
}
.xb-lib__footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
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
  flex: 1;
}
.xb-lib__file-list {
  width: 630px;
  margin-left: 20px;
}
.xb-lib__file-list-body {
  height: 455px;
}
.xb-lib__top-operate {
  display: flex;
  justify-content: space-between;
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

.xb-lib__footer-operate {
  display: flex;
  justify-content: end;
}
.xb-lib__file-list-ul {
  height: 417px;
  row-gap: 16px;
  column-gap: 16px;
  padding: 0;
  overflow: auto;
}
.xb-lib__file {
  height: 95px;
  width: 95px;
  background-size: contain;
}
.xb-lib__file-name {
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin: 0;
  padding: 0;
}
.xb-lib__select-mask {
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
.xb-lib__file-item {
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
    .xb-lib__select-mask {
      display: flex;
    }
  }
}
</style>
