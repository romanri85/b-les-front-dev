import {defineStore} from "pinia";
import {baseURL} from "~/config";
import Cookies from "js-cookie";
import {findCity} from "~/utils/helpers.js";

export const useCityStore = defineStore("cityStore", () => {




    const addresses = ref({});
    const geo = ref({});
    const city = ref(null);
    const isModalOpen =ref(false);





    function closeModal() {
        isModalOpen.value = false
    }

    function openModal() {
        isModalOpen.value = true
    }

    async function getAddresses() {
        try {
            addresses.value = await $fetch(`${baseURL}/api/shops/`)
            geo.value = Cookies.get('geolocation')
            geo.value = typeof geo.value === "object" ? geo.value : JSON.parse(geo.value)
            city.value = findCity(addresses.value.cities, geo.value.region);
        } catch (error) {
            console.error('Error fetching addresses or initializing map:', error);
        }
    }



    return {
        addresses,
        geo,
        city,
        isModalOpen,
        closeModal,
        openModal,
        getAddresses,
    }
});