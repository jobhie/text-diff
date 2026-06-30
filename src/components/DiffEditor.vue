<script setup>
import * as monaco from 'monaco-editor'
import { ref, toRefs, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({ isDark: Boolean })
const { isDark } = toRefs(props)
const editorContainer = ref(null)
let editor = null
let resizeObserver = null

monaco.editor.defineTheme('diff-dark', {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: { 'editor.background': '#00000000' },
})

monaco.editor.defineTheme('diff-light', {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: { 'editor.background': '#00000000' },
})

watch(isDark, (val) => {
  monaco.editor.setTheme(val ? 'diff-dark' : 'diff-light')
}, { immediate: true })

onMounted(() => {
  if (!editorContainer.value) return

  editor = monaco.editor.createDiffEditor(editorContainer.value, {
    originalEditable: true,
    minimap: { enabled: false },
  })

  editor.setModel({
    original: monaco.editor.createModel('', 'txt'),
    modified: monaco.editor.createModel('', 'txt'),
  })

  resizeObserver = new ResizeObserver(() => editor?.layout())
  resizeObserver.observe(editorContainer.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  editor?.dispose()
})
</script>

<template>
  <div ref="editorContainer" class="editor" />
</template>

<style scoped>
.editor {
  height: 100vh;
  width: 100%;
}
</style>
