import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
const useList = (props) => {
  const groupId = ref("-1");
  const searchName = ref("");
  const fileInfo = reactive({
    list: [],
    total: 0,
  });
  const requestParams = reactive({
    page: 1,
    pageSize: 15,
    ...props.config.requestParams,
  });
  // 获取图库列表
  const getFileList = async () => {
    const {
      paramsFormat,
      hasGroup,
      requestApi,
      responseFormat,
      operationConfig,
      GroupIdKey = "groupId",
      searchIdKey = "fileName",
    } = props.config;
    if (!requestApi) return false;
    let params = requestParams;
    // 是否有分页
    if (hasGroup) {
      params = { ...params, [GroupIdKey]: groupId.value };
    }
    // 是否需要搜索
    if (operationConfig && operationConfig.hasSearch) {
      params = { ...params, [searchIdKey]: searchName.value };
    }
    // 是否需要格式化
    if (paramsFormat) {
      params = paramsFormat(params);
    }
    try {
      let res = await props.config.requestApi(params);
      responseFormat && (res = responseFormat(res));
      if (res.code === 1) {
        fileInfo.list = res.data.list;
        fileInfo.total = res.data.total || res.data.list.length;
      } else {
        ElMessage.error(res.msg || "获取失败");
      }
    } catch (err) {
      console.log(err);
      ElMessage.error("获取失败");
    }
  };
  // 分页切换
  const handlePageChange = (val) => {
    requestParams.page = val;
    getFileList();
  };
  // 搜索
  const handleSearch = () => {
    requestParams.page = 1;
    getFileList();
  };
  // 选择分类
  const handleChooseClassify = (id) => {
    groupId.value = id;
    getFileList();
  };

  return {
    groupId,
    searchName,
    fileInfo,
    requestParams,
    getFileList,
    handlePageChange,
    handleSearch,
    handleChooseClassify
  }
}
export default useList;