<script setup lang="ts">

import Hero from "~/components/base/hero.vue";
import {onMounted, ref} from "vue";
import {useInteriorStore} from "~/stores/interiorStore";
import buttons from "~/data/interiorButtons.json";
import Pagination from "~/components/base/Pagination.vue";
import {baseURL} from "~/config";
import ImageModal from "~/components/pop-ups/imageModal.vue";
import {useRoute} from "vue-router";

let route = useRoute()


const interiorStore = useInteriorStore()


const heroName = "interiorHeader"
const heroDescription = ""
const heroImage = "/interior/bg-interior.png"

const initialTags = ref([]);
const imgModal = ref(null);
const selectedImage = ref(null); // this will store the selected/clicked image data
const selectedTags = ref([])
const selectedImages = ref([])
const total = ref(0)
let pagesCount = ref(0)
const page_size = 9
const page = ref(1)
const tags = ref([])
const tagsForForm = ref([])


onMounted(
    async () => {
      await getTags()
      await transformTags()

      await (async () => {
        if (route.query.tags) {
          console.log(route.query.tags, 'route.query.tags')
          initialTags.value = [String(route.query.tags)]; // assuming tags is a single value. If it's multiple values separated by commas, split it: route.query.tags.split(',')
          selectedTags.value = initialTags.value;
        await getImagesByTags(selectedTags.value)
        return
        }
      })()



      await getImagesByTags(selectedTags.value)
    }
)


const layoutImages = computed(() => {
  if (selectedImages.value && selectedImages.value.results) {
    let images = selectedImages.value.results.map((image: { height: number; width: number }) => {
      const aspectRatio = image.height / image.width;
      if (aspectRatio > 1) {
        return {...image, layout: 'narrow'};  // Portrait images (taller than wide)
      } else {
        return {...image, layout: 'wide'};    // Landscape images (wider than tall)
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

async function getTags() {
  tags.value = await $fetch(`${baseURL}/api/projects/tags`);
}

async function transformTags() {
  if (tags.value.length > 0) {
    tagsForForm.value = tags.value.map(tag => {
      return {
        label: tag.name,
        value: String(tag.id)
      };
    });
  }
}

async function getImagesByTags(tagIds, page = 1) {
  console.log(tagIds, 'tagIds')
  // Join the tagIds into a query string
  const tagsQueryString = new URLSearchParams({
    tags: tagIds.join(",")
  }).toString();
  const url = `http://localhost:8000/api/projects/images?${tagsQueryString}&page=${page}`;
  console.log(url, 'url')


  selectedImages.value = await $fetch(url)
  total.value = selectedImages.value.count
  pagesCount.value = selectedImages.value.page_links.length

}

function onChangePage(page) {
  getImagesByTags(selectedTags.value, page)

}

function selectTag(tag) {
  // getImagesByTags(tag, 1)
  selectedTags.value = tag
  page.value = 1
  getImagesByTags(tag, 1)

}

const triggerModal = (image) => {
  selectedImage.value = image;
  if (imgModal.value && imgModal.value.openModal) {
    imgModal.value.openModal();
  } else {
    console.error('Method not available or component not initialized.');
  }
};

function handleChooseTag(tag) {
  selectedTags.value = [...selectedTags.value, String(tag.id)]
  // page.value = 1
  getImagesByTags(selectedTags.value)
  page.value = 1
}

</script>

<template>
  <div>
  <hero :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage" :buttons="buttons"/>

  <div class="flex justify-center">


    <FormKit
        type="form"
        #default="{ value }"
        :actions="false"

    >
      <FormKit
          type="taglist"
          name="taglist"
          label="Taglist with max prop set to 2"
          :options="tagsForForm"
          max="10"
          :key="selectedTags"
          :value="selectedTags || []"
          select-icon="caretDown"
          @input="selectTag"
          remove-icon="close"
          :filter="(option, search) =>
        option.label.toLowerCase().startsWith(search.toLowerCase())"
      />
      <!--      <pre wrap>{{ value }}</pre>-->
    </FormKit>
  </div>
  <div class="image-container">
    <div v-for="(image, index) in layoutImages" :key="index"
         :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`">
      <nuxt-img @click="triggerModal(image)" :src="image.image" class="object-cover" :alt="image.project_name"/>
    </div>
  </div>
  <image-modal :image="selectedImage" @chooseTag="handleChooseTag" ref="imgModal"/>
  <pagination v-if="page" class="pb-32 flex justify-center" :total="total"
              :page_size="page_size"
              :pagesCount="pagesCount"
              @page-change="onChangePage"
              v-model:current-page="page"/>
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
  flex: 0 0 calc(33.33% - 16px); /* 3 images in a row, consider the gap */
}

.image-wrapper.square {
  flex: 0 0 calc(66.6% - 16px);
  height: 100%;
  object-fit: contain; /* 4 images in a row, consider the gap */
}

.image-wrapper.wide {
  flex: 0 0 calc(50% - 16px); /* 2 images in a row, consider the gap */
}


.image-wrapper img {
  width: 100%;
  height: auto;
}

.image-wrapper.narrow img {
  aspect-ratio: 2/3; /* Narrow images are tall (aspect ratio of height to width is 2:3) */
}

.image-wrapper.wide img {
  object-fit: fill;
  aspect-ratio: 3/2; /* Wide images are wide (aspect ratio of width to height is 3:2) */
}

.image-wrapper.square img {
  aspect-ratio: 2.7 / 2; /* Adjust this value to desired ratio */
  width: 100%;
  height: auto;
  object-fit: cover;
}


</style>