import { defineStore } from 'pinia'
import { baseURL } from '~/config'

export const useFiltersStore = defineStore('filtersStore', () => {
  const activeFilters = ref({
    ordering: '',
    // min_price: Number,
    // max_price: Number,
    design: [],
    color_set: [],
    color: [],
    collection: [],
    material: [],
    sale: '',
    glass: '',
    // colorSet: [], colors: [], designs: [], collections: []
  })

  const filterCount = ref({
    price: {},
    design: [],
    color_set: [],
    color: [],
    collection: [],
    material: [],
    sale: {},
    glass: {},
  })

  const products = ref([])
  const page = ref(1)
  const total = ref(0)
  const pagesCount = ref(0)
  const page_size = 24
  const color_sets = ref([])
  const materialColors = ref([])
  const isMobileFiltersOpen = ref(true)
  const isDoorSetApplied = ref(false)

  async function onChangeFilters(filters) {
    if (!filters.page) {
      activeFilters.value.page = 1
      page.value = 1
    }

    // if (!Object.keys(activeFilters.value).includes("page")) {
    //     activeFilters.value = {...activeFilters.value, page: 1}
    // }

    activeFilters.value = { ...activeFilters.value, ...filters }

    const query = new URLSearchParams(activeFilters.value).toString()
    // TODO: async or not async
    await checkFilters(query)

    await fetchProducts(query)

  }

  async function fetchProducts(query = '') {
    const data = await $fetch(`${baseURL}/api/product/product-variants?page_size=${`${page_size}&${query}`}`)
    // const {data} = useQuery({
    //     queryKey: ['product-variants',query],
    //     queryFn: () => $fetch(`${baseURL}/api/product/product-variants?page_size=${page_size + '&' + query}`),
    // })

    if (data) {
      total.value = data.count
      pagesCount.value = data.page_links.length
      products.value = data.results
    }
    else {
      throw new Error('No data')
    }
    // window.scrollTo(0, 0);
  }

  async function checkFilters(query = '') {
    const data = await $fetch(`${baseURL}/api/product/filters?${query}`)
    filterCount.value = data.counts
    // window.scrollTo(0, 0);
  }
  // TODO: change onResetFilters to function without backend request in filters
  async function onResetFilters() {
    isDoorSetApplied.value = false
    activeFilters.value = {
      min_price: 0.00,
      max_price: 99000.00,
      design: [],
      color_set: [],
      color: [],
      collection: [],
      material: [],
      glass: '',
      sale: '',
      ordering: '',
    }
    const query = `&${new URLSearchParams(activeFilters.value).toString()}`
   

    await checkFilters(query)
    await fetchProducts(query)
  }

  function checkDoorSetApplied() {
    if (isDoorSetApplied.value) {
      // await onResetFilters()
      activeFilters.value = {
        min_price: 0.00,
        max_price: 99000.00,
        design: [],
        color_set: [],
        color: [],
        collection: [],
        material: [],
        glass: '',
        sale: '',
        ordering: '',
      }
      filterCount.value = {
        price: {},
        design: [],
        color_set: [],
        color: [],
        collection: [],
        material: [],
        sale: {},
        glass: {},
      }
      isDoorSetApplied.value = false
    }
  }

  async function fetchColorSets() {
    color_sets.value = await $fetch(`${baseURL}/api/product/color-sets`)
  }

  async function fetchMaterialColors() {
    materialColors.value = await $fetch(`${baseURL}/api/product/material-choices`)
    materialColors.value = materialColors.value.reverse()
  }

  return {
    fetchProducts,
    onChangeFilters,
    onResetFilters,
    fetchColorSets,
    fetchMaterialColors,
    checkFilters,
    checkDoorSetApplied,
    activeFilters,
    filterCount,
    products,
    page,
    total,
    pagesCount,
    page_size,
    color_sets,
    materialColors,
    isMobileFiltersOpen,
    isDoorSetApplied,
  }
})
