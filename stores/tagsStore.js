// useTagsStore.js
import {ref} from 'vue';
import {baseURL} from '~/config';

export function useTagsStore() {
    const tags = ref([]);

    async function fetchTags() {
        try {
            const data = await $fetch(`${baseURL}/api/projects/tags`);
            if(data) {
                tags.value = data;
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    }

    return { tags, fetchTags };
}
