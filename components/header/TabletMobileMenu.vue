<script setup lang="ts">

import menuItemsProps from "~/data/MenuItemsProps.json";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import TextMenuItemsFile from "~/data/TextMenuItems.json";
import {ChevronDownIcon} from "@heroicons/vue/24/solid";
import DisclosureStateEmitter from "~/components/base/DisclosureStateEmitter.vue";

const textMenuItems = reactive(TextMenuItemsFile)

const activeItemIndex = ref(null)

const currentMenuItems = computed(() => {
  if (activeItemIndex.value === null) {
    return [];
  }
  const activeMenuItemKey = textMenuItems[activeItemIndex.value].id;
  console.log(menuItemsProps[activeMenuItemKey])
  return menuItemsProps[activeMenuItemKey] || [];
});

const elements = ref([]);
const doClose = (close) => {
  close();
};

const hideOther = (id) => {
  const items = elements.value.filter((elm) => {
    return elm.getAttribute("data-id") !== id.toString();
  });
  items.forEach((elm) => elm.click());
};



</script>

<template>
  <div class=" bg-white main-container">
    <div class="relative ">
      <input type="text"
             class=" w-full border-b-2 border-gray-300 bg-white h-[72px]   text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
             :placeholder=" $t('websiteSearch') ">
      <div class="absolute inset-y-0 right-0 flex items-center px-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
        </svg>

      </div>
    </div>

    <div>
      <Disclosure
          v-for="(item, index) in textMenuItems"
          :key="item.id"
          v-slot="{ open, close }"
      >
        <DisclosureButton
            class=" flex justify-between items-center h-[17.5vh] max-h-16 w-full py-2 text-left border-b border-secondaryGrey"
            @click="activeItemIndex = index"
        >
          <h3><span>{{ $t(item.name) }}</span></h3>

          <!--                            arrows for  menu items with dropdown-->

          <div v-if="item.needToShowDropdown">
            <ChevronDownIcon
                :class="open ? 'duration-200' : 'duration-200 rotate-180'"
                class="w-5 h-5"
            />
          </div>
        </DisclosureButton>
        <DisclosurePanel
            class="panel transition-all opacity-0 duration-200 max-h-0 overflow-hidden"
            :class="open && 'max-h-screen opacity-100'"
            static
        >

          <!--                                dropdowns for menu items with dropdown for tablet-->

          <div v-if="item.needToShowDropdown"
               class=" pt-4 pb-4 text-sm text-gray-500  md:block hidden">
            <modals-header-modal class="main-container hidden"
                                 :currentMenuItems="currentMenuItems"
                                 :menuItemsProps="menuItemsProps"
                                 :activeMenuItemKey="item.itemHeader"/>

          </div>

          <!--                                dropdowns for menu items with dropdown for mobile-->

          <div v-if="item.needToShowDropdown" class="md:hidden mt-[25px]">

            <div v-for="item in currentMenuItems" :key="item.name" class="flex justify-start">
              <h5 class="border-b border-black uppercase mb-[25px]">{{ $t(item.name) }}</h5>

            </div>
          </div>
        </DisclosurePanel>

        <button
            :ref="(el) => (elements[index] = el)"
            :data-id="item.id"
            v-show="false"
            @click="doClose(close)"
        ></button>
        <DisclosureStateEmitter :show="open" @show="hideOther(item.id)"/>
      </Disclosure>
    </div>
  </div>
</template>

<style scoped>

</style>