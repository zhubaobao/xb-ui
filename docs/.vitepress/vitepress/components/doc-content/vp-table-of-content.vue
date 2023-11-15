<script setup lang="ts">
import { computed, ref } from "vue";
import MarkdownIt from "markdown-it";
import { useToc } from "../../composables/use-toc";
import { useActiveSidebarLinks } from "../../composables/active-bar";

import tag from "../../../plugins/tag";

const localMd = MarkdownIt().use(tag);
const headers = useToc();
const marker = ref();
const container = ref();
useActiveSidebarLinks(container, marker);
</script>

<template>
  <aside ref="container" class="toc-wrapper">
    <nav class="toc-content">
      <h3 class="toc-content__heading">Contents</h3>
      <ul class="toc-items">
        <li
          v-for="{ link, text, children } in headers"
          :key="link"
          class="toc-item"
        >
          <a
            class="toc-link"
            :href="link"
            :title="text"
            v-html="localMd.render(text)"
          />
          <ul v-if="children">
            <li
              v-for="{ link: childLink, text: childText } in children"
              :key="childLink"
              class="toc-item"
            >
              <a
                class="toc-link subitem"
                :href="childLink"
                :title="text"
                v-html="localMd.render(childText)"
              />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>
