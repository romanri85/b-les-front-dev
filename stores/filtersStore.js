import {defineStore} from "pinia";
import {baseURL} from "~/config";

export const useFiltersStore = defineStore("filtersStore", () => {

    const activeFilters = ref({
        ordering: "",
        page: 1,
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


    const changedFilter = ref({})
    const route = useRoute()
    let products = ref([])
    let page = ref(1)
    const total = ref(0)
    let pagesCount = ref(0)
    const page_size = 12
    const color_sets = ref([])
    const materialColors = ref([])


    async function onChangeFilters(filters) {
        if (!Object.keys(activeFilters.value).includes("page")) {
            activeFilters.value = {...activeFilters.value, page: 1}
        }

        activeFilters.value = {...activeFilters.value, ...filters}

        // Remove any filters with empty or null values
        // Object.keys(activeFilters.value).forEach(key => {
        //     if (activeFilters.value[key] == null || activeFilters.value[key] === '' || activeFilters.value[key].length === 0) {
        //         delete activeFilters.value[key];
        //     }
        // });

        let query = new URLSearchParams(activeFilters.value).toString();

        await fetchProducts(query)

        // delete activeFilters.value.page
        // delete activeFilters.value.ordering
        // query = new URLSearchParams(activeFilters.value).toString()

        await checkFilters(query)
    }




    async function fetchProducts(query = "") {
        const response = await $fetch(`${baseURL}/api/product/product-variants?page_size=${page_size +'&'+ query}`);
        total.value = response.count
        pagesCount.value = response.page_links.length
        products.value = response.results
        // window.scrollTo(0, 0);
    }

    async function checkFilters(query = "") {
        const response = await $fetch(`${baseURL}/api/product/filters?${query}`);


        filterCount.value = response.counts
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
        color_sets.value = await $fetch(`${baseURL}/api/product/color-sets`)
    }

    async function fetchMaterialColors() {
        materialColors.value = await $fetch(`${baseURL}/api/product/material-choices`);
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