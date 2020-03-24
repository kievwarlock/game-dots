import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const fallbackLng = ["en"];
const availableLanguages = ["en", "de"];

i18n
    .use(Backend) // load translation using xhr -> see /public/locales.
    .use(LanguageDetector) // detect user language
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
        fallbackLng,
        debug: true,
        whitelist: availableLanguages,

        interpolation: {
            escapeValue: false
        },
    });

export default i18n;