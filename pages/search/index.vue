<template>
  <div class="main-container">
    <h4 class="pt-12 hidden md:block">Главная/</h4>
    <div class="pt-20">
      <h1>Поиск дверей по сайту</h1>
    </div>
    <client-only>
      <!-- Search Form -->
      <TabGroup :selected-index="selectedTabindex">
        <TabList>

      <div class="flex md:flex-row flex-col justify-between max-w-[680px] pt-10 lg:pt-16 lg:pb-16 pb-10">
        <form-kit
            type="search"
            prefixIcon="search"
            v-model="SearchQuery"
            @input="updateQueryAndSearch"



            placeholder="Вводите..."
        >
        </form-kit>




          <div class="md:pl-8 flex  md:justify-start gap-x-28 md:gap-x-32 lg:gap-x-40 pr-4">
            <Tab  class="text-primaryDark">
              <div class="relative outline-none"  @click="MaterialColorProductVariantTotalHits ? selectedTabindex=0 : null">
                  <span v-if="MaterialColorProductVariantTotalHits > 0 " class="text-primaryDark absolute text-md -right-6 -top-3">{{
                      MaterialColorProductVariantTotalHits
                    }}</span>
                <h2
                    :class="{'underline': selectedTabindex===0, 'text-gray-400': MaterialColorProductVariantTotalHits===0}"
                    class=" underline-offset-4">Двери</h2>
              </div>
            </Tab>
            <Tab  class="text-primaryDark">
              <div class="relative" @click="ImageTotalHits ? selectedTabindex=1 : null">
                  <span v-if="ImageTotalHits > 0 " class="text-primaryDark absolute text-md -right-6 -top-3">{{
                      ImageTotalHits
                    }}</span>
                <h2
                    :class="{'underline': selectedTabindex===1, 'text-gray-400': ImageTotalHits===0}"
                    class=" underline-offset-4">Фото</h2>
              </div>
            </Tab>

          </div>
      </div>

        </TabList>


        <TabPanels>
          <TabPanel>
<div v-if="MaterialColorProductVariantTotalHits">
            <div class="mt-4 md:mt-16 gap-y-8 lg:grid-cols-4 mdLg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-7 grid"
                 ref="parent">
              <!--        <pre>{{MaterialColorProductVariantResponse.hits}}</pre>-->
              <!--        <pre>{{MaterialColorProductVariantSearchResults}}</pre>-->
              <div ref="MaterialColorProductVariantHitsBlock" v-for="hit in MaterialColorProductVariantSearchResults" :key="hit.objectID">
                <NuxtLink
                    :to="`/catalog/${hit.product_variant.product}?material=${hit.color.material}&color=${hit.color.id}`">
                  <search-door-card class="relative  transition-all duration-300 pb-6 mb-6"
                                    :hit="hit"/>


                </NuxtLink>
              </div>
            </div>
            <div class="flex justify-center">
              <base-pagination v-if="MaterialColorProductVariantTotalHits" class="pb-32"
                               :total="MaterialColorProductVariantTotalHits"
                               :page_size="24"
                               @page-change="handleNewMaterialColorProductVariantPage"
                               v-model:current-page="MaterialColorProductVariantCurrentPage"
              />
            </div>
</div>
            <div v-else-if="!SearchQuery">
              <div class="flex justify-center pb-12">
                <h2 class="text-2xl">Введите запрос</h2>
              </div>
            </div>
            <div v-if="SearchQuery && !ImageTotalHits && !MaterialColorProductVariantTotalHits">
              <div class="flex justify-center pb-12">
                <h2 class="text-2xl">К сожалению,Ничего не найдено</h2>
              </div>
            </div>
          </TabPanel>


          <TabPanel>
            <div ref="ImageHitsBlock" class=" pb-16 lg:pb-24">
              <div class="my-image-grid grid grid-cols-3 gap-4">
                <div v-for="(image, index) in ImageSearchResults" :key="index" class="cursor-pointer my-image-cell">
                  <nuxt-img @click="triggerModal(image)" :src="`https://b-les-storage.ams3.digitaloceanspaces.com/media/${image.image}`"
                            class="object-cover cursor-pointer my-image-item" :alt="image.project_name"/>
                </div>
              </div>
            </div>
            <div class="flex justify-center">
            <base-pagination v-if="ImageTotalHits" class="pb-32"
                             :total="ImageTotalHits"
                             :page_size="12"
                             @page-change="handleImagePage"
                             v-model:current-page="ImageCurrentPage"/>
            </div>
            <image-modal :image="selectedImage" ref="imgModal"/>
          </TabPanel>
        </TabPanels>
      </TabGroup>

    </client-only>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import algoliasearch from 'algoliasearch/lite';
import SearchDoorCard from "~/pages/search/SearchDoorCard.vue";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/vue";
import {adjustLayoutForNarrowImages, classifyImageLayout} from "~/services/imageLayoutService";
import ImageModal from "~/components/pop-ups/ImageModal.vue";

definePageMeta({layout: "dark-header"});


const config = useRuntimeConfig()

const imgModal = ref(null);
const selectedImage = ref(null);

const triggerModal = (image) => {
  selectedImage.value = image;
  if (imgModal.value && imgModal.value.openModal) {
    imgModal.value.openModal();
  } else {
    console.error('Method not available or component not initialized.');
  }
};

// Initialize Algolia client
const client = algoliasearch(config.public.ALGOLIA_APPLICATION_ID, config.public.ALGOLIA_SEARCH_API_KEY);
const MaterialColorProductVariantIndex = client.initIndex('MaterialColorProductVariant');
const ImageIndex = client.initIndex('Image');
const SearchQuery = ref(' ');


const ImageSearchResults = ref([]);
const ImageTotalHits = ref(0);
const ImageCurrentPage = ref(1);
const ImageNbPages = ref(0);

// State

const MaterialColorProductVariantSearchResults = ref([]);
const MaterialColorProductVariantTotalHits = ref(0);  // New property to hold total hits
const MaterialColorProductVariantCurrentPage = ref(1);
const MaterialColorProductVariantNbPages = ref(0);

const MaterialColorProductVariantHitsBlock = ref(null);
const ImageHitsBlock = ref(null);
const scrollToMaterialColorProductVariantHitsBlock = () => {
  if (MaterialColorProductVariantHitsBlock.value) {
    MaterialColorProductVariantHitsBlock.value.scrollIntoView({behavior: 'smooth'});
  }
};

const scrollToImageHitsBlock = () => {
  if (ImageHitsBlock.value) {
    ImageHitsBlock.value.scrollIntoView({behavior: 'smooth'});
  }
};

const selectedTabindex = ref(null);
const selectedTabindexKey = ref(0);
const performSearch = async (page = 0) => {
  if (SearchQuery.value) {

    const MaterialColorProductVariantPromise = MaterialColorProductVariantIndex.search(
        SearchQuery.value,
        {
          hitsPerPage: 24,
          page: MaterialColorProductVariantCurrentPage.value - 1,
        }
    );

    const ImagePromise = ImageIndex.search(SearchQuery.value, {
      hitsPerPage: 12,
      page: ImageCurrentPage.value - 1,
    });

    const [MaterialColorProductVariantResponse, ImageResponse] = await Promise.all([
      MaterialColorProductVariantPromise,
      ImagePromise,
    ]);

    selectedTabindex.value = 0;

    MaterialColorProductVariantSearchResults.value = MaterialColorProductVariantResponse.hits;
    MaterialColorProductVariantTotalHits.value = MaterialColorProductVariantResponse.nbHits;
    if (MaterialColorProductVariantTotalHits.value === 0) {
      selectedTabindex.value = 1;
    }

    // Update ImageSearchResults and ImageTotalHits
    ImageSearchResults.value = ImageResponse.hits;
    ImageTotalHits.value = ImageResponse.nbHits;

    // Check for no hits and notify the user
    if (MaterialColorProductVariantResponse.nbHits === 0 && ImageResponse.nbHits === 0) {
      // Notify the user, e.g., through a UI element or a console log
      console.log("No results found in both indices.");
      selectedTabindex.value = null;
    }
  } else {
    MaterialColorProductVariantSearchResults.value = [];
    MaterialColorProductVariantTotalHits.value = 0;
    ImageSearchResults.value = [];  // Resetting Image search results
    ImageTotalHits.value = 0;  // Resetting Image total hits
    selectedTabindex.value = null;
  }
  selectedTabindexKey.value ++;
};
const MaterialColorProductVariantResponse = ref(null);
const performMaterialColorProductVariantSearch = async (page = 0) => {
  if (SearchQuery.value) {
    MaterialColorProductVariantResponse.value = await MaterialColorProductVariantIndex.search(SearchQuery.value, {
      hitsPerPage: 24,
      page: MaterialColorProductVariantCurrentPage.value - 1,
    });
    MaterialColorProductVariantSearchResults.value = MaterialColorProductVariantResponse.value.hits;
    MaterialColorProductVariantNbPages.value = MaterialColorProductVariantResponse.value.nbPages;
    MaterialColorProductVariantTotalHits.value = MaterialColorProductVariantResponse.value.nbHits;  // Updating total hits
  } else {
    MaterialColorProductVariantSearchResults.value = [];
    MaterialColorProductVariantTotalHits.value = 0;  // Resetting total hits to 0
  }
};

const ImageResponse = ref(null);

const performImageSearch = async (page = 0) => {
  if (SearchQuery.value) {
    ImageResponse.value = await ImageIndex.search(SearchQuery.value, {
      hitsPerPage: 12,
      page: ImageCurrentPage.value - 1,
    });
    ImageSearchResults.value = ImageResponse.value.hits;
    ImageNbPages.value = ImageResponse.value.nbPages;
    ImageTotalHits.value = ImageResponse.value.nbHits;  // Updating total hits
  } else {
    ImageSearchResults.value = [];
    ImageTotalHits.value = 0;  // Resetting total hits to 0
  }
};

const performSearchDebounced = useDebounce(performSearch, 100);  // 100ms delay


const updateQueryAndSearch = async (newQuery: string) => {
  SearchQuery.value = newQuery;
  MaterialColorProductVariantCurrentPage.value = 1;
  ImageCurrentPage.value = 1;
  await performSearchDebounced();
};
// Methods





// On Mounted, you could perform an initial search if needed
onMounted(() => {
  // SearchQuery.value =  'двери';
  performSearch();

});
const handleNewMaterialColorProductVariantPage = (newPage) => {
  MaterialColorProductVariantCurrentPage.value = newPage;
  performMaterialColorProductVariantSearch()
  // performSearchDebounced(newPage);
  scrollToMaterialColorProductVariantHitsBlock();
};

const handleImagePage = (newPage) => {
  ImageCurrentPage.value = newPage;
  performImageSearch()
  // performSearchDebounced(newPage);
  scrollToImageHitsBlock();
};
</script>
<style>
.my-image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px; /* Adjust as needed */
}

.my-image-cell {
  position: relative;
  overflow: hidden;
  padding-top: 100%; /* 1:1 Aspect Ratio */
}

.my-image-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
