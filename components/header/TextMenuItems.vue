<script setup lang="ts">
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";
import TextMenuItems from "@/data/TextMenuItems.json"
import menuItemsProps from "@/data/MenuItemsProps.json"
import {ChevronDownIcon} from '@heroicons/vue/24/solid'
import Pagination from "~/components/base/Pagination.vue";

defineProps({light: {type: Boolean, default: true}})


const textMenuItems = ref(TextMenuItems)

const activeItemIndex = ref(null)

const textMenuHovered = ref(false)

function onTextMenuMouseLeave() {
  textMenuHovered.value = false
  activeItemIndex.value = null
}

const currentMenuItems = computed(() => {
  if (activeItemIndex.value === null) {
    return [];
  }
  const activeMenuItemKey = textMenuItems.value[activeItemIndex.value].id;
  return menuItemsProps[activeMenuItemKey] || [];
});


</script>
<template>
  <nav class=" lg:order-2 lg:block hidden">
    <ul ref="menuRef" :class="light ? 'text-white' : 'text-black'"
        class="menu lg:flex xl:40px lg:gap-x-[30px] xl:h-[100px] lg:h-[86px] h-[60px] justify-between hidden  items-center"
        @mouseenter="textMenuHovered = true" @mouseleave="onTextMenuMouseLeave">
      <client-only>
        <Popover v-for="(item, index) in textMenuItems" :key="item.name" as="li"
                 class="h-full flex border-b-transparent border-b-2 hover:border-white menu-item"
                 @mouseenter="() => textMenuHovered && (activeItemIndex = index)"
                 @mouseleave="() => !textMenuHovered && (activeItemIndex = null)">
          <PopoverButton class="">
            <div class="flex justify-center items-center h-full"
                 :class="activeItemIndex === index ? '[&>span]:rotate-180' : '' ">
              <NuxtLink :to="item.slug"><h4 class="inline-block pr-2">{{ $t(item.name) }}</h4></NuxtLink>
              <span v-if="item.name === 'otherElements' || (item.name === 'aboutUs')">
                            <ChevronDownIcon class="w-5 h-5"/>
                        </span>
            </div>
          </PopoverButton>

          <div v-if="activeItemIndex === index && currentMenuItems.length !== 0">
            <PopoverPanel static>
              <modals-header-modal :currentMenuItems="currentMenuItems"
                                   :menuItemsProps="menuItemsProps"
                                   :activeMenuItemKey="item.itemHeader"

              />
            </PopoverPanel>
          </div>
        </Popover>
      </client-only>
    </ul>
  </nav>
</template>
<style scoped>


.menu-item:hover .arrow {
  position: relative;
  top: 0.15rem;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}


</style>
