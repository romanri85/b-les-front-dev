import { defineEventHandler, parseCookies, setCookie } from 'h3'
import { baseURL } from '~/config.js'

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event)

    if (!cookies.geolocation) {
      const response = await fetch(`${baseURL}/api/geolocation/`)
      // console.log(response, 'response')

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        // Perhaps, respond to the event with an error message here
        return
      }

      const geo = await response.text()
      const maxAge = 60 * 60 * 24 * 30

      setCookie(event, 'geolocation', geo, { maxAge })

      // Respond with some data (if needed)
      // return { geo }
    }
  }
  catch (error) {
    console.error('An error occurred:', error)
    // Handle the error as you see fit
  }
})
