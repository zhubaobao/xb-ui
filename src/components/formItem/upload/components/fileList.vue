<template>
  <div class="xb-upload-list" v-if="previewList.length">
    <div
      class="xb-upload-item__item-w"
      v-for="(item, index) in previewList"
      :key="index"
    >
      <div class="xb-upload-item__loading" v-if="!fileList[index]">
        <el-icon class="xb-upload-item_loading-icon"
          ><component :is="'xb-icon-loading'"
        /></el-icon>
      </div>
      <template v-else>
        <el-image
          :src="fileList[index]"
          class="xb-upload-item"
          fit="contain"
        ></el-image>
        <label class="xb-upload-list__item-status-label">
          <el-icon class="xb-icon--upload-success"
            ><component :is="'xb-icon-check'" /></el-icon
        ></label>
        <div class="xb-upload__operation-mask">
          <el-icon
            class="xb-upload__operation-preview"
            @click="handlePreviewShow(index)"
            ><component :is="'xb-icon-zoom-in'"
          /></el-icon>
          <el-icon
            class="xb-upload__operation-delete"
            @click="handleFileDelete(index)"
            ><component :is="'xb-icon-delete'"
          /></el-icon>
        </div>
      </template>
    </div>
    <!-- 图片预览 -->
    <el-image-viewer
      v-if="previewInfo.isShow"
      @close="handlePreviewClose"
      :url-list="fileList"
      :initialIndex="previewInfo.initIndex"
    />
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
// icons
import XbIconLoading from "main/icons/loading";
import XbIconDelete from "main/icons/delete";
import XbIconCheck from "main/icons/check";
import XbIconZoomIn from "main/icons/zoomIn";
export default defineComponent({
  name: "XbFileList",
  components: {
    XbIconLoading,
    XbIconDelete,
    XbIconCheck,
    XbIconZoomIn,
  },
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    previewList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["delete"],
  setup(props, ctx) {
    // 图片预览窗口信息
    const previewInfo = reactive({
      isShow: false,
      initIndex: 0,
    });
    // 图片预览
    const handlePreviewShow = (index) => {
      previewInfo.initIndex = index;
      previewInfo.isShow = true;
    };
    // 文件删除
    const handleFileDelete = (index) => {
      ctx.emit("delete", index);
    };
    // 关闭预览
    const handlePreviewClose = () => {
      previewInfo.isShow = false;
    };
    return {
      previewInfo,
      handlePreviewShow,
      handleFileDelete,
      handlePreviewClose,
    };
  },
});
</script>
<style lang="less" scoped>
.xb-upload__tip {
  color: red;
  margin-bottom: 5px;
  padding-left: 10px;
}
.xb-upload-item {
  width: 100%;
  height: 100%;
}
.xb-upload-item__loading {
  background-color: var(--el-overlay-color-lighter);
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.xb-upload-item_loading-icon {
  font-size: 30px;
  animation: load 2s linear infinite;
}
@keyframes load {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.xb-upload-item__progress {
  width: 90%;
}
.xb-upload-list {
  display: flex;
  flex-wrap: wrap;
}
.xb-upload-list__item-status-label {
  right: -15px;
  top: -6px;
  width: 40px;
  height: 24px;
  background: var(--el-color-success);
  text-align: center;
  transform: rotate(45deg);
  position: absolute;
  justify-content: center;
  align-items: center;
  transition: opacity var(--el-transition-duration);
  color: #fff;
}
.xb-upload-item__item-w {
  width: 148px;
  height: 148px;
  margin-right: 10px;
  position: relative;
  overflow: hidden;
  background-color: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color);
  margin-bottom: 10px;
  border-radius: 6px;
  &:hover .xb-upload__operation-mask {
    opacity: 1;
  }
}

.xb-icon--upload-success {
  color: #fff;
  font-size: 12px;
  margin-top: 11px;
  transform: rotate(-45deg);
}
.xb-upload__operation-mask {
  background-color: var(--el-overlay-color-lighter);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
  opacity: 0;
}
.xb-upload__operation-delete {
  margin-left: 1rem;
  cursor: pointer;
}
.xb-upload__operation-preview {
  cursor: pointer;
}
</style>
