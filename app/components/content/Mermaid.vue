<template>
  <!-- Keep this to fetch `default` slot in metadata -->
  <slot v-if="false" />
  <div
    ref="containerRef"
    class="mermaid-container group relative"
  >
    <div
      class="pointer-events-none absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md border border-default bg-default/90 p-1 opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:pointer-events-auto group-hover:opacity-100"
    >
      <UButton
        icon="i-lucide-zoom-in"
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Zoom in"
        @click="zoomIn"
      />
      <UButton
        icon="i-lucide-zoom-out"
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Zoom out"
        @click="zoomOut"
      />
      <UButton
        icon="i-lucide-hand"
        :color="panEnabled ? 'primary' : 'neutral'"
        variant="ghost"
        size="sm"
        aria-label="Toggle pan"
        @click="togglePan"
      />
      <UButton
        :icon="mode === 'preview' ? 'i-lucide-code' : 'i-lucide-eye'"
        color="neutral"
        variant="ghost"
        size="sm"
        :aria-label="mode === 'preview' ? 'Show source' : 'Show preview'"
        @click="toggleMode"
      />
      <UButton
        :icon="isFullscreen ? 'i-lucide-minimize' : 'i-lucide-maximize'"
        color="neutral"
        variant="ghost"
        size="sm"
        :aria-label="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
        @click="toggleFullscreen"
      />
    </div>

    <div
      v-show="mode === 'preview'"
      class="mermaid-viewport overflow-hidden"
      :class="[
        panEnabled
          ? `select-none ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`
          : ''
      ]"
      @mousedown="startPan"
    >
      <div :style="{ transform: `translate(${panX}px, ${panY}px)` }">
        <div :style="{ transform: `scale(${scale})` }">
          <pre
            ref="el"
            :style="{ display: rendered ? 'block' : 'none' }"
            class="not-prose"
          >
      {{ mermaidSyntax }}
          </pre>
        </div>
      </div>
    </div>

    <pre
      v-show="mode === 'code'"
      class="not-prose w-full overflow-x-auto rounded-md bg-elevated p-4 text-xs text-default"
    >{{ mermaidSyntax }}</pre>
  </div>
</template>

<script setup>
import { nodeTextContent } from '@nuxtjs/mdc/runtime/utils/node'

const el = ref(null)
const rendered = ref(false)
const rerenderCounter = ref(1)
const slots = useSlots()

const containerRef = ref(null)
const scale = ref(1)
const panX = ref(0)
const panY = ref(0)
const panEnabled = ref(false)
const isPanning = ref(false)
const mode = ref('preview')
const isFullscreen = ref(false)

let panStartX = 0
let panStartY = 0

function zoomIn() {
  scale.value = Math.min(scale.value + 0.25, 3)
}

function zoomOut() {
  scale.value = Math.max(scale.value - 0.25, 0.5)
}

function togglePan() {
  panEnabled.value = !panEnabled.value
}

function toggleMode() {
  mode.value = mode.value === 'preview' ? 'code' : 'preview'
}

function toggleFullscreen() {
  if (!containerRef.value) {
    return
  }

  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    containerRef.value.requestFullscreen()
  }
}

function onFullscreenChange() {
  isFullscreen.value = document.fullscreenElement === containerRef.value
}

function startPan(event) {
  if (!panEnabled.value) {
    return
  }

  isPanning.value = true
  panStartX = event.clientX - panX.value
  panStartY = event.clientY - panY.value

  window.addEventListener('mousemove', onPanMove)
  window.addEventListener('mouseup', stopPan)
}

function onPanMove(event) {
  panX.value = event.clientX - panStartX
  panY.value = event.clientY - panStartY
}

function stopPan() {
  isPanning.value = false
  window.removeEventListener('mousemove', onPanMove)
  window.removeEventListener('mouseup', stopPan)
}

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onPanMove)
  window.removeEventListener('mouseup', stopPan)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})

const mermaidSyntax = computed(() => {
  // Trick to force re-render when the slot content changes (for preview inside studio)
  void rerenderCounter.value

  const defaultSlot = slots.default?.()[0]
  if (!defaultSlot) {
    return ''
  }

  // Old syntax with text node
  if (typeof defaultSlot.children === 'string') {
    return defaultSlot.children
  }

  // New syntax with code node
  const codeChild = defaultSlot.children?.default()[0]
  if (codeChild.type !== 'code') {
    return ''
  }

  // New syntax without highlight
  if (typeof codeChild.children === 'string') {
    return codeChild.children
  }

  // New syntax with highlight
  return nodeTextContent(codeChild.children)
})

// watch(mermaidSyntax, () => {
//   render()
// })

async function render() {
  if (!el.value) {
    return
  }
  if (el.value.querySelector('svg')) {
    // Already rendered
    return
  }

  // // Iterate children to remove comments
  for (const child of el.value.childNodes) {
    if (child.nodeType === Node.COMMENT_NODE) {
      el.value.removeChild(child)
    }
  }
  const { default: mermaid } = await import('mermaid')

  // Initialize with custom theme
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true
    },
    themeVariables: {
      primaryColor: '#f0f9ff',
      primaryBorderColor: '#0ea5e9',
      primaryTextColor: '#334155',
      lineColor: '#64748b',
      secondaryColor: '#f0fdf4',
      tertiaryColor: '#fef2f2',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }
  })

  el.value.classList.add('mermaid')
  rendered.value = true
  await mermaid.run({ nodes: [el.value] })
}

onBeforeUpdate(() => {
  rerenderCounter.value++
})

onMounted(() => {
  render()
  document.addEventListener('fullscreenchange', onFullscreenChange)
})
</script>

<style>
/* Container for centering */
.mermaid-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1.5rem 0;
  overflow: hidden;
}

.mermaid svg {
  display: block;
  max-width: 100%;
  height: auto;
}

.mermaid-container:fullscreen {
  background: var(--ui-bg);
  align-items: center;
  padding: 2rem;
}

.mermaid-container:fullscreen .mermaid-viewport {
  max-height: calc(100vh - 4rem);
}

/* Unified colors for all diagram types */
.mermaid .node rect,
.mermaid .entityBox,
.mermaid .attributeBoxOdd,
.mermaid .attributeBoxEven {
  stroke: #0ea5e9 !important;
  fill: #f0f9ff !important;
}

.mermaid .relationshipLine,
.mermaid .flowchart-link,
.mermaid line {
  stroke: #64748b !important;
}

.mermaid .edgeLabel,
.mermaid .label {
  background-color: #fff !important;
}

.mermaid .cluster rect {
  stroke: #94a3b8 !important;
  fill: #f8fafc !important;
}

.mermaid marker {
  fill: #64748b !important;
}

/* Dark mode */
[data-theme="dark"] .mermaid .node rect,
[data-theme="dark"] .mermaid .entityBox {
  fill: #1e293b !important;
  stroke: #38bdf8 !important;
}

[data-theme="dark"] .mermaid .flowchart-link,
[data-theme="dark"] .mermaid .relationshipLine,
[data-theme="dark"] .mermaid line {
  stroke: #94a3b8 !important;
}

[data-theme="dark"] .mermaid .messageText,
[data-theme="dark"] .mermaid .label {
  fill: #e2e8f0 !important;
  color: #e2e8f0 !important;
}

[data-theme="dark"] .mermaid marker {
  fill: #94a3b8 !important;
}

[data-theme="dark"] .mermaid .edgeLabel {
  background-color: #1e293b !important;
}
</style>
