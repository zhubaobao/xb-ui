<script setup lang="ts">
import { computed } from "vue";

import VPNavbarMenu from "./navbar/vp-menu.vue";
import VPNavbarThemeToggler from "./navbar/vp-theme-toggler.vue";

defineEmits(["toggle"]);
</script>

<template>
  <div class="navbar-wrapper">
    <div class="header-container">
      <div class="logo-container">
        <a href="/">
          <img class="logo" src="/images/xb-logo.png" alt="xb-ui" />
          xb-ui
        </a>
      </div>
      <div class="content">
        <VPNavbarMenu class="menu" />
        <VPNavbarThemeToggler class="theme-toggler" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  height: var(--header-height);
  > a {
    height: 28px;

    display: flex;
    align-items: center;
  }
  img {
    margin-right: 10px;
  }
  .logo {
    position: relative;
    height: 100%;
  }
}
.dark {
  .logo {
    filter: drop-shadow(2px 2px 6px #409eff);
  }
}
</style>
