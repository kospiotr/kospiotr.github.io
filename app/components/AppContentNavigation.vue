<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

interface NavigationItem extends ContentNavigationItem {
  children?: NavigationItem[]
  defaultOpen?: boolean
  icon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  navigation?: NavigationItem[]
  level?: number
  defaultOpen?: boolean
  highlight?: boolean
}>(), {
  navigation: () => [],
  level: 0,
  defaultOpen: false,
  highlight: false
})

const route = useRoute()

const openItems = ref<Set<string>>(new Set())

/**
 * Nuxt Content can emit a folder and a page as two separate sibling
 * entries when a directory and a content file share the same slug
 * (e.g. `docker.md` next to a `docker/` directory). Merge such pairs
 * into a single entry that is both navigable and collapsible.
 */
function mergeSiblings(items: NavigationItem[]): NavigationItem[] {
  const order: string[] = []
  const map = new Map<string, NavigationItem>()

  for (const item of items) {
    const key = item.path || item.title
    const existing = map.get(key)

    if (!existing) {
      map.set(key, item)
      order.push(key)
      continue
    }

    const pageItem = item.page !== false ? item : existing
    const folderItem = existing.children?.length ? existing : item

    map.set(key, {
      ...folderItem,
      ...pageItem,
      children: folderItem.children
    })
  }
  const out = order.map(key => map.get(key)!)
  console.log('Merged navigation items:', out)
  return out
}

/**
 * Some vault folders contain a same-titled leaf note representing the
 * folder's own page (e.g. `proxmox/_ proxmox.md` inside `proxmox/`).
 * Promote that note's path onto the folder and drop it from the
 * children list, instead of showing the title twice.
 */
function promoteFolderNote(item: NavigationItem): NavigationItem {
  if (!item.children?.length) {
    return item
  }

  const folderTitle = item.title?.trim().toLowerCase()
  const noteIndex = item.children.findIndex(child =>
    !child.children?.length && child.title?.trim().toLowerCase() === folderTitle
  )

  if (noteIndex === -1) {
    return item
  }

  const note = item.children[noteIndex]!

  return {
    ...item,
    path: note.path,
    page: note.page,
    children: item.children.filter((_, index) => index !== noteIndex)
  }
}

const mergedNavigation = computed(() =>
  mergeSiblings(props.navigation).map(promoteFolderNote)
)

function hasChildren(item: NavigationItem) {
  return !!item.children?.length
}

/**
 * A folder is navigable when it represents an actual content page.
 *
 * Nuxt Content adds `page: false` to directory-only nodes.
 */
function isNavigable(item: NavigationItem) {
  return !!item.path && item.page !== false
}

function isActive(item: NavigationItem) {
  return item.path === route.path
}

function isInActiveTree(item: NavigationItem): boolean {
  if (isActive(item)) {
    return true
  }

  return item.children?.some(child => isInActiveTree(child)) ?? false
}

function itemKey(item: NavigationItem) {
  return item.path || item.title
}

function isOpen(item: NavigationItem) {
  return openItems.value.has(itemKey(item))
}

function toggle(item: NavigationItem) {
  const key = itemKey(item)

  if (openItems.value.has(key)) {
    openItems.value.delete(key)
  } else {
    openItems.value.add(key)
  }

  // Trigger Vue reactivity for the Set
  openItems.value = new Set(openItems.value)
}

/**
 * Ensure an item is open, without closing it if it already is.
 *
 * Used when navigating to a page that also acts as a folder, so
 * following the link always reveals its children.
 */
function openItem(item: NavigationItem) {
  const key = itemKey(item)

  if (!openItems.value.has(key)) {
    openItems.value.add(key)
    openItems.value = new Set(openItems.value)
  }
}

/**
 * Open the parents of the current route.
 */
function openActiveParents(
  items: NavigationItem[],
  parentItems: NavigationItem[] = []
) {
  for (const item of items) {
    if (isActive(item)) {
      for (const parent of parentItems) {
        openItems.value.add(itemKey(parent))
      }

      continue
    }

    if (item.children?.length) {
      openActiveParents(item.children, [...parentItems, item])
    }
  }
}

/**
 * Initialize the tree.
 */
onMounted(() => {
  if (props.defaultOpen) {
    openActiveParents(props.navigation)
  } else {
    // Always open the tree containing the current page.
    openActiveParents(props.navigation)
  }
})

/**
 * Keep the active branch open when navigating.
 */
watch(
  () => route.path,
  () => {
    openActiveParents(props.navigation)
  }
)
</script>

<template>
  <nav
    :class="[
      level > 0
        ? 'ms-5 border-s border-default'
        : ''
    ]"
  >
    <ul class="isolate -mx-2.5 -mt-1.5">
      <li
        v-for="item in mergedNavigation"
        :key="itemKey(item)"
        :class="[
          hasChildren(item)
            ? 'flex flex-col'
            : ''
        ]"
      >
        <!--
          Item with children
        -->
        <div
          v-if="hasChildren(item)"
          class="flex items-center"
        >
          <!--
            Navigable folder/page

            Clicking navigates to the page and also ensures the
            folder is expanded, so its children become visible.
          -->
          <NuxtLink
            v-if="isNavigable(item)"
            :to="item.path"
            class="group relative flex min-w-0 flex-1 items-center gap-1.5 px-2.5 py-1.5 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-[-3px]"
            :class="[
              isActive(item)
                ? 'font-semibold text-primary'
                : 'text-default hover:text-highlighted'
            ]"
            @click="openItem(item)"
          >
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              class="size-4 shrink-0"
            />

            <span class="truncate">
              {{ item.title }}
            </span>

            <span
              v-if="highlight && isActive(item)"
              class="absolute inset-y-0 start-0 w-0.5 rounded-full bg-primary"
            />
          </NuxtLink>

          <!--
            Non-navigable folder

            There is no page to link to, so clicking the label
            toggles the folder open/closed, same as the chevron.
          -->
          <button
            v-else
            type="button"
            class="group relative flex min-w-0 flex-1 items-center gap-1.5 px-2.5 py-1.5 text-start text-sm font-semibold text-default"
            :aria-expanded="isOpen(item)"
            @click="toggle(item)"
          >
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              class="size-4 shrink-0"
            />

            <span class="truncate">
              {{ item.title }}
            </span>
          </button>

          <!--
            Expand / collapse button

            This is intentionally separate from the NuxtLink/button
            above, so clicking the chevron never triggers navigation.
          -->
          <button
            type="button"
            class="flex size-7 shrink-0 items-center justify-center rounded-md text-muted transition-transform hover:bg-elevated hover:text-highlighted focus:outline-none focus-visible:outline-3"
            :aria-expanded="isOpen(item)"
            :aria-label="isOpen(item) ? `Collapse ${item.title}` : `Expand ${item.title}`"
            @click.stop="toggle(item)"
          >
            <UIcon
              name="i-lucide-chevron-down"
              class="size-4 transition-transform duration-200"
              :class="[
                isOpen(item)
                  ? 'rotate-0'
                  : '-rotate-90'
              ]"
            />
          </button>
        </div>

        <!--
          Children
        -->
        <div
          v-if="hasChildren(item) && isOpen(item)"
          class="overflow-hidden"
        >
          <AppContentNavigation
            :navigation="item.children"
            :level="level + 1"
            :default-open="defaultOpen"
            :highlight="highlight"
          />
        </div>

        <!--
          Leaf item
        -->
        <NuxtLink
          v-else-if="!hasChildren(item) && isNavigable(item)"
          :to="item.path"
          class="group relative flex w-full items-center gap-1.5 px-2.5 py-1.5 text-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-[-3px]"
          :class="[
            isActive(item)
              ? 'font-semibold text-primary'
              : 'text-default hover:text-highlighted'
          ]"
        >
          <UIcon
            v-if="item.icon"
            :name="item.icon"
            class="size-4 shrink-0"
          />

          <span class="truncate">
            {{ item.title }}
          </span>

          <span
            v-if="highlight && isActive(item)"
            class="absolute inset-y-0 start-0 w-0.5 rounded-full bg-primary"
          />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
