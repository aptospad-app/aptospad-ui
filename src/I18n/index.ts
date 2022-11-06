/* eslint-disable */
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./Locales/En/Translation.json";
import vi from "./Locales/Vi/Translation.json";

const defaultLanguage = "en";

i18n
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources: {
      en: {              // "translation" is a namespace, you can add multiple namespace and specify another translate
        translation: en  // file for that namespace and then switch namespace to get defferent translate content.
      },                 // For example, you have more one namespace called "common: common_en", "common_en" is a
      vi: {              // .json translate file like as "en". In "en" file, you declare a key/value "home": "home"
        translation: vi  // and in "common_en" file, you declare a key/value "home": "my home". So when you switch the namespace,
      }                  // "home" or "my home" will be show. So this library not only supports changing languages, but also supports changing different translation styles.
    },                   
    lng: defaultLanguage, // Do not set this config if you're using "languageDetector".
    fallbackLng: defaultLanguage, // Use "en" language if detected lng is not available.
    debug: false, // This config will show language informations in console tab of Browser when web start running
    interpolation: {
      escapeValue: false // React already safes from xss so it's not needed for react as it escapes by default
    }
  });

export default i18n;
