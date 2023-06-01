import {defineStore} from "pinia";
import {baseURL} from "~/config";
export const useTagsStore = defineStore("tagsStore", {
    state: () => {
        return {
            tags: [],
        };
    },
    actions: {
        async fetchTags() {
            this.tags = await $fetch(`${baseURL}/api/projects/tags`);
        }
    }
});