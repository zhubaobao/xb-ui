import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { ensureStartingSlash, isArray, removeExtention } from '../utils'


export const useSidebar = () => {
  const route = useRoute()
  const { site, page } = useData()

  if (!page.value) {
    return {
      sidebars: computed(() => []),
      hasSidebar: computed(() => false),
    }
  }
  const sidebars = computed(() => {
    if (page.value.frontmatter.sidebar === false) return []
    const sidebars = getSidebarConfig(
      site.value.themeConfig.sidebar,
      route.data.relativePath,
    )
    return sidebars
  })

  return {
    sidebars,
    hasSidebar: computed(() => sidebars.value.length > 0),
  }
}

export function isSideBarConfig(sidebar) {
  return sidebar === false || sidebar === 'auto' || isArray(sidebar)
}
export function isSideBarGroup(item) {
  return item.children !== undefined
}
export function isSideBarEmpty(sidebar) {
  return isArray(sidebar) ? sidebar.length === 0 : !sidebar
}

type SidebarItem = {
  text: string
  link: string
}

type SidebarConfig = SidebarItem[]

type Sidebar =
  | {
    [key: string]: SidebarConfig
  }
  | false
  | 'auto'

export function getSidebarConfig(sidebar: Sidebar, path: string) {
  if (sidebar === false || Array.isArray(sidebar) || sidebar === 'auto') {
    return []
  }

  path = ensureStartingSlash(path)
  for (const dir in sidebar) {
    if (path.startsWith(ensureStartingSlash(`${dir}`))) {
      return sidebar[dir]
    }
  }
  return []
}
/**
 * Get flat sidebar links from the sidebar items. This method is useful for
 * creating the "next and prev link" feature. It will ignore any items that
 * don't have `link` property and removes `.md` or `.html` extension if a
 * link contains it.
 */
export function getFlatSideBarLinks(sidebar) {
  return sidebar.reduce((links, item) => {
    if (item.link) {
      links.push({ text: item.text, link: removeExtention(item.link) })
    }
    if (isSideBarGroup(item)) {
      links = [...links, ...getFlatSideBarLinks(item.children)]
    }
    return links
  }, [])
}
