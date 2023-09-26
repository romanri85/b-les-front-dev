import {defineStore} from "pinia";
import {baseURL} from "~/config";

// const config = useRuntimeConfig()
export const useSaleStore = defineStore("saleStore", () => {


    const sales = ref([])


    async function getSales() {
        // let response = await $fetch(`${baseURL}/api/projects?page=${page}`)
        sales.value = await $fetch(`${baseURL}/api/product/sales`);
    }

    // Build the URL, including the tags query and page number


    return {
        sales,
        getSales



    }
})