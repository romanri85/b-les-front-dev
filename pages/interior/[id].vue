<script setup lang="ts">

import {baseURL} from "~/config";
import Hero from "~/components/base/hero.vue";
import MasonryWall from '@yeger/vue-masonry-wall'
import Pagination from "~/components/base/Pagination.vue";
import {useInteriorStore} from "~/stores/interiorStore";
import {storeToRefs} from "pinia";
import {isNewScope} from "ast-walker-scope";
import ImageModal from "~/components/pop-ups/imageModal.vue";

const interiorStore = useInteriorStore()
const {projects} = storeToRefs(interiorStore)

import { ref } from 'vue';



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

const response = ref({})
let page = ref(1)
const total = ref(0)
let pagesCount = ref(0)
const page_size = 10



const heroImage = "/interior/bg-interior.png"



async function getProjectData(query = `/${route.params.id}`) {
  try {
    project.value = await $fetch(`${baseURL}/api/projects${query}`);
    response.value = project.value.images;
    pagesCount.value = project.value.images.page_links.length;
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}






// Layout determination logic

onMounted(async () => {
  await getProjectData()

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

const layoutImages = computed(() => {
  if (project.value.images && project.value.images.images) {
    let images = project.value.images.images.map((image: { height: number; width: number }) => {
      const aspectRatio = image.height / image.width;
      if (aspectRatio > 1) {
        return { ...image, layout: 'narrow' };  // Portrait images (taller than wide)
      } else {
        return { ...image, layout: 'wide' };    // Landscape images (wider than tall)
      }
    });

    // Get the number of narrow images
    const numberOfNarrowImages = images.filter(image => image.layout === 'narrow').length;

    // Check if the remainder of division of the number of narrow images by 3 is equal to 1
    if (numberOfNarrowImages % 3 === 1) {
      // Check if there is at least one element with layout: wide
      const wideIndex = images.findIndex(image => image.layout === 'wide');

      // If an element with layout: wide exists, change its layout to 'narrow'
      if (wideIndex !== -1) {
        images[wideIndex].layout = '';
        images[wideIndex].square = true;
      }
    }

    return images;
  }
  return [];
});


</script>

<template>
  <hero v-if="project && project.first_image" class="mb-24" :heroName="project.name" hero-description="" :heroImage="project.first_image.image"/>
  <div v-if="project" class="flex justify-center mb-24"><p>{{project.description}}</p></div>


  <div class="image-container">
    <div v-for="(image, index) in layoutImages" :key="index"
         :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`">
      <nuxt-img @click="triggerModal(image)" :src="image.image" class="object-cover" :alt="image.project_name" />
    </div>
  </div>
  <image-modal :image="selectedImage" ref="imgModal"/>
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
/* Add to your scoped styles */

.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.image-wrapper {
  flex: 0 0 auto; /* Default for non-square images */
}

.image-wrapper.narrow {
  flex: 0 0 calc(33.33% - 16px);  /* 3 images in a row, consider the gap */
}

.image-wrapper.square {
  flex: 0 0 calc(66.6% - 16px);
  height: 100%;
  object-fit: contain;/* 4 images in a row, consider the gap */
}

.image-wrapper.wide {
  flex: 0 0 calc(50% - 16px);     /* 2 images in a row, consider the gap */
}


.image-wrapper img {
  width: 100%;
  height: auto;
}

.image-wrapper.narrow img {
  aspect-ratio: 2/3;  /* Narrow images are tall (aspect ratio of height to width is 2:3) */
}

.image-wrapper.wide img {
  object-fit: fill;
  aspect-ratio: 3/2;  /* Wide images are wide (aspect ratio of width to height is 3:2) */
}

.image-wrapper.square img {
  aspect-ratio: 2.7 / 2; /* Adjust this value to desired ratio */
  width: 100%;
  height: auto;
  object-fit: cover;
}



</style>

