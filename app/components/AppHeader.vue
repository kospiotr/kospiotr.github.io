<script setup lang="ts">
const appConfig = useAppConfig()
const items = computed(() => appConfig['menu-main'])
const icons = appConfig['menu-icons']
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <span class="text-primary">Piotr</span>
        <span>Kosmowski</span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton/>
      <UButton
        v-for="icon in icons"
        :key="icon.label"
        :to="icon.to"
        target="_blank"
        :icon="icon.icon"
        :aria-label="icon['aria-label']"
        color="neutral"
        variant="ghost"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
