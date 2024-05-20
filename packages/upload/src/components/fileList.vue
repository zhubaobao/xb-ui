<template>
  <draggable
    class="xb-upload-list"
    item-key="id"
    :list="previewList"
    @end="handleDragEnd"
    :disabled="disabled"
  >
    <template #item="{ index }">
      <div
        class="xb-upload-item__item-w"
        :style="{ width: size.width + 'px', height: size.height + 'px' }"
      >
        <div class="xb-upload-item__loading" v-if="!fileTypeList[index]">
          <el-icon class="xb-upload-item_loading-icon"
            ><component :is="'xb-icon-loading'"
          /></el-icon>
        </div>
        <template v-else>
          <el-image
            :src="
              fileTypeList[index].type == 'image'
                ? fileTypeList[index].image
                : file
            "
            class="xb-upload-item"
            :fit="fileTypeList[index].type == 'image' ? 'contain' : 'none'"
          ></el-image>
          <label class="xb-upload-list__item-status-label">
            <el-icon class="xb-icon--upload-success"
              ><component :is="'xb-icon-check'" /></el-icon
          ></label>
          <div
            class="xb-upload__operation-mask"
            :style="{ cursor: disabled ? 'default' : 'move' }"
          >
            <el-icon
              class="xb-upload__operation-preview"
              @click="handlePreviewShow(fileTypeList[index])"
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
    </template>
  </draggable>
  <!-- 图片预览 -->
  <el-image-viewer
    v-if="previewInfo.isShow"
    @close="handlePreviewClose('image')"
    :url-list="[previewInfo.url]"
  />
  <!-- 视屏预览 -->
  <div class="xb-file-preview-mask" v-if="videoPreview.isShow">
    <div
      class="xb-file-preview__close-btn el-image-viewer__btn el-image-viewer__close"
      @click="handlePreviewClose('video')"
    >
      <el-icon><component :is="'xb-icon-close'" /></el-icon>
    </div>
    <video :src="videoPreview.url" controls></video>
  </div>
</template>
<script>
import { computed, defineComponent, reactive } from "vue";
// tool
import { getFileType } from "main/utils";
// component
import draggable from "vuedraggable";
// icons
import XbIconLoading from "main/icons/loading";
import XbIconDelete from "main/icons/delete";
import XbIconCheck from "main/icons/check";
import XbIconZoomIn from "main/icons/zoomIn";
import XbIconClose from "main/icons/close";
import file from "main/images/file.svg";
export default defineComponent({
  name: "XbFileList",
  components: {
    XbIconLoading,
    XbIconDelete,
    XbIconCheck,
    XbIconZoomIn,
    XbIconClose,
    draggable,
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
    disabled: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Object,
      default: () => ({
        width: 110,
        height: 110,
      }),
    },
  },
  emits: ["delete", "dragEnd"],
  setup(props, ctx) {
    // 包含文件类型的文件
    const fileTypeList = computed(() => {
      return props.fileList.map((item) => {
        return {
          type: getFileType(item.image),
          ...item,
        };
      });
    });
    console.log(fileTypeList, "fileTypeList");
    // 查看大图图片列表
    // const bigImageList = computed(() => {
    //   return props.fileList.map((item) => item.image);
    // });
    // 图片预览窗口信息
    const previewInfo = reactive({
      isShow: false,
      initIndex: 0,
      url: "",
    });
    // 视屏预览
    const videoPreview = reactive({
      isShow: false,
      url: "",
    });
    // 文件预览
    const handlePreviewShow = (info) => {
      const { image, type } = info;
      if (type === "image") {
        previewInfo.url = image;
        previewInfo.isShow = true;
      } else if (type === "video") {
        videoPreview.isShow = true;
        videoPreview.url = image;
      } else {
        window.open(image, "_blank");
      }
    };
    // 文件删
    const handleFileDelete = (index) => {
      ctx.emit("delete", index);
    };
    // 关闭预览
    const handlePreviewClose = (type) => {
      if (type === "image") {
        previewInfo.isShow = false;
      } else {
        videoPreview.isShow = false;
      }
    };
    // 拖拽结束
    const handleDragEnd = (event) => {
      ctx.emit("dragEnd", event);
    };

    return {
      fileTypeList,
      previewInfo,
      // bigImageList,
      videoPreview,
      handlePreviewShow,
      handleFileDelete,
      handlePreviewClose,
      handleDragEnd,
      file,
    };
  },
});
</script>
<style lang="less" scoped>
.xb-file-preview__close-btn {
}
.xb-file-preview-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  video {
    width: 50%;
    height: 50%;
    background: #000;
  }
}
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
  float: left;
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
  margin-left: 10px;
  cursor: pointer;
}
.xb-upload__operation-preview {
  cursor: pointer;
}
</style>
