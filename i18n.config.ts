import { defineI18nConfig } from "#i18n";
import ruCommon from "./i18n/ru/ruCommon";
import enCommon from "./i18n/en/enCommon";
import enToDesigners from "~/i18n/en/enToDesigners";
import ruToDesigners from "~/i18n/ru/ruToDesigners";
import enAboutUs from "~/i18n/en/enAboutUs";
import ruAboutUs from "~/i18n/ru/ruAboutUs";
import enToDealers from "~/i18n/en/enToDealers";
import ruToDealers from "~/i18n/ru/ruToDealers";
import enDeliveryInstallation from "~/i18n/en/enDeliveryInstallation";
import ruDeliveryInstallation from "~/i18n/ru/ruDeliveryInstallation";
import ruSystems from "~/i18n/ru/ruSystems";
import enSystems from "~/i18n/en/enSystems";
import enSale from "~/i18n/en/enSale";
import ruSale from "~/i18n/ru/ruSale";
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'ru',
    messages: {
        en: {...enCommon, ...enToDesigners, ...enAboutUs, ...enToDealers, ...enDeliveryInstallation, ...enSystems, ...enSale},
        ru: {...ruCommon, ...ruToDesigners, ...ruAboutUs, ...ruToDealers, ...ruDeliveryInstallation, ...ruSystems, ...ruSale}
    }
}));

