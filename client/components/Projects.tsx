'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {FiExternalLink} from 'react-icons/fi';

export default function Projects() {
  const t = useTranslations('projects');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with advanced features',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      tags: ['React Native', 'Firebase', 'TypeScript'],
    },
    {
      id: 3,
      title: 'AI Analytics Dashboard',
      description: 'Real-time analytics with AI insights',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      tags: ['Python', 'TensorFlow', 'React'],
    },
    {
      id: 4,
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud infrastructure solution',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      tags: ['AWS', 'Docker', 'Kubernetes'],
    },
    {
      id: 5,
      title: 'Healthcare Management System',
      description: 'Comprehensive healthcare management platform',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
      tags: ['Vue.js', 'PostgreSQL', 'Django'],
    },
    {
      id: 6,
      title: 'FinTech Solution',
      description: 'Advanced financial technology platform',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      tags: ['Next.js', 'Stripe', 'GraphQL'],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white to-primary-50">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8, delay: index * 0.1}}
              whileHover={{y: -10}}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{scale: 1.1}}
                  transition={{duration: 0.3}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.button
                  initial={{opacity: 0, scale: 0.8}}
                  whileHover={{opacity: 1, scale: 1}}
                  className="absolute bottom-4 right-4 bg-primary-600 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiExternalLink size={20} />
                </motion.button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.8, delay: 0.6}}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            {t('viewAll')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
