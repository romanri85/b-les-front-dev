<script setup>
import {useCollections} from "~/composables/useCollections";

defineProps({light: {type: Boolean, default: true}})

import {baseURL} from "~/config";

const {collections} = useCollections()

const tags = await $fetch(`${baseURL}/api/projects/tags`)

const searchByParameters = [
    {}
]

const lgMenu = [
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

const menu = [
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
    <div class="bg-primaryDark xl:mt-[200px] lg:mt-[130px] md:mt-[80px] mt-[100px] ">
        <div class="main-container">
            <div class=" flex md:flex-row flex-col justify-between xl:pt-[90px] lg:pt-[60px] pt-[50px] md:items-start items-center md:pb-[90px] pb-[60px]">
                <div class="lg:pr-[60px] ">
                    <logo class=" xl:mb-[60px] lg:mb-[50px] mb-[30px]"/>
                    <div class="md:block hidden">
                        <buttons-secondary-button
                                class="xl:w-[290px] xl:h-[80px] lg:h-[70px] md:h-[60px] lg:w-[250px] md:w-[200px] sm:block sm:border-0 ">
                            {{ $t('catalog') }}
                        </buttons-secondary-button>
                    </div>
                </div>
                <p class="md:hidden text-white w-[150px]"> {{ $t('catalog') }}</p>


                <!--            lgMenu-->


                <div class="lg:block hidden">
                    <h3 class="text-white pt-4 mb-[25px]">{{ $t('collections') }}</h3>
                    <div v-for="(collection, index) in collections" :key="index" class="mt-[10px]">
                        <a href=""><p class="text-white ">{{ collection.name }}</p></a>
                    </div>
                </div>
                <div class="lg:block hidden">
                    <h3 class="text-white pt-4 mb-[25px]">{{ $t('searchByParameters') }}</h3>
                    <div v-for="(tag, index) in tags" :key="index" class="mt-[10px]">
                        <a href=""><p class="text-white ">{{ tag.name }}</p></a>
                    </div>
                </div>
                <div class="text-white lg:block hidden">
                    <h3 class="pt-4 mb-[25px]">{{ $t('whereToBuy') }}</h3>
                    <h3 class="pt-4 mb-[25px]">{{ $t('doorHardware') }}</h3>
                    <div>
                        <div class="mt-[10px]">
                            <a href=""><p>{{ $t('handles') }}</p></a>
                        </div>
                        <div class="mt-[10px]">
                            <a href=""><p>{{ $t('hinges') }}</p></a>
                        </div>
                        <div class="mt-[25px]">
                            <a href=""><h3>{{ $t('plinth') }}</h3></a>
                        </div>
                    </div>
                    <div class="mt-[25px]">
                        <a href=""><h3>{{ $t('doorSystems') }}</h3></a>
                    </div>

                </div>
                <div class="text-white lg:block hidden">
                    <h3 class="text-white pt-4 mb-[25px]">{{ $t('information') }}</h3>
                    <div v-for="(menuItem, index) in lgMenu" :key="index" class="mt-[10px]">
                        <a href=""><p class="text-white ">{{ $t(menuItem.name) }}</p></a>
                    </div>
                </div>


                <!--        menu-->

                <div class="lg:hidden w-[150px]">
                    <div v-for="(menuItem, index) in menu.slice(1, 5)" :key="index">
                        <div class="text-white pt-4">
                            <a href=""><p class="text-white ">{{ $t(menuItem.name) }}</p></a>
                        </div>
                    </div>
                </div>
                <div class="lg:hidden w-[150px]">
                    <div v-for="(menuItem, index) in menu.slice(5, 8)" :key="index">
                        <div class="text-white pt-4">
                            <a href=""><p class="text-white ">{{ $t(menuItem.name) }}</p></a>
                        </div>
                    </div>
                </div>
                <div class="lg:hidden w-[150px]">
                    <div class="lg:hidden" v-for="(menuItem, index) in menu.slice(8)" :key="index">
                        <div class="text-white pt-4">
                            <a href=""><p class="text-white ">{{ $t(menuItem.name) }}</p></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-b-[1px] border-[grey] hidden md:block"></div>
            <div class=" w-full h-[90px] flex md:justify-end justify-center md:items-center items-start">
                <nuxt-img src="/insta.svg"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>