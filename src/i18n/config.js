import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import tlTranslations from './locales/tl.json';
import zhTranslations from './locales/zh.json';

// Get saved language from localStorage or default to English
const getSavedLanguage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('language') || 'en';
    }
  } catch (e) {
    console.warn('Could not access localStorage:', e);
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      tl: {
        translation: tlTranslations
      },
      zh: {
        translation: zhTranslations
      }
    },
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false
    }
  });

// Listen for language changes and save to localStorage
i18n.on('languageChanged', (lng) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('language', lng);
    }
  } catch (e) {
    console.warn('Could not save language to localStorage:', e);
  }
});

export default i18n;

