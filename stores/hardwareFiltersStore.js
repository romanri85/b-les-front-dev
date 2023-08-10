import {defineStore} from "pinia";
import {baseURL} from "~/config";

export const useHardwareFiltersStore = defineStore("hardwareFiltersStore", () => {

    const activeFilters = ref({
        ordering: "",
        page: 1,
        // min_price: Number,
        // max_price: Number,
        design: [],
        color_collection: [],
        // colorSet: [], colors: [], designs: [], collections: []
    })

    const filterCount = ref({
        price: {},
        design: [],
        color_collection: [],
    })


    const route = useRoute()
    let products = ref([])
    let page = ref(1)
    const total = ref(0)
    let pagesCount = ref(0)
    const page_size = 12
    const colorCollections = ref([])


    async function onChangeFilters(filters) {
        if(!filters.page){
            activeFilters.value.page = 1
            page.value = 1
        }

        activeFilters.value = {...activeFilters.value, ...filters}

        let query = new URLSearchParams(activeFilters.value).toString();
        await fetchProducts(query)


        await checkFilters(query)
    }


    async function fetchProducts(query = "") {
        const {data} = await useFetch(`${baseURL}/api/hardware/hardware-variants?${page_size + '&' + query}`, {key:query,cache: true});
        if (data.value) {
            total.value = data.value.count
            pagesCount.value = data.value.page_links.length
            products.value = data.value.results
        }
        else {
            console.log('no data')
        }

    }


    async function checkFilters(query = "") {
        const {data} = await useFetch(`${baseURL}/api/hardware/hardware-filters?${query}`, {key:'counts',cache: true});
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

    async function fetchColorCollections() {
        const {data} = await useFetch(`${baseURL}/api/hardware/hardware-color-sets`, {key:'id',cache: true});
        if (data.value) {
            colorCollections.value = data.value
        }
        else {
            console.log('no data')
        }
    }



    return {
        fetchProducts,
        onChangeFilters,
        onResetFilters,
        fetchColorCollections,
        checkFilters,
        activeFilters,
        filterCount,
        products,
        page,
        total,
        pagesCount,
        page_size,
        colorCollections,
    }
});