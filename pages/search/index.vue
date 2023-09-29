<template>
  <div class="main-container">
    <h4 class="pt-12 hidden md:block">Главная/</h4>
    <div class="pt-20">
      <h1>Поиск дверей по сайту</h1>
    </div>
    <client-only>
      <!-- Search Form -->
      <TabGroup   >
        <TabList>

      <div class="flex md:flex-row flex-col justify-between max-w-[600px] pt-12">
        <form-kit
            type="search"
            prefixIcon="search"
            v-model="SearchQuery"
            @input="updateQueryAndSearch"


            placeholder="Вводите..."
        >
        </form-kit>




          <div class="pl-8 flex justify-start gap-x-12 lg:gap-x-20 pr-4">
            <Tab index="1" :disabled="!MaterialColorProductVariantSearchResults" class="text-primaryDark">
              <div class="relative">
                  <span v-if="MaterialColorProductVariantTotalHits > 0 " class="text-primaryDark absolute text-md -right-6 -top-3">{{
                      MaterialColorProductVariantTotalHits
                    }}</span>
                <h2

                    class="underline-offset-4">Двери</h2>
              </div>
            </Tab>
            <Tab index=2 :disabled="!ImageSearchResults" class="text-primaryDark">
              <div class="relative">
                  <span v-if="ImageTotalHits > 0 " class="text-primaryDark absolute text-md -right-6 -top-3">{{
                      ImageTotalHits
                    }}</span>
                <h2

                    class="underline-offset-4">Фото</h2>
              </div>
            </Tab>

          </div>
      </div>

        </TabList>


        <TabPanels>
          <TabPanel>

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
          </TabPanel>


          <TabPanel>
            <div ref="ImageHitsBlock" class="layout-images pb-16 lg:pb-24">
              <div class="image-container">
                <div v-for="(image, index) in layoutImages" :key="index" class="cursor-pointer"
                     :class="`image-wrapper ${image.layout}${image.square ? ' square' : ''}`">
                  <nuxt-img @click="triggerModal(image)" :src="`https://b-les-storage.ams3.digitaloceanspaces.com/media/${image.image}`" class="object-cover cursor-pointer"
                            :alt="image.project_name"/>
                </div>
              </div>
            </div>
            <base-pagination v-if="ImageTotalHits" class="pb-32"
                             :total="ImageTotalHits"
                             :page_size="9"
                             @page-change="handleImagePage"
                             v-model:current-page="ImageCurrentPage"/>
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
const SearchQuery = ref('');


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
      hitsPerPage: 9,
      page: MaterialColorProductVariantCurrentPage.value - 1,
    });

    const [MaterialColorProductVariantResponse, ImageResponse] = await Promise.all([
      MaterialColorProductVariantPromise,
      ImagePromise,
    ]);

    MaterialColorProductVariantSearchResults.value = MaterialColorProductVariantResponse.hits;
    MaterialColorProductVariantTotalHits.value = MaterialColorProductVariantResponse.nbHits;

    // Update ImageSearchResults and ImageTotalHits
    ImageSearchResults.value = ImageResponse.hits;
    ImageTotalHits.value = ImageResponse.nbHits;

    // Check for no hits and notify the user
    if (MaterialColorProductVariantResponse.nbHits === 0 && ImageResponse.nbHits === 0) {
      // Notify the user, e.g., through a UI element or a console log
      console.log("No results found in both indices.");
    }
  } else {
    MaterialColorProductVariantSearchResults.value = [];
    MaterialColorProductVariantTotalHits.value = 0;
    ImageSearchResults.value = [];  // Resetting Image search results
    ImageTotalHits.value = 0;  // Resetting Image total hits
  }
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
      hitsPerPage: 9,
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
  await performSearchDebounced();
};
// Methods

const layoutImages = computed(() => {
  if (ImageSearchResults.value) {
    let images = ImageSearchResults.value.map(classifyImageLayout);

    // Get the number of narrow images
    const numberOfNarrowImages = images.filter(image => image.layout === 'narrow').length;

    adjustLayoutForNarrowImages(images, numberOfNarrowImages);

    // Sort images by height-to-width ratio in descending order
    // images.sort((a, b) => {
    //   const hwRatioA = a.height / a.width;
    //   const hwRatioB = b.height / b.width;
    //   return hwRatioB - hwRatioA;
    // });

    return images;
  }
  return [];
});

// On Mounted, you could perform an initial search if needed
onMounted(() => {
  // performSearch();
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
