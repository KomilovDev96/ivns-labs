import { useContent } from './ContentContext';

export function useSectionT(section: string, tFn: (key: string) => string, locale: string) {
  const { sections } = useContent();
  const apiSec = sections[section];

  return (key: string): string => {
    const val = apiSec?.[locale as 'ru' | 'uz' | 'en']?.[key]
      || apiSec?.ru?.[key];
    return val || tFn(key);
  };
}
