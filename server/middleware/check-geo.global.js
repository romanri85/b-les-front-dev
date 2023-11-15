import {defineEventHandler} from 'h3'
import {baseURL} from '~/config.js'
import {useStorage} from '@vueuse/core';

const storageCityStore = useStorage('storage-city-store', {"country": "Russia", "city": "Moscow", "region": "Moscow"});


export default defineEventHandler(async (event) => {
    if (process.client) { // Ensure this runs only on client side
        try {
            if (!storageCityStore.value.city || !storageCityStore.value.geo) {
                const response = await fetch(`${baseURL}/api/geolocation/`);

                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                    return;
                }

                const geo = await response.text();
                console.log(geo, 'geo');
                storageCityStore.value = JSON.parse(geo) || {"country": "Russia", "city": "Moscow", "region": "Moscow"};
                console.log(storageCityStore.value, 'storageCityStore.value');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
});
