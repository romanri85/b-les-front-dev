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
          v-model="searchQuery"
          @input="updateQueryAndSearch"



          placeholder="Вводите..."
      >
      </form-kit>
      <div class="">
        <p class=" mt-8  md:mt-0 font-regular">Всего дверей: {{ totalHits }}</p>
      </div>
      </div>
      <!-- Results -->


      <div class="text-primaryDark flex justify-center md:justify-between">

      </div>
      <div class="mt-4 md:mt-16 gap-y-8 lg:grid-cols-4 mdLg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-7 grid"
           ref="parent">

        <div v-for="hit in searchResults" :key="hit.objectID">
          <NuxtLink
              :to="`/catalog/${hit.product_variant.product}?material=${hit.color.material}&color=${hit.color.id}`">
            <search-door-card class="relative  transition-all duration-300 pb-6 mb-6"
                              :hit="hit"/>


          </NuxtLink>
        </div>
      </div>
<div class="flex justify-center">
      <base-pagination v-if="totalHits" class="pb-32" :total="totalHits"
                       :page_size="24"
                       @page-change="handleNewPage"
                       v-model:current-page="currentPage"
      />
</div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import algoliasearch from 'algoliasearch/lite';
import SearchDoorCard from "~/pages/search/SearchDoorCard.vue";

definePageMeta({layout: "dark-header"});

const config = useRuntimeConfig()

// Initialize Algolia client
const client = algoliasearch(config.public.ALGOLIA_APPLICATION_ID, config.public.ALGOLIA_SEARCH_API_KEY);
const index = client.initIndex('MaterialColorProductVariant');

// State

const searchQuery = ref('');
const searchResults = ref([]);
const totalHits = ref(0);  // New property to hold total hits
const currentPage = ref(1);
const nbPages = ref(0);

const performSearch = async (page = 0) => {
  if (searchQuery.value) {
    const response = await index.search(searchQuery.value, {
      hitsPerPage: 24,
      page: currentPage.value - 1,
    });
    searchResults.value = response.hits;
    nbPages.value = response.nbPages;
    totalHits.value = response.nbHits;  // Updating total hits
  } else {
    searchResults.value = [];
    totalHits.value = 0;  // Resetting total hits to 0
  }
};
const performSearchDebounced = useDebounce(performSearch, 100);  // 100ms delay


const updateQueryAndSearch = async (newQuery: string) => {
  searchQuery.value = newQuery;
  await performSearchDebounced();
};
// Methods


// On Mounted, you could perform an initial search if needed
onMounted(() => {
  // performSearch();
});
const handleNewPage = (newPage) => {
  currentPage.value = newPage;
  performSearchDebounced(newPage);
  window.scrollTo(0, 0);
};
</script>
