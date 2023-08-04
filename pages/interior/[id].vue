<script setup lang="ts">

import {baseURL} from "~/config";
import Hero from "~/components/base/hero.vue";
import MasonryWall from '@yeger/vue-masonry-wall'
import Pagination from "~/components/base/Pagination.vue";
import {useInteriorStore} from "~/stores/interiorStore";
import {storeToRefs} from "pinia";
import {isNewScope} from "ast-walker-scope";

const interiorStore = useInteriorStore()
const {projects} = storeToRefs(interiorStore)

// definePageMeta({layout: "dark-header"});

let route = useRoute()

const project = ref({})

const response = ref({})
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 10



const heroImage = "/interior/bg-interior.png"



async function getProjectData(query = `/${route.params.id}`) {

  project.value = await $fetch(`${baseURL}/api/projects${query}`);




}

onMounted(async () => {
  await getProjectData()
  console.log(project.value, 'project')

  response.value = project.value.images
  // total.value = project.value.count
  pagesCount.value = project.value.images.page_links.length
  // console.log(total.value, 'total')
  console.log(pagesCount.value, 'pagesCount')
  console.log(page_size, 'page_size')
  console.log(page.value, 'page')
})

function onChangePage(page){
  getProjectData(`/${route.params.id}?page=${page}`)
}
</script>

<template>
  <hero v-if="project && project.first_image" class="mb-24" :heroName="project.name" hero-description="" :heroImage="project.first_image.image"/>
  <div v-if="project" class="flex justify-center mb-24"><p>{{project.description}}</p></div>

<!--  <div v-if="project" class="main-container mt-24 grid grid-cols-3 gap-5">-->
<!--    <div v-for="image in project.images" class="h-72">-->
<!--      <div class="relative group">-->
<!--        <div class="w-full h-60 cursor-pointer">-->
<!--            <nuxt-img :src="image.image" :alt="image.project_name" class="w-full h-full transition-all duration-500 ease-in-out group-hover:brightness-50 object-cover"/>-->
<!--            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">-->
<!--              <div class="text-center">-->
<!--                <h2 class="text-white">{{ image.project_name }}</h2>-->
<!--              </div>-->
<!--            </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="pb-4">-->
<!--        <div v-for="tag in image.tags" class="inline-block">-->
<!--          <p>#{{tag.name}}&nbsp;&nbsp;</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  <masonry-wall v-if="project.images && project.images.images" :ssr-columns="1" :items="project.images.images" :column-width="500" :gap="16">
    <template #default="{ item: image, index :index}">
      <div
          :style="{
        height: `${(image.height/7)}px`,
        // this is for desktop
      }"
      >
        <nuxt-img :src="image.image" class=" h-full w-full object-cover" :alt="image.project_name" />
      </div>
    </template>
  </masonry-wall>
  <div class="main-container">
  <div class="mt-16 mb-16">
    <h3 v-if="project.designer">Автор проекта:{{ ' ' + project.designer.name + ' ' + (project.designer.middle_name ? project.designer.middle_name : '') + ' ' + project.designer.surname}}</h3>
  </div>
    <div class="flex justify-center">
  <pagination
      v-if="project.images && project.images.page_links"
      class="pb-32"
      :total="project.images.count"
      :page_size="page_size"
      :pagesCount="pagesCount"
      @page-change="onChangePage"
      v-model:current-page="page"/>
    </div>


    </div>
</template>

<style scoped>

</style>