<template>
  <el-main class="xb-form-page__page" v-if="modelValue">
    <div class="xb-form-page__main">
      <h2 class="xb-form-page__title">{{ title }}</h2>
      <div class="xb-form-page__form">
        <slot></slot>
      </div>
    </div>
  </el-main>
</template>

<script>
import { defineComponent, watch } from "vue";
export default defineComponent({
  name: "XbFormPage",
  props: {
    title: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "open", "closed"],
  setup(props, ctx) {
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          ctx.emit("open");
        } else {
          ctx.emit("closed");
        }
      }
    );
  },
});
</script>
<style lang="less" scoped>
.xb-form-page__page {
  height: 100%;
  box-sizing: border-box;
}
.xb-form-page__main {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
}
.xb-form-page__title {
  padding: 0 20px;
  margin: 0;
  height: 65px;
  line-height: 65px;
  font-size: 17px;
}
.xb-form-page__form {
  padding: 0 20px 60px;
  height: calc(100% - 65px);
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}
</style>
