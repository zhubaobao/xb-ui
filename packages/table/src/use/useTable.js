import { isRef, onMounted, reactive, ref, watch } from "vue";
import { ElMessageBox, ElMessage } from 'element-plus';
const useCureTable = (props, ctx, config) => {

  // 表单数据
  const tableInfo = reactive({
    loading: config.tableDataLoading,
    dataList: config.tableDataList,
    pageSize: 0,
    total: 0,
  });
  // 初始化的值
  // table 请求参数, 合并所有 requestParams 配置
  const requestParams = ref({ page: 1, pageSize: 20, ...props.requestParams, ...config.requestParams });
  // 获取数据
  const getData = async () => {
    const { requestApi, responseFormat, paramsFormat } = config;
    if (typeof requestApi !== "function") return false;
    tableInfo.loading = true;
    const params = paramsFormat(requestParams.value);
    try {
      let res = await requestApi(params);
      res = responseFormat(res)
      if (res.code === 1) {
        tableInfo.dataList = res.data.list;
        tableInfo.total = res.data.total || res.data.list.length;
        tableInfo.pageSize = res.data.pageSize || requestParams.value.pageSize;
      } else {
        ElMessage.error(res.msg || '加载失败')
      }
    } catch (err) {
      console.log(err);
      ElMessage.error('加载失败')
    }

    tableInfo.loading = false;
  };
  // 页码的改变
  const handlePageChange = (val) => {
    requestParams.value.page = val;
    getData();
  }
  // 添加
  const handleAdd = () => {
    ctx.emit('add')
  }
  // 修改
  const handleEdit = (data) => {
    ctx.emit('edit', data)
  }
  // 复制
  const handleCopy = (data) => {
    ctx.emit('copy', data)
  }
  // 删除
  const handleDelete = async (data) => {
    await ElMessageBox.confirm(
      '是否确定删除?',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }
    );
    const { deleteIdKey, deleteItemIdKey, requestApi, responseFormat, paramsFormat } = config.deleteConfig;
    const ids = data.map((item) => item[deleteItemIdKey])
    if (!ids.length) {
      ElMessage.error('请至少选择一条要删除的内容')
      return false
    }
    try {
      let params = paramsFormat ? paramsFormat(ids) : { [deleteIdKey]: ids }
      let res = await requestApi(params)
      // 返回值格式
      res = responseFormat(res)
      if (res && res.code === 1) {
        ElMessage.success('删除成功')
        getData()
      } else {
        ElMessage.error(res.msg || '删除失败')
      }
    } catch (err) {
      console.log(err);
      ElMessage.error('删除失败')
    }
  }
  onMounted(() => {
    getData();
  });

  // 监听搜索值的改变
  watch(() => props.requestParams, (val) => {
    requestParams.value = { ...requestParams.value, ...val }
    getData()
  });
  return {
    tableInfo,
    requestParams,
    getData,
    handlePageChange,
    handleAdd,
    handleEdit,
    handleDelete,
    handleCopy,
  };
};
export default useCureTable;
