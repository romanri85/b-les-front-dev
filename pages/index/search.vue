<template>
    <div class=" main-container  bg-white flex flex-col lg:flex-row lg:justify-center justify-around items-center h-[100vh]">

        <div class="lg:w-[50vw] w-[80vw] text-center flex flex-col justify-between items-center">
            <h1 class="xl:text-50-mono lg:text-45-mono mb-[30px]">Search by parameters</h1>
            <div class="lg:block flex flex-wrap">
                <div v-for="item in tags" :key="item.id" class="">
                    <h3 class=" lg:pb-[30px] pb-[20px] lg:pr-0 pr-[30px] ">
                        <span class="md:text-primaryGrey hover:text-black  hover:border-black border-b-2 md:border-transparent border-b-black hover:cursor-pointer">{{ item.name }}</span>
                    </h3>
                </div>
            </div>
        </div>
        <div class=" lg:w-[50vw] w-[100vw] flex justify-center lg:h-[70%] h-[50%] items-center">
            <div class="mx-[35px] bg-[url('/parameters-search.jpg')] bg-cover bg-center lg:w-[70%] w-full h-full flex justify-center items-center ">
                <buttons-secondary-button class="xl:w-[320px] xl:h-[80px] md:w-[250px] md:h-[70px] w-full h-[60px] md:bg-white bg-black md:text-black text-white cursor-pointer">Search photo by tag
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