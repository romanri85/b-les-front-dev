import {defineEventHandler, parseCookies} from 'h3'
import {baseURL} from '~/config.js'
import {useStorage} from '@vueuse/core';

const storageCityStore = useStorage('storage-city-store', {"country":"Russia","city":"Moscow","region":"Moscow"});


export default defineEventHandler(async (event) => {
    try {

        if (!storageCityStore.value.city || !storageCityStore.value.geo) {
            const response = await fetch(`${baseURL}/api/geolocation/`)
            // console.log(response, 'response')

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                // Perhaps, respond to the event with an error message here
                return
            }

            const geo = await response.text()

            // storageCityStore.value.city = geo.city || 'Moscow'
            storageCityStore.value.geo = JSON.parse(geo) || {"country":"Russia","city":"Moscow","region":"Moscow"}
            // storageCityStore.value.country = geo.country || 'Russia'

            // const maxAge = 60 * 60 * 24 * 30

            // setCookie(event, 'geolocation', geo, { maxAge })

            // Respond with some data (if needed)
            // return { geo }
            console.log(storageCityStore.value, 'storageCityStore.value')
        }
    } catch (error) {
        console.error('An error occurred:', error)
        // Handle the error as you see fit
    }
})
