<script setup>
// set light layout

const props = defineProps({light: {type: Boolean, default: true}})


const data = await $fetch('http:////64.225.66.244/api/product/collections')
const collections = data.results

const textMenuItems = [
    {id: 'catalog', title: 'Catalog', to: '/catalog', needToShowDropdown: true},
    {id: 'other-elements', title: 'Other Elements', to: '/other-elements'},
    {id: 'where-to-buy', title: 'Where To Buy', to: '/where-to-buy'},
    {id: 'doors-in-interiour', title: 'Doors in Interiour', to: '/doors-in-interiour'},
    {id: 'about-us', title: 'About Us', to: '/about-us'}
]

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

const menuItemsProps = {
    "catalog": collections,
    "other elements": [
        {
            "name": "Door systems",
            "image": "/door-systems.jpg",
            "slug": "/other-items/door-systems"
        },
        {
            "name": "Door hardware",
            "image": "/door-hardware.jpg",
            "slug": "/other-items/door-hardware"
        },
        {
            "name": "Plinth",
            "image": "/plinth.jpg",
            "slug": "/other-items/plinth"
        },
        {
            "name": "Delivery and installation",
            "image": "delivery-installation.jpg",
            "slug": "/other-items/delivery-and-installation"
        },

    ],
    "about-us": [
        {
            "name": "about us",
            "image": "/about-us.jpg",
            "slug": "/about-us/about-us"
        },
        {
            "name": "promotions",
            "image": "promotions.jpg",
            "slug": "/about-us/promotions"
        },
        {
            "name": "to designers",
            "image": "to-designers.jpg",
            "slug": "/about-us/to-designers"
        },
        {
            "name": "to dealers",
            "image": "to-dealers.jpg",
            "slug": "/about-us/to-dealers"
        }]
}
//
// function getIconPath(whiteUrl, light) {
//     return light ? whiteUrl : whiteUrl.replace(/(\S*)white\.svg/, "$1black.svg")
// }



function setBorderColor(light) {
    return light ? 'border-white' : 'border-black'
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
        <div class="font-mono main-container whitespace-nowrap flex h-[100px] xl:grid-cols-[246px_10fr_1fr_43px]  lg:grid-cols-[232px_10fr_1fr_25px]  justify-between lg:gap-x-[55px] xl:gap-x-[80px] items-center">

            <!--            burger menu-->

            <img src="/icons/burger-menu-icon.svg" class="lg:hidden md:w-[32px] w-[25px] order-3 md:order-1"
                 alt="burger-menu">

            <!--            logo-->

            <img :src="light ? '/logo-white.svg' : '/logo-black.svg'" alt="logo"
                 class="header__logo mb-1 hover:cursor-pointer xl:w-[246px] lg:w-[232px]  md:w-[182px] sm:w-[166px] xl:h-[49px] lg:h-[46px] md:h-[36px] sm:h-[33px]">

            <!--                main menu items-->

            <nav class="nav">
                <ul class="menu lg:flex xl:40px lg:gap-x-[30px] justify-between hidden">
                    <li v-for="(item, index) in textMenuItems" :key="index"
                        class="inline-block h-[100px] pt-[39px] hover:border-b-2" :class="light ? 'text-white' : 'text-black' "
                        @mouseover="onItemMouseOver(index)"
                        @mouseleave="onItemMouseLeave">
                        <NuxtLink :to="item.to" class="relative hover:cursor-pointer"
                                  :data-id="item.id">
                            <h4> {{ item.title }} </h4>

                        </NuxtLink>

                        <!--                        modal of menu item-->

                        <modals-header-modal :items="collections"
                                       v-if="activeItemIndex === index && item.needToShowDropdown"/>
                    </li>
                </ul>
            </nav>

            <!--            contact us, favourite, search menu items-->

            <ul class="menu-icons flex  xl:gap-[40px] lg:gap-x-[35px] justify-between">
                <li v-for="(item, index) in iconsMenuItems" :key="index"
                    class="md:inline-block h-[92px] pt-[35px] hover:border-b-2 hover:cursor-pointer relative xl:w-[25px] xl:h-[25] lg:w-[25px] lg:h-[25] md:w-[22px] sm:w-[22px] hidden ">
                    <img :src="light ? item.whiteIconPath : item.blackIconPath" :alt="item.alt">
                </li>
            </ul>

            <!--            change language menu item-->

            <h3 class="lg:block font-mono text-sm hidden" :class="light ? 'text-white' : 'text-black'">RU</h3>
        </div>

    </header>

<!--    thin line between header and content-->
f
    <div class="border-b w-full" :class="setBorderColor(light)"></div>
</template>

<style scoped>

</style>