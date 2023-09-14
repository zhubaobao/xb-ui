import { ElMessage } from 'element-plus'
/**
 * 表格内输入框排序
 * @param refresh 表格刷新方法
 * @returns {{handleSortBlur: Function, handleSortFocus: Function}}
 */
const useSort = (refresh) => {

	// 初次记录
	const handleSortFocus = (row, { prop }) => {
		if (!Object.hasOwnProperty.call(row, '__sort')) {
			row.__sort = row[prop]
		}
	}
	// 修改排序 appendData为可选的附加参数
	const handleSortBlur = async (row, { prop, paramsFormat, requestApi }) => {
		// 如果值不变
		if (row.__sort === row[prop] || row[prop] == '' || !requestApi) {
			row[prop] = row.__sort
			delete row.__sort;
			return;
		}
		const params = paramsFormat ? paramsFormat(row) : row
		let res = await requestApi(params);
		res = responseFormat(res)
		if (res.code === 1) {
			refresh();
			ElMessage.success('操作成功');
		} else {
			ElMessage.error(res.msg || '操作失败');
		}
		delete row.__sort;
	}
	return {
		handleSortFocus, handleSortBlur
	}
}


export default useSort
