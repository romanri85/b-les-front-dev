import {defineStore} from "pinia";
import {baseURL} from "~/config";

export const useFiltersStore = defineStore("filtersStore", () => {

    const activeFilters = ref({
        ordering: "",
        // min_price: Number,
        // max_price: Number,
        design: [],
        color_set: [],
        color: [],
        collection: [],
        material: [],
        glass: "",
        // colorSet: [], colors: [], designs: [], collections: []
    })

    const filterCount = ref({
        price: {},
        design: [],
        color_set: [],
        color: [],
        collection: [],
        material: [],
        glass: {},
    })

    const route = useRoute()
    let products = ref([])
    let page = ref(1)
    const total = ref(0)
    let pagesCount = ref(0)
    const page_size = 12
    const color_sets = ref([])
    const materialColors = ref([])

    async function onChangeFilters(filters) {
        if(!filters.page){
            activeFilters.value.page = 1
            page.value = 1
        }
        // if (!Object.keys(activeFilters.value).includes("page")) {
        //     activeFilters.value = {...activeFilters.value, page: 1}
        // }


        activeFilters.value = {...activeFilters.value, ...filters}


        let query = new URLSearchParams(activeFilters.value).toString();
        await fetchProducts(query)


        await checkFilters(query)
    }


    async function fetchProducts(query = "") {
        const {data} = await useFetch(`${baseURL}/api/product/product-variants?page_size=${page_size + '&' + query}`, {key:'results',cache: true});
        if (data.value) {
            total.value = data.value.count
            pagesCount.value = data.value.page_links.length
            products.value = data.value.results
        }
        else {
            console.log('no data')
        }
        // window.scrollTo(0, 0);
    }

    async function checkFilters(query = "") {
        const {data} = await useFetch(`${baseURL}/api/product/filters?${query}`, {key:'query',cache: true});
        if (data.value) {
            filterCount.value = data.value.counts
        }
        else {
            console.log('no data')
        }

        // window.scrollTo(0, 0);

    }

    async function onResetFilters() {
        activeFilters.value = {
            min_price: 0.00,
            max_price: 6000.00,
            design: [],
            color_set: [],
            color: [],
            collection: [],
            material: [],
            glass: '',
            ordering: ''
        }
        const query = "&" + new URLSearchParams(activeFilters.value).toString();
        await fetchProducts(query)
    }

    async function fetchColorSets() {
        const {data} = await useFetch(`${baseURL}/api/product/color-sets`,{key:'color-sets',cache: true})
        color_sets.value = data.value
    }

    async function fetchMaterialColors() {
        const {data} = await useFetch(`${baseURL}/api/product/material-choices`, {key:'material-choices',cache: true})
        materialColors.value = data.value
    }

    return {
        fetchProducts,
        onChangeFilters,
        onResetFilters,
        fetchColorSets,
        fetchMaterialColors,
        checkFilters,
        activeFilters,
        filterCount,
        products,
        page,
        total,
        pagesCount,
        page_size,
        color_sets,
        materialColors,
    }
});