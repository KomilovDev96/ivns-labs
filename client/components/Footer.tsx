'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiGithub} from 'react-icons/fi';

export default function Footer() {
  const t = useTranslations('footer');

  const socialLinks = [
    {icon: FiFacebook, href: '#', label: 'Facebook'},
    {icon: FiTwitter, href: '#', label: 'Twitter'},
    {icon: FiLinkedin, href: '#', label: 'LinkedIn'},
    {icon: FiInstagram, href: '#', label: 'Instagram'},
    {icon: FiGithub, href: '#', label: 'GitHub'},
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              IVN Labs
            </h3>
            <p className="text-gray-400">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-primary-400 transition-colors">
                  {t('about')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-primary-400 transition-colors">
                  {t('services')}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary-400 transition-colors">
                  {t('products')}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary-400 transition-colors">
                  {t('projects')}
                </a>
              </li>
              <li>
                <a href="#clients" className="hover:text-primary-400 transition-colors">
                  {t('clients')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-400 transition-colors">
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('follow')}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{scale: 1.2, y: -2}}
                  whileTap={{scale: 0.9}}
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
                IT Park
              </div>
              <span className="text-gray-400 text-sm">
                {t('itpark')}
              </span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © {new Date().getFullYear()} IVN Labs. {t('rights')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
