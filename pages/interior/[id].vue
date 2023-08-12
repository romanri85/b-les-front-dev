<script setup lang="ts">

import {baseURL} from "~/config";
import Hero from "~/components/base/hero.vue";
import Pagination from "~/components/base/Pagination.vue";
import {useInteriorStore} from "~/stores/interiorStore";
import {storeToRefs} from "pinia";
import ImageModal from "~/components/pop-ups/imageModal.vue";
import {adjustLayoutForNarrowImages, classifyImageLayout} from '~/services/imageLayoutService'; // Assuming the service is in the same directory
import {ref} from 'vue';

const interiorStore = useInteriorStore()
const {projects} = storeToRefs(interiorStore)


const imgModal = ref(null);

const selectedImage = ref(null); // this will store the selected/clicked image data

const triggerModal = (image) => {
  selectedImage.value = image;
  if (imgModal.value && imgModal.value.openModal) {
    imgModal.value.openModal();
  } else {
    console.error('Method not available or component not initialized.');
  }
};

// definePageMeta({layout: "dark-header"});

let route = useRoute()

const project = ref({
  images: {
    images: []
  }
});

// const response = ref({})
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 10


const heroImage = "/interior/bg-interior.png"


async function getProjectData(query = `/${route.params.id}`) {
  try {
    const {data} = await useFetch(`${baseURL}/api/projects${query}`, {key: "images", cache: true});
    project.value = data.value
    // response.value = project.value.images;
    pagesCount.value = project.value.images.page_links.length;
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}


// Layout determination logic



await getProjectData()


function onChangePage(page) {
  getProjectData(`/${route.params.id}?page=${page}`)
}

const layoutImages = computed(() => {
  if (project.value && project.value.images) {
    let images = project.value.images.images.map(classifyImageLayout);

    // Get the number of narrow images
    const numberOfNarrowImages = images.filter(image => image.layout === 'narrow').length;

    adjustLayoutForNarrowImages(images, numberOfNarrowImages);

    return images;
  }
  return [];
});


</script>

<template>
  <hero v-if="project && project.first_image" class="mb-24" :heroName="project.name" hero-description=""
        :heroImage="project.first_image.image"/>
  <div v-if="project" class="flex justify-center mb-24"><p>{{ project.description }}</p></div>

  <div class="layout-images">
    <div class="image-container">
      <div v-for="(image, index) in layoutImages" :key="index"
           :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`">
        <nuxt-img @click="triggerModal(image)" :src="image.image" class="object-cover" :alt="image.project_name"/>
      </div>
    </div>
  </div>
  <image-modal :image="selectedImage" ref="imgModal"/>
  <div class="main-container">
    <div class="mt-16 mb-16">
      <h3 v-if="project.designer">Автор
        проекта:{{
          ' ' + project.designer.name + ' ' + (project.designer.middle_name ? project.designer.middle_name : '') + ' ' + project.designer.surname
        }}</h3>
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
/* Add to your scoped styles */

</style>

