'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Code2, 
  Monitor, 
  Palette, 
  Smartphone,
  TrendingUp,
  ArrowRight,
  Cloud,
  Shield,
  Zap,
  BarChart3,
  Users,
  PenTool
} from 'lucide-react';

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const services = [
    {
      icon: Database,
      name: 'ERPNext Solutions',
      description: 'Complete enterprise resource planning and business automation solutions tailored to your needs.',
      features: ['Custom Modules', 'Inventory Management', 'Accounting', 'HR & Payroll'],
      color: 'from-blue-500 to-cyan-500',
      price: 'Custom Pricing'
    },
    {
      icon: Code2,
      name: 'Web Development',
      description: 'Full-stack custom web applications built with modern technologies for optimal performance.',
      features: ['React/Next.js', 'Node.js/Python', 'E-commerce', 'CMS Integration'],
      color: 'from-purple-500 to-pink-500',
      price: 'Starting at 50k pkr' ,
    },
    {
      icon: Monitor,
      name: 'Desktop Applications',
      description: 'Robust cross-platform desktop software for Windows, Mac, and Linux.',
      features: ['Electron Apps', 'Python Desktop', 'Database Integration', 'Offline Support'],
      color: 'from-green-500 to-emerald-500',
      price: 'Custom Pricing'
    },
    {
      icon: Palette,
      name: 'UI/UX & Graphics',
      description: 'Beautiful, intuitive designs that enhance user experience and engagement.',
      features: ['Figma Prototyping', 'Responsive Design', 'Brand Identity', 'Designs'],
      color: 'from-orange-500 to-red-500',
      price: 'Starting at 15k pkr'
    },
    {
      icon: Smartphone,
      name: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['React Native', 'Flutter', 'iOS/Android', 'App Store Deployment'],
      color: 'from-teal-500 to-cyan-500',
      price: '180k pkr'
    },
    {
      icon: TrendingUp,
      name: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence.',
      features: ['SEO Optimization', 'Social Media', 'Content Strategy', 'Analytics'],
      color: 'from-rose-500 to-pink-500',
      price: 'Custom Pricing'
    },
  ];

  const process = [
    { step: '01', title: 'Discovery', description: 'We understand your goals and requirements', icon: Users },
    { step: '02', title: 'Planning', description: 'Strategic planning and architecture design', icon: BarChart3 },
    { step: '03', title: 'Development', description: 'Agile development with regular updates', icon: Code2 },
    { step: '04', title: 'Launch', description: 'Deployment and ongoing support', icon: Rocket },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm">
             What We Do
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="text-gradient-primary">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive IT solutions tailored to your business needs. We deliver excellence across every service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group glass-morphism rounded-2xl overflow-hidden card-hover"
              >
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-400">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <span className="text-sm text-purple-400 font-semibold">{service.price}</span>
                    <Link
                      href="/contact"
                      className="text-white/60 group-hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We <span className="text-gradient-primary">Work</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our streamlined process ensures timely delivery and exceptional quality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/3 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-y-1/2" />
                )}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-12 text-center animate-gradient"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss your project requirements and create something amazing together
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-600 font-semibold hover:shadow-2xl transition-all duration-300 group"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Missing Rocket icon component
function Rocket(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}