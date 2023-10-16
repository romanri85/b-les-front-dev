export async function getRoute(address) {
  if (!address || !address.latitude || !address.longitude) {
    throw new Error('No address provided')
    return
  }

  const destinationLat = address.latitude
  const destinationLon = address.longitude

  // Function to construct and open the Yandex Maps URL
  const openYandexMaps = (startLat, startLon, destLat, destLon) => {
    // Construct Yandex Maps URL
    const url = `https://maps.yandex.ru/?rtext=${startLat},${startLon}~${destLat},${destLon}&rtt=auto&ruri=~`

    // Open Yandex Maps in a new tab
    window.open(url, '_blank')
  }

  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser')

    // Construct Yandex Maps URL with only the destination for routing
    openYandexMaps('~', '~', destinationLat, destinationLon)

    return
  }

  try {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        // Construct Yandex Maps URL with user's current location and destination
        openYandexMaps(lat, lon, destinationLat, destinationLon)
      },
      (error) => {
        throw new Error(error)

        // Construct Yandex Maps URL with only the destination for routing
        openYandexMaps('~', '~', destinationLat, destinationLon)
      },
    )
  }
  catch (error) {
    throw new Error(error)
  }
}
