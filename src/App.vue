<script setup>
import DiffEditor from './components/DiffEditor.vue'
import { useTheme } from './composables/useTheme'

const { isDark } = useTheme()
</script>

<template>
  <div class="app">
    <header class="toolbar">
      <span class="title">Text Diff</span>
      <button class="theme-btn" @click="isDark = !isDark">
        {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
      </button>
    </header>
    <DiffEditor :is-dark="isDark" />
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border-color, #ccc);
  background: var(--toolbar-bg, #f5f5f5);
  flex-shrink: 0;
  z-index: 10;
}

html.dark .toolbar {
  --border-color: #333;
  --toolbar-bg: #252526;
  color: #d4d4d4;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.theme-btn {
  background: none;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 14px;
  color: inherit;
}
</style>
