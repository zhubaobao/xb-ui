import { ref } from "vue";
const useGroup = (props) => {
	// 获取分类列表
	const classifyList = ref([]);
	const getClassifyList = async () => {
		const { cRequestApi, cParamsFormat, cResponseFormat } = props.config;
		const params = cParamsFormat ? cParamsFormat() : {};
		let res = await cRequestApi(params);
		res = cResponseFormat(res);
		if (res.code == 1) {
			classifyList.value = res.data.length
				? [{ name: "全部", id: -1 }].concat(res.data)
				: [];
		}
	};
	return {
		classifyList,
		getClassifyList
	}
}
export default useGroup;