<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useEventListener, useParallax, useThrottleFn } from "@vueuse/core";
import type { CSSProperties } from "vue";

const target = ref<HTMLElement | null>(null);
const parallax = reactive(useParallax(target));
const jumbotronRef = ref<HTMLElement | null>(null);

function jumpTo(path: string) {
  location.href = path;
}

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: ".3s ease-out all",
  position: "relative",
  perspective: "300px",
};

const cardStyle = computed(() => ({
  height: "30rem",
  width: "100%",
  transition: ".3s ease-out all",
  transform: `rotateX(${parallax.roll}deg) rotateY(${parallax.tilt}deg)`,
}));

const layerBase: CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  transition: ".3s ease-out all",
};

const screenLayer = computed(() => ({
  ...layerBase,
  width: "80%",
  height: "80%",
  transform: `translateX(${parallax.tilt * 10 + 80}px) translateY(${
    parallax.roll * 10 + 50
  }px)`,
}));

const peopleLayer = computed(() => ({
  ...layerBase,
  width: "30%",
  height: "30%",
  right: 0,
  bottom: 0,
  transform: `translateX(${parallax.tilt * 25 + 25}px) translateY(${
    parallax.roll * 25
  }px) scale(1)`,
}));

// center layer
const leftLayer = computed(() => ({
  ...layerBase,
  width: "20%",
  height: "20%",
  transform: `translateX(${parallax.tilt * 12 + 205}px) translateY(${
    parallax.roll * 12 + 210
  }px)`,
}));

const leftBottomLayer = computed(() => ({
  ...layerBase,
  width: "30%",
  height: "30%",
  left: 0,
  bottom: 0,
  transform: `translateX(${parallax.tilt * 30 - 10}px) translateY(${
    parallax.roll * 30
  }px)`,
}));

const rightLayer = computed(() => ({
  ...layerBase,
  width: "33%",
  height: "33%",
  top: 0,
  right: 0,
  transform: `translateX(${parallax.tilt * 25 + 5}px) translateY(${
    parallax.roll * 25
  }px)`,
}));
</script>

<template>
  <div ref="target" class="home-page">
    <div class="banner" text="center">
      <div class="banner-desc" m="t-4">
        <h1>xb-ui</h1>
        <p m="t-2">一款基于Element-Plus开发的组件库，使用于后台管理系统</p>
      </div>
    </div>

    <div ref="jumbotronRef" class="jumbotron">
      <div class="parallax-container" :style="containerStyle">
        <div :style="cardStyle">
          <screen-svg :style="screenLayer" alt="banner" />
          <people-svg
            :style="peopleLayer"
            alt="banner"
            class="cursor-pointer"
            @click="jumpTo('/component/curdTable.html')"
          />
          <left-layer-svg :style="leftLayer" alt="banner" />
          <left-bottom-layer-svg :style="leftBottomLayer" alt="banner" />
          <right-layer-svg :style="rightLayer" alt="banner" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../styles/mixins" as *;

.home-page {
  .mobile-banner {
    display: none;
  }

  .banner-dot h1 span {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: -12px;
      bottom: 8px;
      background: var(--el-color-primary);
      height: 8px;
      width: 8px;
      border-radius: 100%;
    }
  }
  .banner-desc {
    h1 {
      font-size: 34px;
      margin: 0;
      line-height: 48px;
      color: var(--text-color);
    }

    p {
      font-size: 18px;
      color: var(--text-color-light);
    }
  }

  .count-down {
    .cd-main {
      background: #f1f6fe;
      border-radius: 10px;
      width: 50%;
      margin: 60px auto 120px;
      padding: 30px 0;
      font-size: 24px;
      color: #666;
      text-align: center;
      font-weight: 600;
    }
    .cd-date {
      font-size: 28px;
    }
    .cd-time {
      display: flex;
      justify-content: space-between;
      width: 80%;
      margin: 10px auto 0;
    }
    .cd-num {
      color: var(--el-color-primary);
      font-size: 78px;
      font-weight: bold;
    }
    .cd-num span {
      width: 50%;
      display: inline-block;
    }
    .cd-str {
      font-size: 22px;
      margin-top: -5px;
    }
  }

  .jumbotron {
    width: 800px;
    margin: 20px auto;
    position: relative;

    img {
      width: 100%;
    }

    .parallax-container {
      width: 800px;
    }
  }

  @media screen and (max-width: 959px) {
    .jumbotron {
      display: none !important;
    }

    .mobile-banner {
      display: inline-block;
    }
  }

  @media (max-width: 768px) {
    .jumbotron {
      width: 50%;
      display: flex;
      margin: auto;
      justify-content: center;
      align-items: center;

      .parallax-container {
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    .banner-desc {
      padding-top: 0px;
    }
    .cards {
      li {
        width: 80%;
        margin: 0 auto 20px;
        float: none;
      }
      .card {
        height: auto;
        padding-bottom: 54px;
      }
    }
    .banner-stars {
      display: none;
    }
    .banner-desc {
      h1 {
        font-size: 22px;
      }
      #line2 {
        display: none;
      }
      h2 {
        font-size: 32px;
      }
      p {
        width: auto;
      }
    }
    .banner-dot h1 span {
      &::after {
        right: -8px;
        bottom: 2px;
        height: 6px;
        width: 6px;
      }
    }
    .count-down {
      .cd-main {
        width: 90%;
        margin: 40px auto 40px;
        padding: 20px 0;
      }
      .cd-date {
        font-size: 22px;
      }
      .cd-num {
        font-size: 38px;
      }
      .cd-str {
        font-size: 12px;
        margin-top: 0px;
      }
    }
    .sponsors-list {
      display: flex;
      flex-direction: column;
      align-content: center;
      .sponsor {
        justify-content: left;
      }
    }
  }
  .theme-intro-b {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    .intro-banner {
      position: absolute;
    }
    img {
      width: 300px;
    }
    .title {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      color: #fff;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        padding: 0;
        margin: 10px 0;
      }
    }
  }
  .theme-intro-a {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    .mask {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #000;
      opacity: 0.5;
    }
    .intro-banner {
      top: 50%;
      left: 50%;
      position: fixed;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      text-align: center;
      z-index: 100;
      img {
        width: 100%;
      }
      .intro-text {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        p {
          padding: 0;
          margin: 0;
          font-size: 48px;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
}

.dark {
  .parallax-container {
    filter: drop-shadow(0px 0px 10px #409eff);
  }
}
</style>
