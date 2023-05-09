import {baseURL} from "~/config";

const collections = ref([]);
const isFetching = ref(false);


export function useCollections() {
    async function fetchCollections(force = false) {
        if (isFetching.value || (!force && collections.value.length > 0)) {
            console.log('Collections already fetched')
            return
        }
        isFetching.value = true
        console.log(isFetching.value, 'isFetching')
        const data = await $fetch(`${baseURL}/api/product/collections`)
        collections.value = data.results
        isFetching.value = false
    }

    fetchCollections()

    return {
        collections, fetchCollections, isFetching
    }

}