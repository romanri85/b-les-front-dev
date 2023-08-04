import { defineEventHandler, parseCookies, setCookie } from 'h3'
import { baseURL } from "~/config.js";

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event)
    console.log(cookies, 'cookies exist')

    if(!cookies.geolocation) {
        console.log('cookies not exist')
        const response = await fetch(`${baseURL}/api/geolocation/`)

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
        } else {
            const geo = await response.text();
            setCookie(event, 'geolocation', geo,
                {
                    maxAge: 60 * 60 * 24 * 30,
                })

            // send a response with the cookie
            event.respondWith(new Response('OK', {
                headers: {
                    'Set-Cookie': `geolocation=${geo}; Max-Age=${60 * 60 * 24 * 30};`
                }
            }));
        }
    }
})
