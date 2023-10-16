<script setup lang="js">
import { ref } from 'vue'
import { baseURL } from '~/config'
import BaseHero from '~/components/base/BaseHero.vue'
import Pagination from '~/components/base/pagination/Pagination.vue'
import ImageModal from '~/components/pop-ups/ImageModal.vue'

import { adjustLayoutForNarrowImages, classifyImageLayout } from '~/services/imageLayoutService' // Assuming the service is in the same directory

const imgModal = ref(null)

const selectedImage = ref(null) // this will store the selected/clicked image data

const imagesBlock = ref(null)
function scrollToImagesBlock() {
  imagesBlock.value.scrollIntoView({ behavior: 'smooth' })
}
function triggerModal(image) {
  selectedImage.value = image
  if (imgModal.value && imgModal.value.openModal)
    imgModal.value.openModal()
  else
    console.error('Method not available or component not initialized.')
}

// definePageMeta({layout: "dark-header"});

const route = useRoute()

const project = ref({
  images: {
    images: [],
  },
})

// const response = ref({})
const page = ref(1)
const pagesCount = ref(0)
const page_size = 10

async function getProjectData(query = `/${route.params.id}`) {
  try {
    const { data } = await useFetch(`${baseURL}/api/projects${query}`, { key: 'images', cache: true })
    project.value = data.value
    // response.value = project.value.images;
    pagesCount.value = project.value.images.page_links.length
  }
  catch (error) {
    console.error('Error fetching project data:', error)
  }
}

// Layout determination logic

await getProjectData()

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
        >
          <nuxt-img
            :src="image.image" class="object-cover cursor-pointer" :alt="image.project_name"
            @click="triggerModal(image)"
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
    <ImageModal ref="imgModal" class="" :image="selectedImage" />
  </div>
</template>

<style scoped>
/* Add to your scoped styles */
</style>
