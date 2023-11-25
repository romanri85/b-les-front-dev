<script setup lang="js">
import {ref} from 'vue'
import {baseURL} from '~/config'
import BaseHero from '~/components/base/BaseHero.vue'
import Pagination from '~/components/base/pagination/Pagination.vue'
import {useInteriorStore} from "~/stores/interiorStore";

import {adjustLayoutForNarrowImages, classifyImageLayout} from '~/services/imageLayoutService'
import ImageModal2 from "~/components/pop-ups/ImageModal2.vue"; // Assuming the service is in the same directory

const interiorStore = useInteriorStore()

const page = ref(1)
const pagesCount = ref(0)
const page_size = 10

const project = ref({
  images: {
    images: [],
  },
})

const route = useRoute()

const selectedImage = ref(null) // this will store the selected/clicked image data

const imagesBlock = ref(null)


await getProjectData()

function scrollToImagesBlock() {
  imagesBlock.value.scrollIntoView({behavior: 'smooth'})
}

function triggerModal(image) {
  selectedImage.value = image
}

// definePageMeta({layout: "dark-header"});




// const response = ref({})


async function getProjectData(query = `/${route.params.id}`) {
  try {
    project.value = await $fetch(`${baseURL}/api/projects${query}`)
    pagesCount.value = project.value.images.page_links.length
  } catch (error) {
    console.error('Error fetching project data:', error)
  }
}


// Layout determination logic
onMounted(() => {
    // getProjectData()
})

function onChangePage(page) {
  getProjectData(`/${route.params.id}?page=${page}`)
  scrollToImagesBlock()
}

const layoutImages = computed(() => {
  if (project.value && project.value.images) {
    const images = project.value.images.images.map(classifyImageLayout)

    // Get the number of narrow images
    const numberOfNarrowImages = images.filter(image => image.layout === 'narrow').length

    adjustLayoutForNarrowImages(images, numberOfNarrowImages)

    return images
  }
  return []
})
</script>

<template>
  <div>
    <Head>
      <title>Брянский лес - Проекты</title>
    </Head>
    <BaseHero
        v-if="project && project.first_image" class="mb-24" :hero-name="project.name" hero-description=""
        :hero-image="project.first_image.image"
    />
    <!--  <div v-if="project" class="flex justify-center mb-24"><p>{{ project.description }}</p></div> -->

    <div ref="imagesBlock" class="layout-images">
      <div class="image-container">
        <div
            v-for="(image, index) in layoutImages" :key="index"
            :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`"
            class="cursor-pointer"
        >
          <nuxt-img
              :src="image.image" class="object-cover cursor-pointer" :alt="image.project_name"
              @click="triggerModal(image)"
          />
          <ImageModal2
              class="absolute z-50 lg:overflow-visible overflow-auto" @close="selectedImage = null"
              :image="image" :open="image.image===selectedImage?.image"
          />
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="mt-16 mb-16">
        <h3 v-if="project.designer">
          Автор
          проекта:{{
            ` ${project.designer.name} ${project.designer.middle_name ? project.designer.middle_name : ''} ${project.designer.surname}`
          }}
        </h3>
      </div>
      <div class="flex justify-center">
        <Pagination
            v-if="project.images && project.images.page_links"
            v-model:current-page="page"
            class="pb-32"
            :total="project.images.count"
            :page_size="page_size"
            :pages-count="pagesCount"
            @page-change="onChangePage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-wrapper {
  background-image: linear-gradient(to bottom, #ffffff, #cccccc);
  background-size: cover;
}
</style>
