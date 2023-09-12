<template>
  <div class="main-container">
    <client-only>
      <!-- Search Form -->
<!--      <div>-->
<!--        <input v-model="searchQuery" @input="performSearch" placeholder="Search...">-->
<!--      </div>-->
<form-kit
    type="search"
   v-model="searchQuery"
    @input="updateQueryAndSearch"
    placeholder="Search..."
  >
</form-kit>
      <!-- Results -->
<!--      <div>-->
<!--        <ul>-->
<!--          <li v-for="hit in searchResults" :key="hit.objectID">-->
<!--            {{ hit.product_variant.name }} &lt;!&ndash; Adjust to the fields you want to display &ndash;&gt;-->
<!--            {{ hit.color.name }} &lt;!&ndash; Adjust to the fields you want to display &ndash;&gt;-->
<!--            {{ hit.leaf_casing_price }} &lt;!&ndash; Adjust to the fields you want to display &ndash;&gt;-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
      <div class="text-primaryDark flex justify-center md:justify-between">
        <!--        <p>{{props.products}}</p>-->
        <div  class="hidden md:block">
          <p class=" mt-14  md:mt-0 font-regular" >Всего дверей: {{ totalHits }}</p>
        </div>
      </div>
      <div class="mt-4 md:mt-16 gap-y-8 lg:grid-cols-4 mdLg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-7 grid" ref="parent">

        <div v-for="hit in searchResults" :key="hit.objectID">
          <NuxtLink
              :to="`/catalog/${hit.product_variant.product}?material=${hit.color.material}&color=${hit.color.id}`">
            <search-door-card class="relative  transition-all duration-300 pb-6 mb-6"
                       :hit="hit"/>


          </NuxtLink>
        </div>
      </div>
<!--      <pre>{{totalHits}}</pre>-->
<!--      <pre>nbPages{{nbPages}}</pre>-->
<!--      <pre>{{currentPage}}</pre>-->
      <base-pagination v-if="totalHits"  class="pb-32" :total="totalHits"
                       :page_size="24"
                       @page-change="handleNewPage"
                       v-model:current-page="currentPage"
      />

    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import algoliasearch from 'algoliasearch/lite';
import { debounce } from 'lodash';
import SearchDoorCard from "~/pages/search/SearchDoorCard.vue";
const config = useRuntimeConfig()

// const ALGOLIA_APP_ID = useRuntimeConfig().ALGOLIA_APP_ID;
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
const performSearchDebounced = debounce(performSearch, 100);  // 100ms delay


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
};
</script>
