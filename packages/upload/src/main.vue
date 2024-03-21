<template>
  <div class="xb-upload">
    <!-- 展示列表 -->
    <xb-file-list
      @delete="handleFileDelete"
      @dragEnd="handleDragEnd"
      :previewList="previewList"
      :fileList="searchVal"
      :disabled="!config.hasDrag"
      :size="{
        width: configData.width || 110,
        height: configData.height || 110,
      }"
    >
    </xb-file-list>
    <template v-if="previewList.length !== config.limit">
      <!-- 图库选择 -->
      <div
        class="xb-uploader"
        @click="handleChooseFile"
        v-if="config.uploadType == 'library'"
      >
        <div class="el-upload el-upload--text">
          <div
            class="xb-upload__file-empty"
            :style="{
              width: (configData.width || 110) + 'px',
              height: (configData.height || 110) + 'px',
            }"
          >
            <el-icon><component :is="'xb-icon-plus'" /></el-icon>
          </div>
        </div>
      </div>
      <!-- 直接上传 -->
      <el-upload
        v-else
        action="#"
        class="xb-uploader"
        :show-file-list="false"
        :http-request="handleRequest"
        v-bind="config.propAttrs"
      >
        <slot>
          <div
            class="xb-upload__file-empty"
            :style="{
              width: (configData.width || 110) + 'px',
              height: (configData.height || 110) + 'px',
            }"
          >
            <el-icon><component :is="'xb-icon-plus'" /></el-icon>
          </div>
        </slot>
      </el-upload>
    </template>

    <!-- 裁剪 -->
    <xb-crop ref="cropRef" v-if="config.hasCrop" @confirm="handleCropConfirm" />
    <!-- 图库 -->
    <xb-file-lib
      v-if="config.uploadType == 'library'"
      ref="fileLibRef"
      :config="config.libConfig || {}"
      :keysCustom="config.keysCustom"
      :limit="config.limit - searchVal.length"
      @submit="handleLibSubmit"
    ></xb-file-lib>
  </div>
</template>
<script>
import { defineComponent } from "vue";
// component
import XbCrop from "./components/crop";
import XbFileList from "./components/fileList";
import XbFileLib from "./components/fileLib";
// use
import useMergeConfig from "./use/useMergeConfig";
import useUpload from "./use/useUpload";
import useFileLib from "./use/useFileLib";
// icon
import XbIconPlus from "main/icons/plus";
export default defineComponent({
  name: "XbUpload",
  components: {
    XbCrop,
    XbFileList,
    XbFileLib,
    XbIconPlus,
  },
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: [String, Array, Object],
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const { config } = useMergeConfig(props);
    const {
      handleRequest,
      handleFileDelete,
      searchVal,
      previewList,
      handleDragEnd,
      handleLibSubmit,
      handleCropConfirm,
      cropRef,
    } = useUpload(props, ctx, config);
    const { handleChooseFile, fileLibRef } = useFileLib();
    return {
      config,
      searchVal,
      previewList,
      handleFileDelete,
      handleRequest,
      handleDragEnd,
      // 图库
      handleChooseFile,
      fileLibRef,
      handleLibSubmit,
      handleCropConfirm,
      cropRef,
    };
  },
});
</script>
<style lang="less" scoped>
.xb-upload {
  width: 100%;
  overflow: hidden;
}
.xb-uploader {
  margin-bottom: 10px;
  float: left;
  &:deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}
.xb-upload__file-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: var(--el-text-color-secondary);
  background-color: var(--el-fill-color-lighter);
}
</style>