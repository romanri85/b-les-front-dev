import { defineStore } from 'pinia'
import { baseURL } from '~/config'
import {useQuery} from "@tanstack/vue-query";

// const config = useRuntimeConfig()

export const useHardwareFiltersStore = defineStore('hardwareFiltersStore', () => {
  const activeFilters = ref({
    ordering: '',
    page: 1,
    min_price: 0,
    max_price: 99000,
    design: [],
    color_collection: [],
    // colorSet: [], colors: [], designs: [], collections: []
  })

  const filterCount = ref({
    price: {},
    design: [],
    color_collection: [],
    min_price: 0,
    max_price: 99000,
  })

  const products = ref([])
  const page = ref(1)
  const total = ref(0)
  const pagesCount = ref(0)
  const page_size = 24
  const colorCollections = ref([])

  async function onChangeFilters(filters) {
    if (!filters.page) {
      activeFilters.value.page = 1
      page.value = 1
    }

    activeFilters.value = { ...activeFilters.value, ...filters }

    const query = new URLSearchParams(activeFilters.value).toString()
    await checkFilters(query)

    await fetchProducts(query)

  }

  async function fetchProducts(query = '') {
    const data = await $fetch(`${baseURL}/api/hardware/hardware-variants?${`${page_size}&${query}`}`)
    if (data) {
      total.value = data.count
      pagesCount.value = data.page_links.length
      products.value = data.results
    }
    else {
      throw new Error('No data')
    }
  }
  const query = new URLSearchParams(activeFilters.value).toString()
  const {data:productsData} = useQuery({
    queryKey: ['products', query],
    queryFn: async () => {
      const data = await $fetch(`${baseURL}/api/hardware/hardware-variants?${page_size}&${query}`)
      // if (data) {
      //   total.value = data.count
      //   pagesCount.value = data.page_links.length
      //   products.value = data.results
      // }
      // else {
      //   throw new Error('No data')
      // }
      return data
    },
  })
console.log(productsData, 'productsData')
  async function checkFilters(query = '') {
    const data = await $fetch(`${baseURL}/api/hardware/hardware-filters?${query}`)
    if (data)
      filterCount.value = data.counts

    else
      throw new Error('No data')

    // window.scrollTo(0, 0);
  }

  async function onResetFilters() {
    activeFilters.value = {
      ordering: '',
      page: 1,
      min_price: 0,
      max_price: 99000,
      design: [],
      color_collection: [],
      // colorSet: [], colors: [], designs: [], collections: []
    }
    const query = `&${new URLSearchParams(activeFilters.value).toString()}`
    await fetchProducts(query)
  }

  async function fetchColorCollections() {
    colorCollections.value = await $fetch(`${baseURL}/api/hardware/hardware-color-sets`)
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
})
