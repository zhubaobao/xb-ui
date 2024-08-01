<template>
  <el-dialog
    title="剪裁"
    draggable
    v-model="cropperDialogIsShow"
    :width="580"
    destroy-on-close
  >
    <div class="xb-cropper">
      <div class="xb-cropper__img">
        <img :src="imgSrc" ref="imgRef" />
      </div>
      <div class="xb-cropper__preview">
        <h4>图像预览</h4>
        <div class="xb-cropper__preview__img" ref="previewRef"></div>
      </div>
    </div>
    <template #footer>
      <el-button @click="cropperDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent } from "vue";
import useCrop from "../use/useCrop";

export default defineComponent({
  name: "XbCrop",
  emits: ["confirm"],
  setup(props, ctx) {
    const {
      imgRef,
      previewRef,
      handleStartCrop,
      handleConfirm,
      imgSrc,
      cropperDialogIsShow,
    } = useCrop(props, ctx);
    return {
      imgRef,
      previewRef,
      handleStartCrop,
      cropperDialogIsShow,
      handleConfirm,
      imgSrc,
    };
  },
});
</script>
<style lang="less" scoped>
@import "cropperjs/dist/cropper.css";
.xb-cropper {
  height: 300px;
}
.xb-cropper__img {
  height: 100%;
  width: 400px;
  float: left;
  background: #ebeef5;
}
.xb-cropper__img img {
  display: none;
}
.xb-cropper__preview {
  width: 120px;
  margin-left: 20px;
  float: left;
}
.xb-cropper__preview h4 {
  font-weight: normal;
  font-size: 12px;
  color: #999;
  margin-bottom: 20px;
}
.xb-cropper__preview__img {
  overflow: hidden;
  width: 120px;
  height: 120px;
  border: 1px solid #ebeef5;
}
</style>
