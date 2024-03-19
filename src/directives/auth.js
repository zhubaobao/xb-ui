import tool from '@/utils/tool';
/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="'xxx'"）
 */
export default {
  mounted(el, binding) {
    let permissions = tool.local.get("PERMISSIONS") || [];
    if (!permissions.includes(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
}