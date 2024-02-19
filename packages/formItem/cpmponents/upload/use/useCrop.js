import { nextTick, ref, watch } from 'vue';
import Cropper from "cropperjs";
const useCrop = (props, ctx) => {
  // 是否显示截图弹窗
  const cropperDialogIsShow = ref(false);
  // 图片对象， 预览对象
  const imgRef = ref(null);
  const previewRef = ref(null);
  // 图片
  const imgSrc = ref('');
  // 裁剪实例
  let crop = '';
  // 确认
  const handleConfirm = () => {
    crop.getCroppedCanvas().toBlob((blob) => {
      const { name, type } = props.file;
      ctx.emit('confirm', new File([blob], name, { type }))
      cropperDialogIsShow.value = false
      imgSrc.value = ''
      crop = ''
    });
  }
  watch(() => props.file, (val) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(val);
    reader.onload = (e) => {
      imgSrc.value = URL.createObjectURL(new Blob([e.target.result]));
      nextTick(() => {
        crop = new Cropper(imgRef.value, {
          viewMode: 2,
          dragMode: "move",
          responsive: false,
          preview: previewRef.value,
        });
      })
    };
  })
  return {
    imgRef,
    previewRef,
    cropperDialogIsShow,
    handleConfirm,
    imgSrc
  }
}
export default useCrop