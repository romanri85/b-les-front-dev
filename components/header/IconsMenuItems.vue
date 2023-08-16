<script setup lang="ts">

defineProps({light: {type: Boolean, default: true}})

const iconsMenuItems = [
    {
        id: 'contact-us',
        to: '/search',
        whiteIconPath: '/icons/phone-icon-white.svg',
        blackIconPath: '/icons/phone-icon-black.svg',
        alt: 'phone'
    },
    {
        id: 'favourite',
        to: '/cart',
        whiteIconPath: '/icons/heart-icon-white.svg',
        blackIconPath: '/icons/heart-icon-black.svg',
        alt: 'heart'
    },
    {
        id: 'search',
        to: '/cart',
        whiteIconPath: '/icons/search-icon-white.svg',
        blackIconPath: '/icons/search-icon-black.svg',
        alt: 'search'
    },
]
</script>

<template>
    <ul class="flex  xl:gap-8 lg:gap-x-8 gap-8 justify-between xl:h-[100px] lg:h-[86px] h-[60px]">
        <li v-for="(item, index) in iconsMenuItems" :key="index"
            class=" flex md:block  hover:cursor-pointer relative lg:w-5 md:w-5 w-5 h-full hover:border-b-2"
            :class="item.id !== 'favourite' ? 'hidden' : ''">
                <img :src="light ? item.whiteIconPath : item.blackIconPath" :alt="item.alt" class=" h-full">
        </li>
    </ul>
</template>

