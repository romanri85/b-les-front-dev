function openYandexMaps(startLat, startLon, destLat, destLon) {
  const url = `https://maps.yandex.ru/?rtext=${startLat},${startLon}~${destLat},${destLon}&rtt=auto&ruri=~`;
  window.open(url, '_blank');
}

function handleGeolocationError(error, destLat, destLon) {
  console.error(error.message);
  openYandexMaps('~', '~', destLat, destLon);
}

export function getRoute(address) {
  if (!address || !address.latitude || !address.longitude) {
    throw new Error('No address provided');
  }

  const destinationLat = address.latitude;
  const destinationLon = address.longitude;

  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by your browser');
    openYandexMaps('~', '~', destinationLat, destinationLon);
    return;
  }

  navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        openYandexMaps(lat, lon, destinationLat, destinationLon);
      },
      (error) => {
        handleGeolocationError(error, destinationLat, destinationLon);
      }
  );
}
