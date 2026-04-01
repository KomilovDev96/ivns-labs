'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {useState} from 'react';
import {FiSend, FiMail, FiPhone, FiMapPin} from 'react-icons/fi';

export default function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({name: '', email: '', phone: '', message: ''});
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-primary-50 to-white">
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

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{opacity: 0, x: -30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('contactInfo')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <FiMail className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">{t('emailLabel')}</p>
                    <p className="text-gray-600">{t('emailValue')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FiPhone className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">{t('phoneLabel')}</p>
                    <p className="text-gray-600">{t('phoneValue')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FiMapPin className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">{t('addressLabel')}</p>
                    <p className="text-gray-600">{t('addressValue')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{opacity: 0, x: 30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{opacity: 0, y: -10}}
                  animate={{opacity: 1, y: 0}}
                  className="p-4 bg-green-100 text-green-700 rounded-lg"
                >
                  {t('success')}
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{opacity: 0, y: -10}}
                  animate={{opacity: 1, y: 0}}
                  className="p-4 bg-red-100 text-red-700 rounded-lg"
                >
                  {t('error')}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <FiSend size={20} />
                <span>{status === 'sending' ? t('sending') : t('send')}</span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
