import {checkIsOpen, getWorkingHours, generateAddressData} from "~/utils/helpers.js";

export async function initMap() {
    // Make sure the API is loaded
    if (typeof ymaps === 'undefined') {
        setTimeout(initMap, 5)
        return
    }

    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            center: [55.751574, 37.573856],
            zoom: 11
        }, {
            searchControlProvider: 'yandex#search'
        });

        let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #000000; font-weight: normal;">$[properties.iconContent]</div>'
        );

        let originalSize = [45, 30];
        let scaledSize = [originalSize[0] * 1.1, originalSize[1] * 1.1];
        let placemarks = addresses.value.addresses.map((address, index) => {
            let addressData = generateAddressData(address);
            let placemark = new ymaps.Placemark([address.latitude, address.longitude], {
                hintContent: addressData.address,
                balloonContent: `
  <div style="display: flex; align-items: start;">
    <img src="/logoB.webp" alt="logo" style="width: 40px; height: 40px; object-fit: contain; margin-right: 10px;"/>
    <div>
      <p style="font-family: 'abchanel-corpo', monospace; font-weight: bold; font-size: 15px; line-height: 21px;">${addressData.name}</p>
      <p style="font-family: 'Helvetica Neue', serif; font-weight: normal; font-size: 15px; line-height: 21px;">${addressData.address}</p>
      <div style="height: 20px;"></div>
      ${addressData.metro_station ? `<p style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 25px;">метро ${addressData.metro_station}</p>` : ''}
      <a href="tel:${addressData.phone}" style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 25px;">${addressData.phone}</a>
      <p style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 25px;">${addressData.workingHours.join('<br/>')}</p>
      <div style="height: 20px;"></div>
      <p style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 21px; color:${addressData.isOpenData.color};">${addressData.isOpenData.isOpen}</p>
      ${addressData.isOpenData.isOpen === 'Открыто' ? '' : `<p style="font-family: 'Helvetica Neue',serif; font-weight: normal; font-size: 15px; line-height: 21px;">Откроется ${new Date().getHours() >= 15 ? 'завтра' : 'сегодня'} в ${addressData.isOpenData.tomorrowOpeningTime}</p>`}
      <div style="height: 20px;"></div>
      <button id="routeBtn_${index}" style="font-family: 'abchanel-corpo', monospace; font-weight: normal; font-size: 15px; line-height: 21px; text-decoration: underline;">Маршрут</button>
    </div>
  </div>`,

                iconContent: address.name_for_map
            }, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: '/logoB.webp',
                iconImageSize: originalSize,
                iconImageOffset: [0, 0],
                iconContentOffset: [37, 16],
                iconContentLayout: MyIconContentLayout,

            });

            placemark.events.add('mouseenter', function (e) {
                e.get('target').options.set('iconImageSize', scaledSize);
            });

            placemark.events.add('mouseleave', function (e) {
                e.get('target').options.set('iconImageSize', originalSize);
            });
            placemark.id = index; // assign an id to each placemark for Vue's key
            myMap.geoObjects.add(placemark);

            placemark.events.add('balloonopen', function (e) {
                // Wait for the balloon to open fully to ensure the button element is present in the DOM
                setTimeout(() => {
                    let routeBtn = document.getElementById(`routeBtn_${index}`);
                    routeBtn.addEventListener('click', async function () {
                        if (!navigator.geolocation) {
                            console.log("Geolocation is not supported by this browser.");
                            return;
                        }
                        try {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                const lat = position.coords.latitude;
                                const lon = position.coords.longitude;

                                const destinationLat = address.latitude;
                                const destinationLon = address.longitude;

                                const url = `https://maps.yandex.ru/?rtext=${lat},${lon}~${destinationLat},${destinationLon}`;

                                window.open(url, '_blank');
                            });
                        } catch (error) {
                            console.log("Error obtaining geolocation: ", error);
                        }
                    });
                }, 100);
            });

            return placemark;
        });

        var clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedBlackClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
        });

        clusterer.add(placemarks);
        myMap.geoObjects.add(clusterer);


        function updateVisiblePlacemarks() {
            let mapBounds = myMap.getBounds();
            visiblePlacemarks.length = 0;
            visibleAddressData.length = 0;

            for (let placemark of placemarks) {
                let placemarkCoordinates = placemark.geometry.getCoordinates();
                if (placemarkCoordinates[0] > mapBounds[0][0] && placemarkCoordinates[0] < mapBounds[1][0] && placemarkCoordinates[1] > mapBounds[0][1] && placemarkCoordinates[1] < mapBounds[1][1]) {
                    visiblePlacemarks.push(placemark);
                    let address = addresses.value.addresses.find(a => a.latitude == placemarkCoordinates[0] && a.longitude == placemarkCoordinates[1]);
                    if (address) {
                        visibleAddressData.push({
                            id: placemark.id,
                            name: address.name,
                            address: address.address,
                            phone: address.phone,
                            metro_station: address.metro_station,
                            workingHours: getWorkingHours(address.working_days_working_hours_from, address.working_days_working_hours_to, address.saturday_working_hours_from, address.saturday_working_hours_to, address.sunday_working_hours_from, address.sunday_working_hours_to),
                            isOpenData: checkIsOpen(address.working_days_working_hours_from, address.working_days_working_hours_to, address.saturday_working_hours_from, address.saturday_working_hours_to, address.sunday_working_hours_from, address.sunday_working_hours_to),
                            latitude: address.latitude,
                            longitude: address.longitude,
                            sunday_working_hours_to: address.sunday_working_hours_to,
                            saturday_working_hours_to: address.saturday_working_hours_to,
                            working_days_working_hours_to: address.working_days_working_hours_to,
                            isMonoBrand: address.isMonoBrand,
                            city: address.city,

                        });
                    }
                }
            }
        }


        myMap.events.add('boundschange', updateVisiblePlacemarks);

        // Run once to initialize
        updateVisiblePlacemarks();
    });
}