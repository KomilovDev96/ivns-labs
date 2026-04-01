'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';

export default function Clients() {
  const t = useTranslations('clients');

  const clients = [
    {name: 'TechCorp', logo: 'https://via.placeholder.com/150x80/0ea5e9/ffffff?text=TechCorp'},
    {name: 'InnovateHub', logo: 'https://via.placeholder.com/150x80/0284c7/ffffff?text=InnovateHub'},
    {name: 'DigitalFlow', logo: 'https://via.placeholder.com/150x80/0369a1/ffffff?text=DigitalFlow'},
    {name: 'CloudSync', logo: 'https://via.placeholder.com/150x80/075985/ffffff?text=CloudSync'},
    {name: 'DataVault', logo: 'https://via.placeholder.com/150x80/0c4a6e/ffffff?text=DataVault'},
    {name: 'SmartSys', logo: 'https://via.placeholder.com/150x80/0ea5e9/ffffff?text=SmartSys'},
  ];

  return (
    <section id="clients" className="py-20 bg-white">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{opacity: 0, scale: 0.8}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: index * 0.1}}
              whileHover={{scale: 1.1, y: -5}}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full h-auto grayscale hover:grayscale-0 transition-all"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
