import {defineStore} from "pinia";
import {baseURL} from "~/config";

export const useInteriorStore = defineStore("interiorStore", () => {


    const projects = ref([])
    const total = ref(0)
    let pagesCount = ref(0)
    const page_size = 6
    const page = ref(1)



    async function getProjects(page=1) {
        let response = await $fetch(`${baseURL}/api/projects?page=${page}`)
        projects.value = response.results
        total.value = response.count
        pagesCount.value = response.page_links.length


    }


    return {
        projects,
        getProjects,
        total,
        pagesCount,
        page_size,
        page


    }
});