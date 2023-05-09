<script setup>
import {useCollections} from "~/composables/useCollections";

defineProps({light: {type: Boolean, default: true}})

import {baseURL} from "~/config";

const {collections} = useCollections()

const tags = await $fetch(`${baseURL}/api/projects/tags`)

const searchByParameters = [
    {}
]

const menu = [
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
</script>

<template>
    <div class="bg-primaryDark xl:mt-[200px] lg:mt-[130px] md:mt-[80px] mt-[100px]">
        <div class="main-container flex justify-between xl:pt-[90px] lg:pt-[60px] pt-[50px] items-start">
            <div class="lg:pr-[60px] ">
                <logo class=" xl:mb-[60px] lg:mb-[50px] mb-[30px]"/>
                <buttons-secondary-button
                        class="xl:w-[290px] xl:h-[80px] lg:h-[70px] md:h-[60px] lg:w-[250px] md:w-[200px] sm:block sm:border-0 ">
                    {{ $t('catalog') }}
                </buttons-secondary-button>
            </div>
            <div>
                <h3 class="text-white pt-4 mb-[25px]">{{ $t('collections') }}</h3>
                <div v-for="(collection, index) in collections" :key="index" class="mt-[10px]">
                    <a href=""><p class="text-white ">{{ collection.name }}</p></a>
                </div>
            </div>
            <div>
                <h3 class="text-white pt-4 mb-[25px]">{{ $t('searchByParameters') }}</h3>
                <div v-for="(tag, index) in tags" :key="index" class="mt-[10px]">
                    <a href=""><p class="text-white ">{{ tag.name }}</p></a>
                </div>
            </div>
            <div class="text-white ">
                <h3 class="pt-4 mb-[25px]">{{ $t('whereToBuy') }}</h3>
                <h3 class="pt-4 mb-[25px]">{{ $t('doorHardware') }}</h3>
                <div>
                    <div class="mt-[10px]">
                        <a href="" ><p>{{ $t('handles') }}</p></a>
                    </div>
                    <div class="mt-[10px]">
                        <a href="" ><p>{{ $t('hinges') }}</p></a>
                    </div>
                    <div class="mt-[25px]">
                        <a href="" ><h3>{{ $t('plinth') }}</h3></a>
                    </div>
                </div>
                <div class="mt-[25px]">
                    <a href="" ><h3>{{ $t('doorSystems') }}</h3></a>
                </div>

            </div>
            <div>
                <h3 class="text-white pt-4 mb-[25px]">{{ $t('information') }}</h3>
                <div v-for="(menuItem, index) in menu" :key="index" class="mt-[10px]">
                    <a href=""><p class="text-white ">{{ $t(menuItem.name) }}</p></a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>