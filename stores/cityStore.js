import { defineStore } from 'pinia'
export const useCityStore = defineStore('cityStore', () => {
    const city = ref({})
    const geo = ref({
        country: 'Russia',
        region: 'Moscow',
        city: 'Moscow',
    })
    const defaultCity =  {
        "id": 1,
        "name": "Москва",
        "longitude": "37.617664000000000",
        "latitude": "55.752121000000000",
        "zoom_level": 10,
        "timezone": "Europe/Moscow",
        "ip_check_names": [
            "Moscow",
            "Moscow Oblast"
        ],
        "dative_case_name": "Москве"
    }

})
