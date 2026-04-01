'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {FiCode, FiGlobe, FiUsers, FiMessageCircle, FiZap, FiBarChart2, FiCpu, FiSettings} from 'react-icons/fi';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {
      icon: FiSettings,
      key: 'integration1c',
    },
    {
      icon: FiGlobe,
      key: 'webDevelopment',
    },
    {
      icon: FiUsers,
      key: 'crmDevelopment',
    },
    {
      icon: FiMessageCircle,
      key: 'botDevelopment',
    },
    {
      icon: FiZap,
      key: 'automation',
    },
    {
      icon: FiBarChart2,
      key: 'biAnalytics',
    },
    {
      icon: FiCpu,
      key: 'aiAgents',
    },
    {
      icon: FiCode,
      key: 'bitrix',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.8, delay: index * 0.1}}
                whileHover={{scale: 1.05, y: -5}}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <IconComponent className="text-primary-600 mb-4" size={32} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
