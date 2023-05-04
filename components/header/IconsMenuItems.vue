<script setup>

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
    <ul class="flex  xl:gap-[40px] lg:gap-x-[35px] gap-[30px] justify-between   md:order-3 order-2">
        <li v-for="(item, index) in iconsMenuItems" :key="index"
            :class="item.id !== 'favourite' ? 'hidden' : ''"
            class=" md:inline-block hover:border-b-2 hover:cursor-pointer relative lg:w-[25px] lg:h-[25] md:w-[22px] sm:w-[22px]">
            <img :src="light ? item.whiteIconPath : item.blackIconPath" :alt="item.alt">
        </li>
    </ul>
</template>

