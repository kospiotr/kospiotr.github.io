<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('notes').path(route.path).first())
</script>

<template>
  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #left>
      <p class="text-muted text-sm">
        Piotr Kosmowski • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        v-if="page"
        icon="i-lucide-file-pen"
        :to="`${appConfig['gh-url']}/edit/master/${page?.stem}.md`"
        target="_blank"
        variant="ghost"
        color="neutral"
      />
    </template>
  </UFooter>
</template>
