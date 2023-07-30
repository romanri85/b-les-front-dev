export async function getRoute(address) {
    console.log("getRouteService.js: getRoute()");
    if (!address || !address.latitude || !address.longitude) {
        console.error("Invalid address provided");
        return;
    }

    const destinationLat = address.latitude;
    const destinationLon = address.longitude;

    // Function to construct and open the Yandex Maps URL
    const openYandexMaps = (startLat, startLon, destLat, destLon) => {
        // Construct Yandex Maps URL
        const url = `https://maps.yandex.ru/?rtext=${startLat},${startLon}~${destLat},${destLon}&rtt=auto&ruri=~`;

        // Open Yandex Maps in a new tab
        window.open(url, '_blank');
    };

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser.");

        // Construct Yandex Maps URL with only the destination for routing
        openYandexMaps('~', '~', destinationLat, destinationLon);

        return;
    }

    try {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Construct Yandex Maps URL with user's current location and destination
                openYandexMaps(lat, lon, destinationLat, destinationLon);
            },
            function (error) {
                console.log("Error obtaining geolocation: ", error);

                // Construct Yandex Maps URL with only the destination for routing
                openYandexMaps('~', '~', destinationLat, destinationLon);
            }
        );
    } catch (error) {
        console.log("Unhandled error: ", error);
    }
}
