'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {FiMenu, FiX} from 'react-icons/fi';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {usePathname, useRouter} from 'next/navigation';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {key: 'home', href: `/${locale}`},
    {key: 'about', href: `/${locale}#about`},
    {key: 'services', href: `/${locale}#services`},
    {key: 'products', href: `/${locale}#products`},
    {key: 'projects', href: `/${locale}#projects`},
    {key: 'clients', href: `/${locale}#clients`},
    {key: 'contact', href: `/${locale}#contact`},
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (pathname === path) {
        const element = document.getElementById(hash);
        element?.scrollIntoView({behavior: 'smooth'});
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <motion.nav
      initial={{y: -100}}
      animate={{y: 0}}
      transition={{duration: 0.5}}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="flex-shrink-0"
          >
            <a
              href={`/${locale}`}
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
            >
              IVN Labs
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {t(item.key)}
              </motion.a>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  whileHover={{x: 5}}
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {t(item.key)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
