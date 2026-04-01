'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {FiSmartphone, FiTrendingUp} from 'react-icons/fi';

export default function Products() {
  const t = useTranslations('products');

  const products = [
    {
      icon: FiSmartphone,
      key: 'aivanExpert',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    },
    {
      icon: FiTrendingUp,
      key: 'rost',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    },
  ];

  return (
    <section id="products" className="py-20 bg-white">
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

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <motion.div
                key={product.key}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.8, delay: index * 0.2}}
                whileHover={{y: -10}}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={t(`${product.key}.title`)}
                    className="w-full h-full object-cover"
                    whileHover={{scale: 1.1}}
                    transition={{duration: 0.3}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className="text-primary-600" size={28} />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t(`${product.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`${product.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
