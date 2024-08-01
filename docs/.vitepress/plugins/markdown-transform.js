import path from 'path'
export function MarkdownTransform() {

  return {
    name: 'element-plus-md-transform',
    enforce: 'pre',
    async transform(code, id) {
    
      if (!id.endsWith('.md')) return
      const componentId = path.basename(id, '.md')
      const append = {
        scriptSetups: [
          `const demos = import.meta.glob('../examples/${componentId}/*.vue', { eager: true })`,
        ],
      }
     
      return combineMarkdown(
        code,
        [combineScriptSetup(append.scriptSetups)],
      )
    },
  }
}

const combineScriptSetup = (codes) =>
  `\n<script setup>
${codes.join('\n')}
</script>
`

const combineMarkdown = (
  code,
  headers,
) => {
  const frontmatterEnds = code.indexOf('---\n\n')
  const firstHeader = code.search(/\n#{1,6}\s.+/)
  const sliceIndex =
    firstHeader < 0
      ? frontmatterEnds < 0
        ? 0
        : frontmatterEnds + 4
      : firstHeader

  if (headers.length > 0)
    code =
      code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)


  return `${code}\n`
}


