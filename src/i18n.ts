import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import moment from 'moment'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    debug: true,
    react: {
      useSuspense: false
    },
    interpolation: {
      formatSeparator: ',',
      format: function(value, formatting, lng){
        if(value instanceof Date) return moment(value).format(formatting);
        return value.toString();
      }
    }
  });

export default i18n;