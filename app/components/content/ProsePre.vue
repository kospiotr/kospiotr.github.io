<script setup lang="ts">
import UProsePre from '@nuxt/ui/components/prose/Pre.vue'

defineProps<{
  icon?: string
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  hideHeader?: boolean
  meta?: string
  copy?: boolean | object
  class?: unknown
  ui?: object
}>()
</script>

<template>
  <Mermaid v-if="language === 'mermaid'">
    {{ code }}
  </Mermaid>

  <UProsePre
    v-else
    v-bind="$props"
  >
    <slot />
  </UProsePre>
</template>
