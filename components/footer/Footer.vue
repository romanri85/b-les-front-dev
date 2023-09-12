<script setup lang="ts">
defineProps({light: {type: Boolean, default: true}})

import collections from '~/data/SliderCollections.json'
import BaseLogo from "~/components/base/BaseLogo.vue";

const {locale, setLocale} = useI18n()



function toggleLocale() {
    const newLocale = locale.value === 'en' ? 'ru' : 'en'
    setLocale(newLocale)
}

// const tags = await $fetch(`${baseURL}/api/projects/tags`)



const xlLgMenu = [
    {
        "name": "searchPhotoByTag",
        "image": "/header-modal-img/delivery-installation.jpg",
        "slug": "/other-items/delivery-and-installation"
    },
    {
        "name": "ourProjects",
        "image": "/header-modal-img/delivery-installation.jpg",
        "slug": "/other-items/delivery-and-installation"
    },

    {
        "name": "deliveryAndInstallation",
        "image": "/header-modal-img/delivery-installation.jpg",
        "slug": "/other-items/delivery-and-installation"
    },
    {

        "name": "aboutUs",
        "image": "/header-modal-img/about-us.jpg",
        "slug": "/about-us/about-us"
    },
    {
        "name": "promotions",
        "image": "/header-modal-img/promotions.jpg",
        "slug": "/about-us/promotions"
    },
    {
        "name": "toDesigners",
        "image": "/header-modal-img/to-designers.jpg",
        "slug": "/about-us/to-designers"
    },
    {
        "name": "toDealers",
        "image": "/header-modal-img/to-dealers.jpg",
        "slug": "/about-us/to-dealers"
    }]

const mdSmMenu = [
    {
        "name": "catalog",
        "image": "/header-modal-img/delivery-installation.jpg",
        "slug": "/catalog"
    },
    {
        "name": "collections",
        "image": "/header-modal-img/delivery-installation.jpg",
        "slug": "/collections"
    },

    {
        "name": "doorSystems",
        "image": "/header-modal-img/delivery-installation.jpg",
        "slug": "/door-systems"
    },
    {
        "name": "doorHardware",
        "image": "/header-modal-img/door-hardware.jpg",
        "slug": "/door-hardware"
    },
    {
        "name": "plinth",
        "image": "/plinth.jpg",
        "slug": "/plinth"
    },
    {
        "name": "toDesigners",
        "image": "/header-modal-img/to-designers.jpg",
        "slug": "/about-us/to-designers"
    },
    {
        "name": "toDealers",
        "image": "/header-modal-img/to-dealers.jpg",
        "slug": "/about-us/to-dealers"
    },
    {
        "name": "promotions",
        "image": "/header-modal-img/promotions.jpg",
        "slug": "/about-us/promotions"
    },
    {
        "name": "deliveryAndInstallation",
        "image": "delivery-installation.jpg",
        "slug": "/other-items/delivery-and-installation"
    },
    {
        "name": "whereToBuy",
        "image": "/where-to-buy.jpg",
        "slug": "/where-to-buy"
    },
    {
        "name": "searchPhotoByTag",
        "image": "/delivery-installation.jpg",
        "slug": "/other-items/delivery-and-installation"
    },
    {
        "name": "ourProjects",
        "image": "/header-modal-img/delivery-installation.jpg",
        "slug": "/other-items/delivery-and-installation"
    },
    {

        "name": "aboutUs",
        "image": "/header-modal-img/about-us.jpg",
        "slug": "/about-us/about-us"
    },


]
</script>


<template>
    <div class="bg-black ">
        <div class="main-container">
            <div class=" flex md:flex-row flex-col justify-between xl:pt-24 lg:pt-16 pt-12 md:items-start items-center md:pb-24 pb-12">
                <div class="lg:pr-16 ">
                    <BaseLogo light class=" xl:mb-16 lg:mb-12 mb-5"/>
                    <div class="md:block hidden">
                        <buttons-secondary-button
                                class="xl:w-72 xl:h-20 lg:h-16 md:h-16 lg:w-64 md:w-52 lg:flex sm:block sm:border-0 ">
                            {{ $t('catalog') }}
                        </buttons-secondary-button>
                    </div>
                    <button type="button" class="md:block hidden font-mono text-sm py-12"
                            @click="toggleLocale"><h3
                            :class="light ? 'text-white' : 'text-black'">{{ locale === 'en' ? "EN" : "RU" }}</h3>
                    </button>

                </div>
                <p class="md:hidden text-white w-36 ml-12"> {{ $t('catalog') }}</p>


                <!--            lgMenu-->


                <div class="lg:block hidden">
                    <h3 class="text-white mt-5 mb-5">{{ $t('collections') }}</h3>
                    <div v-for="(collection, index) in collections" :key="collection.name" class="mt-[10px]">
                      <NuxtLink :to="`/catalog?collection=${collection.id}`"><p class="text-normalGrey ">{{ $t(collection.name) }}</p></NuxtLink>
                    </div>
                </div>
                <div class="lg:block hidden">
                    <h3 class="text-white mt-5  mb-5">{{ $t('searchByParameters') }}</h3>
<!--                    <div v-for="(tag, index) in tags" :key="index" class="mt-2">-->
<!--                        <a href=""><p class="text-normalGrey">{{ tag.name }}</p></a>-->
<!--                    </div>-->
                </div>
                <div class="text-white lg:block hidden">
                    <h3 class="mb-12 mt-5 ">{{ $t('whereToBuy') }}</h3>
                    <h3 class="mb-5">{{ $t('doorHardware') }}</h3>
                    <div>
                        <div class="mt-2">
                            <a href=""><p class="text-normalGrey ">{{ $t('handles') }}</p></a>
                        </div>
                        <div class="mt-2">
                            <a href=""><p class="text-normalGrey ">{{ $t('hinges') }}</p></a>
                        </div>
                        <div class="mt-12">
                            <a href=""><h3>{{ $t('plinth') }}</h3></a>
                        </div>
                    </div>
                    <div class="mt-12">
                        <a href=""><h3>{{ $t('doorSystems') }}</h3></a>
                    </div>

                </div>
                <div class="text-white lg:block hidden">
                    <h3 class="text-white mb-5 mt-5 ">{{ $t('information') }}</h3>
                    <div v-for="(menuItem, index) in xlLgMenu" :key="menuItem.name" class="mt-2">
                        <a href=""><p class="text-normalGrey">{{ $t(menuItem.name) }}</p></a>
                    </div>
                </div>


                <!--        menu-->

                <div class="lg:hidden w-36 ml-12">
                    <div v-for="(menuItem, index) in mdSmMenu.slice(1, 5)" :key="menuItem.name">
                        <div class="text-white pt-4">
                            <a href=""><p class="">{{ $t(menuItem.name) }}</p></a>
                        </div>
                    </div>
                </div>
                <div class="lg:hidden w-36 ml-12">
                    <div v-for="(menuItem, index) in mdSmMenu.slice(5, 8)" :key="menuItem.name">
                        <div class="text-white pt-4">
                            <a href=""><p class=" ">{{ $t(menuItem.name) }}</p></a>
                        </div>
                    </div>
                </div>
                <div class="lg:hidden w-36 ml-12">
                    <div class="lg:hidden" v-for="(menuItem, index) in mdSmMenu.slice(8)" :key="menuItem.name">
                        <div class="text-white pt-4">
                            <a href=""><p class="">{{ $t(menuItem.name) }}</p></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-b border-primaryGrey hidden md:block"></div>
            <div class="h-24 flex md:justify-end justify-center md:items-center items-start">
                <div class="w-36 ml-12">
                    <nuxt-img src="/insta.svg"/>
                </div>
            </div>
            <div class="w-full flex justify-center">
                <div class="w-36 ml-12">
                    <button type="button" class="md:hidden font-mono text-sm pb-12"
                            @click="toggleLocale"><h3
                            :class="light ? 'text-white' : 'text-black'">{{ locale === 'en' ? "EN" : "RU" }}</h3>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>