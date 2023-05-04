<template>
    <div class=" main-container  bg-white flex justify-center items-center h-[100vh]">

        <div class="w-[50vw] xl:h-[815px] lg:h-[730px] text-center flex flex-col justify-between items-center">
            <h1 class="xl:text-50-mono lg:text-45-mono">Search by parameters</h1>
            <div v-for="item in tags" :key="item.id" class="">
                <h3 class="text-primaryGrey">{{ item.name }}</h3>
            </div>
        </div>
        <div class="w-[50vw] flex justify-center">
            <div class="bg-[url('/parameters-search.jpg')] bg-cover bg-center xl:h-[815px] lg:h-[730px] xl:w-[630px] lg:w-[530px] flex justify-center items-center">
                <buttons-secondary-button class="xl:w-[320px] xl:h-[80px] lg:w-[250px] lg:h-[70px]">Search photo by tag
                </buttons-secondary-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {baseURL} from "~/config";

const tags = await $fetch(`${baseURL}/api/projects/tags`)
</script>

<style scoped>

</style>