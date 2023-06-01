import {defineStore} from "pinia";
import {baseURL} from "~/config";
export const useCollectionsStore = defineStore("collectionsStore", {
    state: () => {
        return {
            collections: [],
        };
    },
    actions: {
        async fetchCollections() {
            this.collections = await $fetch(`${baseURL}/api/product/collections`);
        }
    }
});