<script setup lang="ts">

import ContactUsModal from "~/components/pop-ups/ContactUsModal.vue";

defineProps({light: {type: Boolean, default: true}})

const shouldOpenModal = ref(0)

function openContactUsModal() {
  console.log('openContactUsModal',shouldOpenModal.value)

  shouldOpenModal.value = shouldOpenModal.value + 1
  console.log('openContactUsModal',shouldOpenModal.value)

}

const iconsMenuItems = [
    {
        id: 'contact-us',
        to: '/search',
        whiteIconPath: '/icons/phone-icon-white.svg',
        blackIconPath: '/icons/phone-icon-black.svg',
        alt: 'phone'
    },
    // {
    //     id: 'favourite',
    //     to: '/cart',
    //     whiteIconPath: '/icons/heart-icon-white.svg',
    //     blackIconPath: '/icons/heart-icon-black.svg',
    //     alt: 'heart'
    // },
    {
        id: 'search',
        to: '/search',
        whiteIconPath: '/icons/search-icon-white.svg',
        blackIconPath: '/icons/search-icon-black.svg',
        alt: 'search'
    },
]
</script>

<template>
  <ul class="flex xl:gap-8 lg:gap-x-8 md:gap-8 gap-6 justify-between xl:h-[100px] lg:h-[86px] h-[60px]">
    <li
        @click="item.id === 'contact-us' ? openContactUsModal() : ''"
        v-for="(item, index) in iconsMenuItems"
        :key="item.id"
        class="flex md:block hover:cursor-pointer relative lg:w-5 md:w-5 w-5 h-full"
    >

      <template v-if="item.id === 'search'">
        <nuxt-link :to="item.to">
          <nuxt-img :src="light ? item.whiteIconPath : item.blackIconPath" :alt="item.alt" class="h-full"/>
        </nuxt-link>
      </template>
      <template v-else>
        <nuxt-img :src="light ? item.whiteIconPath : item.blackIconPath" :alt="item.alt" class="h-full"/>
      </template>

    </li>
    <contact-us-modal ck :should-open-modal="shouldOpenModal"/>

  </ul>
</template>


