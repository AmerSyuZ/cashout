/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author    Version         Remarks
------------------------------------------------------------------------------------------ 
20/03/2024           AmerSyu     1.0.0         - Base version
*/

//Lib
import  i18n  from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import dayjs from "dayjs";

//Local Import
import en from "./translations/en.json";
import ms from "./translations/ms.json";
import ta from "./translations/ta.json";
import zh from "./translations/zh.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: localStorage.getItem("lang") || "en",
    // ns: ["replacements", "translations"],
    // defaultNS: "translations",
    resources: {
      en: { translation: en },
      ms: { translation: ms },
      zh: { translation: zh },
      ta: { translation: ta },
    },
    keySeparator: ".",
    nsSeparator: false,
    interpolation: {
      format: function (value, format) {
        if (value instanceof Date) return dayjs(value).format(format);
        return value;
      },
    },
    debug: false,
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

export default i18n;
