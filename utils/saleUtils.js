export const pluralizeDays = (n) => {
    const forms = ['день', 'дня', 'дней'];
    let idx;
    if (n % 10 === 1 && n % 100 !== 11) {
        idx = 0;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        idx = 1;
    } else {
        idx = 2;
    }
    return forms[idx];
};

export const pluralizeHours = (n) => {
    const forms = ['час', 'часа', 'часов'];
    let idx;
    if (n % 10 === 1 && n % 100 !== 11) {
        idx = 0;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        idx = 1;
    } else {
        idx = 2;
    }
    return forms[idx];
};

export const pluralizeMinutes = (n) => {
    const forms = ['минута', 'минуты', 'минут'];
    let idx;
    if (n % 10 === 1 && n % 100 !== 11) {
        idx = 0;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        idx = 1;
    } else {
        idx = 2;
    }
    return forms[idx];
};

export const pluralizeSeconds = (n) => {
    const forms = ['секунда', 'секунды', 'секунд'];
    let idx;
    if (n % 10 === 1 && n % 100 !== 11) {
        idx = 0;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        idx = 1;
    } else {
        idx = 2;
    }
    return forms[idx];
};