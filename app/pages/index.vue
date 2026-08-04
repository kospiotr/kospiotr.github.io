<script setup lang="ts">

const title = 'Piotr Kosmowski home page'
const description = title

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})
</script>

<template>

    <UPageCTA
      title="Piotr Kosmowski"
      description="Software Engineer, Cloud Architect, and Open Source Enthusiast"
      variant="naked"
      class="overflow-hidden"
    >
      <NuxtImg
        src="piotr_kosmowski.jpg"
        alt="Piotr Kosmowski"
        width="300"
        height="300"
        class="rounded-full mx-auto mb-4"
      />
      <LazyStarsBg />
    </UPageCTA>
</template>
