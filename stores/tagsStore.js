import {defineStore} from "pinia";
// import {baseURL} from "~/config";

const config = useRuntimeConfig()
export const useTagsStore = defineStore("tagsStore", {
    state: () => {
        return {
            tags: [],
        };
    },
    actions: {
        async fetchTags() {
            this.tags = await $fetch(`${config.public.baseURL}/api/projects/tags`);
        }
    }
});