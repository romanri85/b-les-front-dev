

export function getWorkingHours(workingDaysFrom, workingDaysTo, saturdayFrom, saturdayTo, sundayFrom, sundayTo) {
    let workingHours;

    if (
        workingDaysFrom === saturdayFrom &&
        workingDaysFrom === sundayFrom &&
        workingDaysTo === saturdayTo &&
        workingDaysTo === sundayTo
    ) {
        workingHours = [`Ежедневно ${formatTime(workingDaysFrom)} - ${formatTime(workingDaysTo)}`];
    } else if (workingDaysFrom === workingDaysTo && saturdayFrom === sundayFrom && saturdayTo === sundayTo) {
        workingHours = [`Будни ${formatTime(workingDaysFrom)} - ${formatTime(workingDaysTo)}`, `Выходные ${formatTime(saturdayFrom)} - ${formatTime(saturdayTo)}`];
    } else {
        workingHours = [
            `Будни ${formatTime(workingDaysFrom)} - ${formatTime(workingDaysTo)}`,
            `Суббота ${formatTime(saturdayFrom)} - ${formatTime(saturdayTo)}`,
            `Воскресение ${formatTime(sundayFrom)} - ${formatTime(sundayTo)}`
        ];
    }

    return workingHours;
}

export function checkIsOpen(workingDaysFrom, workingDaysTo, saturdayFrom, saturdayTo, sundayFrom, sundayTo) {
    const currentDay = new Date().getDay();
    const currentTime = new Date().toLocaleTimeString('it-IT').slice(0, -3);

    let isOpen, color, tomorrowOpeningTime;

    switch (currentDay) {
        case 0: // Sunday
            isOpen = currentTime > workingDaysFrom && currentTime < workingDaysTo;
            tomorrowOpeningTime = formatTime(workingDaysFrom);
            break;
        case 6: // Saturday
            isOpen = currentTime > saturdayFrom && currentTime < saturdayTo;
            tomorrowOpeningTime = formatTime(sundayFrom);
            break;
        default: // Weekdays
            isOpen = currentTime > workingDaysFrom && currentTime < workingDaysTo;
            tomorrowOpeningTime = currentDay === 5 ? formatTime(saturdayFrom) : formatTime(workingDaysFrom);
    }

    isOpen = isOpen ? "Открыто" : "Закрыто";
    color = isOpen === "Открыто" ? "#008000" : "#FF0000";

    return {isOpen, color, tomorrowOpeningTime};
}

export function formatTime(time) {
    return time.slice(0, -3);
}

export function generateAddressData(address) {
    return {
        id: address.id,
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
        doors_inside: address.doors_inside,
    };
}

export function findCity(cities, geoValueRegion) {
    // Default city object with name "Москва"
    let defaultCity = cities.find(city => city.name === "Москва");

    for(let city of cities) {
        if(city.ip_check_names.includes(geoValueRegion)) {
            return {
                isFound: true,
                city: city
            }
        }
    }

    // Return the default object if no city found
    return {
        isFound: false,
        city: defaultCity
    }
}

export function geoCookieFromStringToObject(escapedJSON) {
    let unescapedString = escapedJSON.replace(/\\\"/g, "\"").slice(1, -1);
    return JSON.parse(unescapedString);
}
