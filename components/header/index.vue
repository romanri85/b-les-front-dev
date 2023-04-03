<script setup>
defineProps({light: Boolean})

const data = await $fetch('http:////64.225.66.244/api/product/collections')
const collections = data.results

const menuItems = [
    {id: 'catalog', title: 'Catalog', to: '/catalog', needToShowDropdown: true},
    {id: 'other-elements', title: 'Other Elements', to: '/other-elements'},
    {id: 'where-to-buy', title: 'Where To Buy', to: '/where-to-buy'},
    {id: 'doors-in-interiour', title: 'Doors in Interiour', to: '/doors-in-interiour'},
    {id: 'about-us', title: 'About Us', to: '/about-us'}
]

const menuItemsProps = {
    "catalog": collections,
    "about-us": [
        {
            "name": "about-is",
            "image": "http://",
            "slug": "/catalog/doors"
        },
        {
            "name": "about-them",
            "image": "http://",
            "slug": "/catalog/doors"
        }]
}

const activeItemIndex = ref(null)

function onItemMouseOver(index) {
    activeItemIndex.value = index
}

function onItemMouseLeave() {
    activeItemIndex.value = null
}


</script>
<template>
    <header class="header">
        <div class="container font-mono text-sm h-[100px] lg:grid xl:grid-cols-[246px_15fr_1fr_43px]  lg:grid-cols-[232px_15fr_1fr_33px] flex justify-between lg:gap-x-[80px] xl:gap-x-[200px] items-center">
            <img src="/icons/burger-menu-icon.svg" class="lg:hidden md:w-[32px] w-[25px] order-3 md:order-1"
                 alt="burger-menu">
            <img v-if="!light" src="/logo-black.svg" alt="logo"
                 class="header__logo mb-1 hover:cursor-pointer xl:w-[246px] lg:w-[232px]  md:w-[182px] sm:w-[166px] xl:h-[49px] lg:h-[46px] md:h-[36px] sm:h-[33px]">
            <img v-else src="/logo-white.svg" alt="logo"
                 class="header__logo mb-1 hover:cursor-pointer xl:w-[246px] lg:w-[232px]  md:w-[182px] sm:w-[166px] xl:h-[49px] lg:h-[46px] md:h-[36px] sm:h-[33px]">
            <nav class="nav">
                <ul class="menu lg:flex justify-between hidden">
                    <li v-for="(item, index) in menuItems" :key="index"
                        class="inline-block h-[100px] pt-[39px] hover:border-b-2" @mouseover="onItemMouseOver(index)"
                        @mouseleave="onItemMouseLeave">
                        <NuxtLink :to="item.to" class="relative hover:cursor-pointer text-white"
                                  :data-id="item.id">
                            {{ item.title }}

                        </NuxtLink>
                        <modals-header :items="collections" v-if="activeItemIndex === index && item.needToShowDropdown"/>
                    </li>
                </ul>
            </nav>
            <ul class="menu-icons flex gap-x-[42px] justify-between">
                <li class="md:inline-block h-[92px] pt-[35px] hover:border-b-2 hover:cursor-pointer relative xl:w-[42px] lg:w-[32px] md:w-[22px] sm:w-[22px] hidden ">
                    <img v-if="!light" src="/icons/phone-icon-black.svg" alt="phone icon">
                    <img v-else src="/icons/phone-icon-white.svg" alt="phone icon">
                </li>
                <li class="md:inline-block h-[92px] pt-[35px] hover:border-b-2 hover:cursor-pointer relative xl:w-[42px] lg:w-[32px] md:w-[22px] sm:w-[22px]">
                    <img v-if="!light" src="/icons/heart-icon-black.svg" alt="favourite">
                    <img v-else src="/icons/heart-icon-white.svg" alt="favourite">
                </li>
                <li class="md:inline-block h-[92px] pt-[35px] hover:border-b-2 hover:cursor-pointer relative xl:w-[42px] lg:w-[32px] md:w-[22px] sm:w-[22px] hidden ">
                    <img v-if="!light" src="/icons/search-icon-black.svg" alt="scope icon">
                    <img v-else src="/icons/search-icon-white.svg" alt="scope icon">
                </li>
            </ul>
            <h3 class="lg:block font-mono text-sm text-white hidden">RU</h3>
        </div>

    </header>
    <div class="border-b w-full"></div>
</template>

<style scoped>

</style>