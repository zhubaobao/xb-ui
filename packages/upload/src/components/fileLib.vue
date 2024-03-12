<template>
  <el-dialog
    class="xb-lib__dialog"
    v-model="libDialogShow"
    append-to-body
    width="840"
    title="图片库"
  >
    <div class="xb-lib__box">
      <div class="xb-lib__group" v-if="config.hasGroup">
        <el-tree :data="classifyList">
          <template #default="{ data }">
            <div
              class="xb-lib__group-item"
              :class="{ active: groupId == data.id }"
              @click.stop="handleChooseClassify(data.id)"
            >
              <span>{{ data.name }}</span>
              <!-- <el-dropdown
                class="xb-lib__group-btn"
                @command="handleCommand($event, data)"
                v-if="data.group_id != -1"
              >
                <el-icon><component :is="'xb-icon-more-filled'" /></el-icon>
                <template #dropdown>
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </template>
              </el-dropdown> -->
            </div>
          </template>
        </el-tree>
      </div>
      <div class="xb-lib__file-list">
        <div class="xb-lib__top-operate">
          <el-input v-model="searchName" placeholder="搜索文件名称" class="xb-lib__search">
            <template #append>
              <el-button @click="getFileList">
                <template #icon>
                  <el-icon><component :is="'xb-icon-search'" /></el-icon>
                </template>
              </el-button>
            </template>
          </el-input>
          <div class="xb-lib__upload">
            <!-- <span class="xb-lib__upload-tip">图片大小不能超过2M</span>
            <el-button>上传</el-button> -->
          </div>
        </div>
        <div class="xb-lib__file-list-body">
          <ul class="xb-lib__file-list-ul">
            <li
              class="xb-lib__file-item"
              :class="{ active: chooseFileIndex.has(index) }"
              v-for="(item, index) in fileInfo.list"
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
          <!-- <div class="xb-lib__footer-operate">
            <el-pagination
              background
              small
              layout="prev, pager, next"
              :total="fileTotal"
              :page-size="+requestParams.pageSize"
              hide-on-single-page
              @current-change="handlePageChange"
            />
          </div> -->
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
import XbIconMoreFilled from "main/icons/moreFilled";

export default defineComponent({
  name: "XbFileLib",
  components: {
    XbIconCheck,
    XbIconClose,
    XbIconSearch,
    XbIconMoreFilled
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
    const groupId = ref('-1');
    const searchName = ref('');
    const fileInfo = reactive({
      list: [],
      total: 0
    });
    const chooseFileIndex = ref(new Set());
    const page = ref(1);
    const requestParams = reactive({
      page: page.value,
      pageSize: 15,
      ...props.config.requestParams,
    });
    // 获取图库列表
    const getFileList = async () => {
      const { paramsFormat, requestApi, responseFormat, hasGroup, GroupIdKey = 'groupId', hasSearch, searchIdKey = 'fileName' } = props.config;
      if (!requestApi) return false;
      let params = requestParams;
      // 是否有分页
      if (hasGroup) {
        params = {...params, [GroupIdKey]: groupId.value};
      }
      // 是否需要搜索
      if (hasSearch) {
        params = {...params, [searchIdKey]: searchName.value};
      }
      // 是否需要格式化
      if (paramsFormat) {
        params = paramsFormat(params);
      }
      try {
        let res = await props.config.requestApi(params);
        responseFormat && (res = responseFormat(res));
        if (res.code === 1) {
          fileInfo.list = res.data.list;
          fileInfo.total = res.data.total || res.data.list.length;
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
        fileInfo.list.filter((_, index) => chooseFileIndex.value.has(index))
      );
      handleCancel();
    };
    // 获取分类列表
    const classifyList = ref([]);
    const getClassifyList = async () => {
      const { cRequestApi, cParamsFormat, cResponseFormat }  = props.config;
      const params = cParamsFormat ? cParamsFormat() : {};
      let res = await cRequestApi(params);
      res = cResponseFormat(res);
      if (res.code == 1) {
        classifyList.value = res.data.length ? [{name: '全部', id: -1}].concat(res.data) : [];
      }
    }
    props.config.hasGroup && getClassifyList();
    // 选择分类
    const handleChooseClassify = (id) => {
      groupId.value = id;
      getFileList();
    }
   
 
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
      classifyList,
      handleChooseClassify,
      getFileList
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
  margin-right: 20px;
  width: 170px;
}
.xb-lib__group-btn{
  display: none;
}
.xb-lib__group-item{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  &.active{
    color: var(--el-color-primary);
  }
  &:hover{
    .xb-lib__group-btn{
       display: block;
    }
  }
}

.xb-lib__file-list {
  flex: 1;

}
.xb-lib__file-list-body {
  height: 455px;
}
.xb-lib__top-operate {
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
  height: 96px;
  width: 96px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.xb-lib__file-name {
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
    .xb-lib__select-mask {
      display: flex;
    }
  }
}
.xb-lib__dialog{
  &:deep(.el-dialog__body){
    max-height: auto;
  }
}
</style>
