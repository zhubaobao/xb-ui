<template>
  <div class="xb-upload">
    <!-- 展示列表 -->
    <xb-file-list
      ref="fileListRef"
      @delete="handleFileDelete"
      :fileList="searchVal"
      :previewList="previewList"
    ></xb-file-list>
    <!-- 上传 -->
    <el-upload
      v-if="previewList.length !== config.limit"
      action="#"
      class="xb-uploader"
      :show-file-list="false"
      :http-request="handleRequest"
    >
      <slot>
        <div class="xb-upload__file-empty">
          <el-icon><component :is="'xb-icon-plus'" /></el-icon>
        </div>
      </slot>
    </el-upload>
    <!-- 裁剪 -->
    <xb-crop
      ref="cropRef"
      :file="file"
      v-if="config.hasCrop"
      @confirm="handleCropConfirm"
    />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import XbCrop from "./components/crop";
import XbFileList from "./components/fileList";
import useMergeConfig from "./use/useMergeConfig";
import useUpload from "./use/useUpload";
import XbIconPlus from "main/icons/plus";
export default defineComponent({
  name: "XbUpload",
  components: {
    XbCrop,
    XbFileList,
    XbIconPlus,
  },
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["eventChange"],
  setup(props, ctx) {
    const { config } = useMergeConfig(props);
    const { handleRequest, handleFileDelete, searchVal, file, previewList } =
      useUpload(props, ctx, config, props.configData);

    return {
      config,
      searchVal,
      previewList,
      file,
      handleFileDelete,
      handleRequest,
    };
  },
});
</script>
<style lang="less" scoped>
.xb-uploader:deep(.el-upload) {
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
.xb-upload__file-empty {
  width: 148px;
  height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: var(--el-text-color-secondary);
  background-color: var(--el-fill-color-lighter);
}
</style>