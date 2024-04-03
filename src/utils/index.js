
import { isReactive, isRef, toRaw, unref } from 'vue';
/**
 * 判断是否
 *
 * @param {*} obj 对象
 * @return {Boolean} 是否是对象 true 是
 */
export const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
/**
 * 深层合并
 *
 * @param {Objec} source 原对象
 * @param {Objec} target 合并对象
 * @return {Objec}       返回一个新对象
 */

export const deepMerge = (source, target) => {
  const _source = source; // 浅拷贝
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      const cur = target[key]

      // 是否需要递归
      const hasNeedDeep = isObject(cur) && _source[key] && !isRef(cur) && !isReactive(cur);
      _source[key] = hasNeedDeep ? deepMerge(_source[key], cur) : cur
    }
  }
  return _source
}

/**
 * @description: 根据给定的时间（Date）和格式，返回对应格式的时间字符串
 * @param date 当前时间（Date）
 * @param fmt 所需格式
 * @return 格式化后的时间字符串
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  const keys = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'ms+': date.getMilliseconds(),
  };
  for (const k in keys) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = String(keys[k]);
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

/**
 * 深拷贝
 *
 * @param {*} target 目标对象
 * @return {*}       返回新对象
 */
export const deepCopy = (target, map = new Map()) => {
  // 如果数据是 ref，获取原始数据
  if (isRef(target)) {
    target = unref(target);
  }
  // 如果数据是 reactive，获取原始数据
  if (isReactive(target)) {
    target = toRaw(target);
  }
  // 如果数据为原始数据类型、function、null，直接返回数据
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  // 如果数据为日期对象，返回时间字符串
  if (target instanceof Date) {
    return formatDate(target, 'yyyy-MM-dd hh:mm:ss');
  }
  // 循环引用
  const cloneTarget = map.get(target);
  if (cloneTarget) {
    return cloneTarget;
  }
  // 创建空对象，并存入 map
  const clone = Array.isArray(target) ? [] : {};
  map.set(target, clone);
  // 递归拷贝对象
  for (const key in target) {
    clone[key] = deepCopy(target[key], map);
  }
  return clone;
};

/**
 * 获取插槽内容配置信息
 * @param {*} currentInstance 当前实例
 * @param {*} slotNames slot key 值
 * @param {*} config 配置信息
 * @param {*} prefix 前缀
 * @param {*} suffix 后缀
 * @returns 
 */
const getFristUpperCase = (word) => {
  return word.charAt(0).toUpperCase()
    + word.slice(1)
}
export const getSlots = (currentInstance, slotNames, config, prefix = '', suffix = '') => {
  // slot 数量
  let count = 0;
  // 结果集合
  let reslut = {};
  // 初始化集合
  slotNames.forEach(item => {
    reslut[item] = [];
  })
  // 过滤slotNames 
  let _slotNames = [];
  // 自定义表单/表格
  if (config.type == 'template' || config.contentType == 'template') {
    _slotNames.push('default');
    count++;
  }
  // 表单插槽
  if (config.slots) {
    for (let key in config.slots) {
      const val = config.slots[key];
      if (!reslut[key]) continue;
      if (val == 'xbTemplate') {
        _slotNames.push(key);
        count++;
      } else {
        reslut[key].push({
          name: key,
          con: val
        })
      };

    }
  }
  if (count <= 0) return reslut;
  /// 迭代获取符合条件的slots 
  let parent = currentInstance.parent;
  while (parent) {
    _slotNames.forEach(slotName => {
      const key = prefix + (slotName == 'default' ? '' : getFristUpperCase(slotName)) + suffix;
      const slot = parent.slots[key];
      if (slot) {
        reslut[slotName].push(
          {
            name: slotName,
            slot: slot
          }
        )
        count--;
        // 把找到的插槽添加到当前组件中
        currentInstance.slots[key] = slot;
      }
    })
    // 如果都找到就直接返回
    if (count <= 0) break;
    // 如果没有找到就继续往上找
    parent = parent.parent;
  }
  return reslut;
}

/**
 * 按钮是否显示
 * @param {*} condition 条件
 * @param {*} opts 其他配置信息
 */
export const hasBtnShow = (condition, opts) => {
  if (typeof condition === 'function') {
    return condition(opts)
  } else {
    return !!condition
  }
}


/*
 根据文件名称判断文件类型
 * @param: path - 文件名称
 * @param: 无后缀匹配 - false
 * @param: 匹配图片 - image
 * @param: 匹配 txt - txt
 * @param: 匹配 表格 - excel
 * @param: 匹配 文档 - word
 * @param: 匹配 pdf - pdf
 * @param: 匹配 ppt - ppt
 * @param: 匹配 视频 - video
 * @param: 匹配 音频 - radio
 * @param: 其他匹配项 - other
 */
export const getFileType = (path) => {
  // 后缀获取
  let suffix = '';
  try {
    suffix = path.match(/\.[^\.]+$/)[0].replace(/\./, "");
  } catch (err) {
    suffix = '';
  }
  // fileName无后缀返回 false
  if (!suffix) { return 'other'; }
  suffix = suffix.toLocaleLowerCase();
  // 图片格式
  const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg'];
  if (imglist.includes(suffix)) {
    return 'image';
  }
  // 匹配 视频
  const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
  if (videolist.includes(suffix)) {
    return 'video';
  }
  // 其他 文件类型
  return 'other';
}

