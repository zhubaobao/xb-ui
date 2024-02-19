import{_ as t,o as d,c as r,Q as e}from"./chunks/framework.e6e3836b.js";const u=JSON.parse('{"title":"Submit","description":"","frontmatter":{"title":"Submit"},"headers":[],"relativePath":"component/submit.md","filePath":"component/submit.md"}'),a={name:"component/submit.md"},o=e('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><table><thead><tr><th>属性</th><th>说明</th><th>Type</th><th>默认值</th></tr></thead><tbody><tr><td>popupType</td><td>窗口类型，drawer(抽屉)/dialog(弹窗)</td><td>string</td><td>drawer</td></tr><tr><td>popupAttrs</td><td>窗口样式，详见<a href="https://element-plus.org/zh-CN/component/drawer.html#%E5%B1%9E%E6%80%A7" target="_blank" rel="noreferrer">el-drawer</a>/<a href="https://element-plus.org/zh-CN/component/dialog.html#api" target="_blank" rel="noreferrer">el-dialog</a></td><td>object</td><td>{ <br>    alignCenter: true<br> }</td></tr><tr><td>formAttrs</td><td>表单样式, 详见<a href="https://element-plus.org/zh-CN/component/form.html#form-attributes" target="_blank" rel="noreferrer">el-form</a> <br>此处的 rule 为公用校验</td><td>function</td><td>{ <br>    labelWidth: &quot;100px&quot;<br>    rule: {}<br> }</td></tr><tr><td>add</td><td>添加功能配置，详见<a href="#add配置">add配置</a></td><td>object</td><td>-</td></tr><tr><td>edit</td><td>添加功能配置，详见<a href="#edit配置">edit配置</a></td><td>object</td><td>-</td></tr><tr><td>formItems</td><td>表单子项配置，详见<a href="./form.html">xb-form</a></td><td>array</td><td>-</td></tr></tbody></table><h2 id="add配置" tabindex="-1">add配置 <a class="header-anchor" href="#add配置" aria-label="Permalink to &quot;add配置&quot;">​</a></h2><table><thead><tr><th>属性</th><th>说明</th><th>Type</th><th>默认值</th></tr></thead><tbody><tr><td>title</td><td>添加弹窗标题</td><td>string</td><td>添加</td></tr><tr><td>rules</td><td>表单验证规则，合并 formAttrs 中 rules 配置</td><td>object</td><td>-</td></tr><tr><td>paramsFormat</td><td>格式化请求参数</td><td>function</td><td>-</td></tr><tr><td>responseFormat</td><td>格式化请求返回的数据</td><td>function</td><td>-</td></tr></tbody></table><h2 id="edit配置" tabindex="-1">edit配置 <a class="header-anchor" href="#edit配置" aria-label="Permalink to &quot;edit配置&quot;">​</a></h2><table><thead><tr><th>属性</th><th>说明</th><th>Type</th><th>默认值</th></tr></thead><tbody><tr><td>title</td><td>编辑弹窗标题</td><td>string</td><td>修改</td></tr><tr><td>rules</td><td>表单验证规则，合并 formAttrs 中 rules 配置</td><td>object</td><td>-</td></tr><tr><td>idKey</td><td>编辑 id 的 key 值</td><td>string</td><td>id</td></tr><tr><td>paramsFormat</td><td>格式化请求参数</td><td>function</td><td>-</td></tr><tr><td>responseFormat</td><td>格式化请求返回的数据</td><td>function</td><td>-</td></tr></tbody></table>',6),h=[o];function n(i,l,s,m,b,c){return d(),r("div",null,h)}const f=t(a,[["render",n]]);export{u as __pageData,f as default};
