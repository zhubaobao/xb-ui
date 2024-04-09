import { ref } from "vue";
import { ElMessage } from "element-plus";
const useOperate = (props, ctx, fileInfo, groupId, getFileList, chooseFileIndex) => {
	// 是否显示
	const libDialogShow = ref(false);
	// 取消
	const handleCancel = () => {
		libDialogShow.value = false;
		chooseFileIndex.value.clear();
	};
	// 选择文件
	const handleChooseFile = (index) => {
		// 判断是否存在
		if (chooseFileIndex.value.has(index)) {
			chooseFileIndex.value.delete(index);
		} else {
			if (props.limit == 1) {
				chooseFileIndex.value.clear();
			} else {
				if (props.limit == chooseFileIndex.value.size) return false;
			}
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
	// 上传加载
	const upLoading = ref(false)
	// 上传前
	const handleBeforeUpload = () => {
		if (groupId.value == -1) {
			ElMessage.error('请选择要上传的分类');
			return false;
		}
	}
	// 上传 
	const httpRequest = async (data) => {
		const { uRequestApi, uParamsFormat, uResponseFormat } = props.config;
		let params;
		if (uParamsFormat) {
			params = uParamsFormat({ file: data.file, groupId: groupId.value });
		} else {
			params = new FormData();
			formData.set('iFile', data.file);
			formData.set('groupId', groupId.value);
		}
		upLoading.value = true
		let res = await uRequestApi(params);
		upLoading.value = false
		uResponseFormat && (res = uResponseFormat(res));
		if (res.code === 1) {
			ElMessage.success('上传成功');
			getFileList();
		} else {
			ElMessage.error(res.msg || '上传失败')
		}
	}

	return {
		chooseFileIndex,
		libDialogShow,
		handleChooseFile,
		handleCancel,
		handleSubmit,
		// 上传
		upLoading,
		handleBeforeUpload,
		httpRequest
	}
}
export default useOperate;