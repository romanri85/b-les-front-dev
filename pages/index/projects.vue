<template>
    <div class="flex flex-col justify-center items-center">
        <h2 class=" mb-8">{{ $t('ourProjects') }}</h2>
        <h5 class=" lg:w-530 mb-12 main-container text-primaryDark">{{ $t('ourProjectsDescription')
            }} </h5>
        <div class="flex flex-row flex-wrap gap-1 justify-center lg:mb-10 md:mb-7 mb-5">
            <div v-for="(img,index) in projectsImages" class="lg:w-full lg:flex-1 md:w-[calc(50%-2px)] w-[calc((25%-2x)]" :key="index">
                <nuxt-img placeholder class="w-full h-full object-cover object-center aspect-square" :src="img"/>
            </div>
        </div>
        <ButtonsPrimaryButton>
            {{ $t('viewMore') }}
        </ButtonsPrimaryButton>
    </div>
</template>

<script setup>
import {baseURL} from "~/config";


// const projects = await $fetch(`${baseURL}/api/projects/`)
// const projects = await $fetch(`/api/projects/`)
// const projectsImages = projects.map(project => project.first_image.image)
</script>

<style scoped>
.square {
    position: relative;
    width: 100%;
}



</style>