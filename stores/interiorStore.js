import {defineStore} from "pinia";
import {baseURL} from "~/config";

export const useInteriorStore = defineStore("interiorStore", () => {


    const projects = ref([])
    const total = ref(0)
    let pagesCount = ref(0)
    const page_size = 6
    const page = ref(1)
    const tags = ref([])
    const tagsForForm = ref([])
    const selectedImages = ref([])


    async function getProjects(page = 1) {
        // let response = await $fetch(`${baseURL}/api/projects?page=${page}`)
        const data = await $fetch(`${baseURL}/api/projects?page=${page}`);
        if (data) {
            // response = data.value
            projects.value = data.results
            total.value = data.count
            pagesCount.value = data.page_links.length
        }
        else {
            console.log('no data')
        }



    }

    async function getTags() {
        // tags.value = await $fetch(`${baseURL}/api/projects/tags`);
        const {data} = await useFetch(`${baseURL}/api/projects/tags`, {key:'id',cache: true});
        if (data.value) {
            tags.value = data.value
        }
        else {
            console.log('no data')
        }
    }

    async function transformTags() {
        if (tags.value.length > 0) {
            tagsForForm.value = tags.value.map(tag => {
                return {
                    label: tag.name,
                    value: tag.id
                };
            });
        }
    }

    async function getImagesByTags(tagIds, page = 1) {
        // Join the tagIds into a query string

        const tagsQueryString = new URLSearchParams({
            tags: tagIds.join(",")
        }).toString();
        const url = `${baseURL}/api/projects/images?${tagsQueryString}&page=${page}`;


        selectedImages.value = await $fetch(url)
        const {data} = await useFetch(url, {key:'results',cache: true});
        if (data.value) {
            selectedImages.value = data.value
        }
        else {
            console.log('no data')
        }
        total.value = selectedImages.value.count
        pagesCount.value = selectedImages.value.page_links.length

    }

    // Build the URL, including the tags query and page number


    return {
        projects,
        getProjects,
        total,
        pagesCount,
        page_size,
        page,

        getTags,
        tags,
        tagsForForm,
        transformTags,
        getImagesByTags,
        selectedImages,


    }
})