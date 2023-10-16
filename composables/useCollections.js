import { baseURL } from '~/config'

const collections = ref([])
const isFetching = ref(false)

export function useCollections() {
  async function fetchCollections(force = false) {
    if (isFetching.value || (!force && collections.value.length > 0))
      return

    isFetching.value = true
    const data = await $fetch(`${baseURL}/api/product/collections`)
    collections.value = data.results
    isFetching.value = false
  }

  fetchCollections()

  return {
    collections,
    fetchCollections,
    isFetching,
  }
}
