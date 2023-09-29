<template>
  <div class="main-container">
    <h4 class="pt-12 hidden md:block">Главная/</h4>
    <div class="pt-20">
      <h1>Поиск дверей по сайту</h1>
    </div>
    <client-only>
      <!-- Search Form -->


      <div class="flex md:flex-row flex-col justify-between pt-12">
      <form-kit
          type="search"
          prefixIcon="search"
          v-model="SearchQuery"
          @input="updateQueryAndSearch"



          placeholder="Вводите..."
      >
      </form-kit>
      <div class="">
        <p class=" mt-8  md:mt-0 font-regular">Всего дверей: {{ MaterialColorProductVariantTotalHits }}</p>
      </div>
      </div>
      <!-- Results -->


<!--      <div ref="hitsBlock" class="text-primaryDark flex justify-center md:justify-between">-->
<!--<pre>{{ImageSearchResults}}</pre>-->
<!--      </div>-->

      <div class="mt-4 md:mt-16 gap-y-8 lg:grid-cols-4 mdLg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-7 grid"
           ref="parent">
<!--        <pre>{{MaterialColorProductVariantResponse.hits}}</pre>-->
<!--        <pre>{{MaterialColorProductVariantSearchResults}}</pre>-->
        <div v-for="hit in MaterialColorProductVariantSearchResults" :key="hit.objectID">
          <NuxtLink
              :to="`/catalog/${hit.product_variant.product}?material=${hit.color.material}&color=${hit.color.id}`">
            <search-door-card class="relative  transition-all duration-300 pb-6 mb-6"
                              :hit="hit"/>


          </NuxtLink>
        </div>
      </div>
<div class="flex justify-center">
      <base-pagination v-if="MaterialColorProductVariantTotalHits" class="pb-32" :total="MaterialColorProductVariantTotalHits"
                       :page_size="24"
                       @page-change="handleNewPage"
                       v-model:current-page="MaterialColorProductVariantCurrentPage"
      />
</div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import algoliasearch from 'algoliasearch/lite';
import SearchDoorCard from "~/pages/search/SearchDoorCard.vue";
import {adjustLayoutForNarrowImages, classifyImageLayout} from '~/services/imageLayoutService';

definePageMeta({layout: "dark-header"});


const selectedImages = ref([])
const config = useRuntimeConfig()

// Initialize Algolia client
const client = algoliasearch(config.public.ALGOLIA_APPLICATION_ID, config.public.ALGOLIA_SEARCH_API_KEY);
const MaterialColorProductVariantIndex = client.initIndex('MaterialColorProductVariant');
const ImageIndex = client.initIndex('Image');

const ImageSearchResults = ref([]);
const ImageTotalHits = ref(0);

// State
const MaterialColorProductVariantResponse = ref(null);

const SearchQuery = ref('');
const MaterialColorProductVariantSearchResults = ref([]);
const MaterialColorProductVariantTotalHits = ref(0);  // New property to hold total hits
const MaterialColorProductVariantCurrentPage = ref(1);
const MaterialColorProductVariantNbPages = ref(0);

const hitsBlock = ref(null);
const scrollToHitsBlock = () => {
  if (hitsBlock.value) {
    hitsBlock.value.scrollIntoView({behavior: 'smooth'});
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
      hitsPerPage: 24,
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

const performSearchDebounced = useDebounce(performSearch, 100);  // 100ms delay


const updateQueryAndSearch = async (newQuery: string) => {
  SearchQuery.value = newQuery;
  await performSearchDebounced();
};
// Methods


// On Mounted, you could perform an initial search if needed
onMounted(() => {
  // performSearch();
});
const handleNewPage = (newPage) => {
  MaterialColorProductVariantCurrentPage.value = newPage;
  performSearchDebounced(newPage);
  scrollToHitsBlock();
};
</script>
