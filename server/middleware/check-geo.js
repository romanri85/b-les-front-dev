import {defineEventHandler, parseCookies, setCookie} from 'h3'
import {baseURL} from "~/config.js";

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event)

    if(!cookies.geolocation) {
        const response = await fetch(`${baseURL}/api/geolocation/`)

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
        } else {
            const geo = await response.text();
            setCookie(event, 'geolocation', geo,
                {
                    maxAge: 60 * 60 * 24 * 30,
                })
        }
    }
})
