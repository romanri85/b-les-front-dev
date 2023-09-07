import {defineStore} from "pinia";
// import {baseURL} from "~/config";

const config = useRuntimeConfig()

export const useCollectionsStore = defineStore("collectionsStore", {
    state: () => {
        return {
            collections: [],
        };
    },
    actions: {

        async fetchCollections() {
            const {data} = await useFetch(`${config.public.baseURL}/api/product/collections`, {key: 'results', cache: true});
            if (data.value) {
                this.collections = data.value
            } else {
                console.log('no data')
            }

        }
    }
});