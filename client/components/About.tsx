'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {FiTarget, FiZap, FiAward, FiUsers} from 'react-icons/fi';

export default function About() {
  const t = useTranslations('about');

  const values = [
    {
      icon: FiZap,
      title: t('innovation'),
      text: t('innovationText'),
    },
    {
      icon: FiAward,
      title: t('quality'),
      text: t('qualityText'),
    },
    {
      icon: FiUsers,
      title: t('partnership'),
      text: t('partnershipText'),
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
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

        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8, delay: 0.2}}
          className="mb-16"
        >
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8, delay: 0.3}}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                IT Park
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {t('itpark')}
                </h3>
                <p className="text-gray-700 text-sm">
                  {t('itparkText')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8, delay: 0.5}}
          className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-start space-x-4">
            <FiTarget className="text-primary-600 flex-shrink-0 mt-1" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('mission')}
              </h3>
              <p className="text-lg text-gray-700">{t('missionText')}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.8, delay: 0.2 * index}}
                whileHover={{scale: 1.05, y: -5}}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <IconComponent className="text-primary-600 mb-4" size={40} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
