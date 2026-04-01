import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routingConfig = defineRouting({
  locales: ['ru', 'uz', 'en'],
  defaultLocale: 'ru',
  localePrefix: 'always',
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routingConfig);
