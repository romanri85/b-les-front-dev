<template>
    <div class="bg-white flex flex-col justify-center items-center">
        <h1 class="xl:text-50-mono lg:text-45-mono mb-8">{{ $t('ourProjects') }}</h1>
        <p class="xl:w-600 lg:w-530 mb-12">{{ $t('ourProjectsDescription')
            }} </p>
        <div class="flex flex-row flex-wrap gap-[6px] justify-center overflow-hidden lg:mb-[40px] md:mb-[30px] mb-[20px]">
            <div v-for="(img,index) in projectsImages" class="lg:w-full lg:flex-1 md:w-[calc(50%-3px)] w-[calc((25%-3x)]" :key="index">
                <nuxt-img format="webp" quality="20" class="w-full h-full object-cover object-center aspect-square" :src="img"/>
            </div>
        </div>
        <ButtonsPrimaryButton>
            {{ $t('viewMore') }}
        </ButtonsPrimaryButton>
    </div>
</template>

<script setup>
import {baseURL} from "~/config";


const projects = await $fetch(`${baseURL}/api/projects`)
const projectsImages = projects.map(project => baseURL + project.first_image.image)
</script>

<style scoped>
.square {
    position: relative;
    width: 100%;
}



</style>