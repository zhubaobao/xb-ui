<script setup >
import { computed, getCurrentInstance, ref } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { CaretTop, CopyDocument } from '@element-plus/icons-vue'
import XbExample from './xb-example.vue'
import XbSourceCode from './xb-source-code.vue'
import XbIconCode from '../icons/xb-icon-code.vue'

const props = defineProps({
  demos: {
    type: Object,
    default: () => ({}),
  },
  source: String,
  path: String,
  rawSource: String,
  description: String,
})

const vm = getCurrentInstance();

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible, toggleSourceVisible] = useToggle()

const sourceCodeRef = ref();

const formatPathDemos = computed(() => {
  const demos = {}
  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('../examples/', '').replace('.vue', '')] =
      props.demos[key].default
  })

  return demos
})

const decodedDescription = computed(() =>
  decodeURIComponent(props.description)
)


const onSourceVisibleKeydown = (e) => {
  if (['Enter', 'Space'].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
}

const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $message.error('不支持复制');
  }
  try {
    await copy()
    $message.success('复制成功')
  } catch (e) {
    $message.error(e.message)
  }
}
</script>

<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription"></p>
    <div class="example">
      <div  v-html="decodeURIComponent(props.rawSource)"></div>
      <xb-example :file="path" :demo="formatPathDemos[path]" ></xb-example>
      <el-divider class="m-0" />
      <div class="op-btns">       
        <el-tooltip
          content="复制代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          
          <el-icon
            :size="16"
            aria-label="复制代码"
            class="op-btn"
            tabindex="0"
            role="button"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode"
          >
            <CopyDocument/>
          </el-icon>
        </el-tooltip>
        <el-tooltip
          content="查看源代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <button
            ref="sourceCodeRef"
            :aria-label="
              sourceVisible ? '隐藏源代码' : '查看源代码'
            "
            class="reset-btn el-icon op-btn"
            @click="toggleSourceVisible()"
          >
            <ElIcon :size="16">
              <XbIconCode/>
            </ElIcon>
          </button>
        </el-tooltip>
      </div>

      <el-collapse-transition>
        <xb-sourceCode v-show="sourceVisible" :source="source" ></xb-sourceCode>
      </el-collapse-transition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown"
        >
          <ElIcon :size="16">
            <CaretTop />
          </ElIcon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.example {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  
  .m-0{
    margin: 0;
  }
  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}

</style>
