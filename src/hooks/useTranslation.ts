import { translations } from '../utils/translations';

export const useTranslation = () => {
  return {
    t: (key: keyof typeof translations) => translations[key] || key
  };
};