<script setup lang="ts">

import BaseHero from "~/components/base/BaseHero.vue";
import {onMounted, ref} from "vue";
import {useInteriorStore} from "~/stores/interiorStore";
import buttons from "~/data/interiorButtons.json";
import Pagination from "~/components/base/pagination/Pagination.vue";
import {baseURL} from "~/config";
import ImageModal from "~/components/pop-ups/imageModal.vue";
import {useRoute} from "vue-router";

import {adjustLayoutForNarrowImages, classifyImageLayout} from '~/services/imageLayoutService';
import HeroInteriour from "~/components/pages/interiour/heroInteriour.vue"; // Assuming the service is in the same directory


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
const taglistKey = ref(0)


onMounted(
    async () => {
      await getTags()
      await transformTags()

      await (async () => {
        if (route.query.tags) {
          initialTags.value = [String(route.query.tags)]; // assuming tags is a single value. If it's multiple values separated by commas, split it: route.query.tags.split(',')
          selectedTags.value = initialTags.value;
          taglistKey.value++
          await getImagesByTags(selectedTags.value)
          return
        }
        if(!selectedTags.value[0]){
          selectedTags.value = [String(tags.value[1].id)];
          taglistKey.value++
          await getImagesByTags(selectedTags.value)
          return
        }
      })()


      await getImagesByTags(selectedTags.value)
    }
)


const layoutImages = computed(() => {
  if (selectedImages.value && selectedImages.value.results) {
    let images = selectedImages.value.results.map(classifyImageLayout);

    // Get the number of narrow images
    const numberOfNarrowImages = images.filter(image => image.layout === 'narrow').length;

    adjustLayoutForNarrowImages(images, numberOfNarrowImages);

    return images;
  }
  return [];
});

async function getTags() {
  tags.value = await $fetch(`${baseURL}/api/projects/tags`);
}

async function transformTags() {
  if ( tags.value.length > 0) {
    tagsForForm.value = tags.value.map(tag => {
      return {
        label: tag.name,
        value: String(tag.id)
      };
    });
  }
}

async function getImagesByTags(tagIds, page = 1) {
  // Join the tagIds into a query string
  const tagsQueryString = new URLSearchParams({
    tags: tagIds.join(",")
  }).toString();
  const url = `${baseURL}/api/projects/images?${tagsQueryString}&page=${page}`;


  selectedImages.value = await $fetch(url)
  total.value = selectedImages.value.count
  pagesCount.value = selectedImages.value.page_links.length

}

function onChangePage(page) {
  getImagesByTags(selectedTags.value, page)

}

// function selectTag(tag) {
//   // getImagesByTags(tag, 1)
//   console.log(tag, 'tag')
//   selectedTags.value = tag
//   page.value = 1
//   getImagesByTags(tag, 1)
//
// }

function selectTag(tag) {
  taglistKey.value ++
  // if (selectedTags.value == tag) {
  //   return;
  // }
  // get the last element from the tag array
  const lastTag = tag.slice(-1)[0];

  // Log the entire tag array and the last element

  // set selectedTags.value to the last element of tag array
  selectedTags.value = [lastTag];

  page.value = 1;
  getImagesByTags([lastTag], 1);
  window.scrollTo(0, 350);
}

watch(selectedTags, (newValue, oldValue) => {
  if (!newValue[0]) {
    selectedTags.value = oldValue
  }
}, { deep: true });
const triggerModal = (image) => {
  selectedImage.value = image;
  if (imgModal.value && imgModal.value.openModal) {
    imgModal.value.openModal();
  } else {
    console.error('Method not available or component not initialized.');
  }
};

function handleChooseTag(tag) {
  let tagId = String(tag.id);

  // Convert the array to a Set to remove duplicates, then convert it back to an array
  selectedTags.value = [...new Set([tagId])];

  getImagesByTags(selectedTags.value);
  page.value = 1;
  taglistKey.value++;
}


</script>

<template>
  <div class="">
    <hero-interiour :heroName="heroName" :hero-description="heroDescription" :heroImage="heroImage" :buttons="buttons"/>

    <div class="flex justify-center pt-16 pb-16">

      <FormKit

          type="form"
          #default="{ value }"
          :actions="false"

      >
        <FormKit
            type="taglist"
            name="taglist"
            :options="tagsForForm"
            max="10"
            :key="taglistKey"
            :value="selectedTags"
            select-icon="add"
            help="Выберите тег"
            prefixIcon="tag"
            open-on-click

            @input="selectTag"
            :filter="(option, search) =>
        option.label.toLowerCase().startsWith(search.toLowerCase())"
        />
        <!--      <pre wrap>{{ value }}</pre>-->
      </FormKit>
    </div>
    <div class="layout-images pb-16 lg:pb-24">
      <div class="image-container">
        <div v-for="(image, index) in layoutImages" :key="index"
             :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`">
          <nuxt-img @click="triggerModal(image)" :src="image.image" class="object-cover cursor-pointer" :alt="image.project_name"/>
        </div>
      </div>
    </div>
    <image-modal :image="selectedImage" @chooseTag="handleChooseTag" ref="imgModal"/>
    <pagination v-if="page" class="md:pb-32 pb-20 flex justify-center" :total="total"
                :page_size="page_size"
                :pagesCount="pagesCount"
                @page-change="onChangePage"
                v-model:current-page="page"/>
  </div>
</template>


<style scoped>
/* Add to your scoped styles */


</style>