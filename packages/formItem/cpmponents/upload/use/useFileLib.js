import { ref } from "vue";
const useFileLib = () => {
  // lib 实例
  const fileLibRef = ref(null);
  // open  file lib
  const handleChooseFile = () => {
    fileLibRef.value.libDialogShow = true;
  }
 
  return {
    fileLibRef,
    handleChooseFile
  }
}

export default useFileLib;