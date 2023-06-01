import {defineStore} from "pinia";
export const useSliderCollectionStore = defineStore("SliderCollectionStore", {
    state: () => {
        return {
            collections: [],
        };
    },
    actions: {
        async fillSliderCollections() {
            this.collections = (await import("@/data/SliderCollections.json")).default;
        }
    }
});