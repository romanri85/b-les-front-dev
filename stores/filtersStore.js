import {defineStore} from "pinia";
import {baseURL} from "~/config";
export const useFiltersStore = defineStore("filtersStore", ()=>{

    const activeFilters = ref({
        min_price: 0,
        max_price: 6000,
        design: [],
        color_set: [],
        color: [],
        collection: [],
        material: [],
        glass: "",
        ordering: ""
        // colorSet: [], colors: [], designs: [], collections: []
    })

    const route = useRoute()
    let products = ref([])
    let page = ref(1)
    const total = ref(0)
    let pagesCount = ref(0)
    const page_size = 12
    const filterCount = ref({})

    async function onChangeFilters(filters) {
        if (!Object.keys(filters).includes("page")) {
            filters = {...filters, page: 1}
        }
        activeFilters.value = {...activeFilters.value, ...filters }
        const query = "&" + new URLSearchParams(activeFilters.value).toString();

        await checkFilters(query) // Make sure this function finishes before fetchProducts
        console.log(query, 'query changeFilters')
        fetchProducts(query)
    }
    async function fetchProducts(query = "") {
        const response = await $fetch(`${baseURL}/api/product/product-variants?page_size=${page_size + query}`);
        total.value = response.count
        pagesCount.value = response.page_links.length
        products.value = response.results
        // window.scrollTo(0, 0);
    }
    async function checkFilters(query = "",) {
        const response = await $fetch(`${baseURL}/api/product/filters?${query}}`);

        filterCount.value = response.counts
        // window.scrollTo(0, 0);
        console.log(filterCount.value, ' checkFilters filterCount.value)')

    }

    async function onResetFilters() {
        activeFilters.value = {
            min_price: 0,
            max_price: 6000,
            design: [],
            color_set: [],
            color: [],
            collection: [],
            material: [],
            glass: '',
            ordering: ''
        }
        const query = "&" + new URLSearchParams(activeFilters.value).toString();
        fetchProducts(query)
    }

return{fetchProducts}
});