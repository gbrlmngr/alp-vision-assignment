import i18n from "i18next";
import ICU from "i18next-icu";
import httpBackendI18nPlugin from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(ICU)
  .use(httpBackendI18nPlugin)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: process.env.NODE_ENV !== "production",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
