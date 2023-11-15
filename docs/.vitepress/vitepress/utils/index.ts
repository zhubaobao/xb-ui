

import type { Route } from 'vitepress'

export * from './colors'



export const hashRE = /#.*$/;
export const extRE = /(index)?\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^[a-z]+:/i;
export function isNullish(value) {
  return value === null || value === undefined;
}
export function isArray(value) {
  return Array.isArray(value);
}
export function isExternal(path) {
  return outboundRE.test(path);
}
export function isActive(route, path) {
  if (path === undefined) {
    return false;
  }
  const routePath = normalize(`/${route.data.relativePath}`);
  const pagePath = normalize(path);
  return routePath === pagePath;
}




export function normalize(path) {
  return decodeURI(path).replace(hashRE, '').replace(extRE, '');
}
export function joinUrl(base, path) {
  const baseEndsWithSlash = base.endsWith('/');
  const pathStartsWithSlash = path.startsWith('/');
  if (baseEndsWithSlash && pathStartsWithSlash) {
    return base.slice(0, -1) + path;
  }
  if (!baseEndsWithSlash && !pathStartsWithSlash) {
    return `${base}/${path}`;
  }
  return base + path;
}

export function ensureStartingSlash(path) {
  return /^\//.test(path) ? path : `/${path}`;
}
export function removeExtention(path) {
  return path.replace(/(index)?(\.(md|html))?$/, '') || '/';
}


export function ensureEndingSlash(path) {
  return /(\.html|\/)$/.test(path) ? path : `${path}/`;
}



export function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)))
}

export const throttleAndDebounce = (fn: () => any, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>
  let called = false
  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (!called) {
      fn()
      called = true
      setTimeout(() => {
        called = false
      }, delay)
    } else {
      timeout = setTimeout(fn, delay)
    }
  }
}

// When match === true, meaning `path` is a string for build regex
export const isActiveLink = (
  route: Route,
  pathPattern: string,
  match?: boolean
) => {
  if (!match) return isActive(route, pathPattern)
  const regex = new RegExp(pathPattern)

  return regex.test(normalize(`/${route.data.relativePath}`))
}

export function createGitHubUrl(
  docsRepo: string,
  docsDir: string,
  docsBranch: string,
  path: string,
  folder = 'examples/',
  ext = '.vue'
) {
  const base = isExternal(docsRepo)
    ? docsRepo
    : `https://github.com/${docsRepo}`
  return `${base.replace(endingSlashRE, '')}/edit/${docsBranch}/${docsDir ? `${docsDir.replace(endingSlashRE, '')}/` : ''
    }${folder || ''}${path}${ext || ''}`
}

export function createCrowdinUrl(targetLang: string) {
  let translateLang = ''
  // for zh-CN zh-HK zh-TW, maybe later we will have cases like Chinese lang
  // for now we just keep it as simple as possible.
  if (targetLang.startsWith('zh-')) {
    translateLang = targetLang.split('-').join('').toLocaleLowerCase()
  } else {
    translateLang = targetLang.split('-').shift()!.toLocaleLowerCase()
  }
  return `https://crowdin.com/translate/element-plus/all/en-${translateLang}`
}
