'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowRight, 
  Code2, 
  Database, 
  Monitor, 
  Palette, 
  Smartphone,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
  Globe
} from 'lucide-react';

export default function Home() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const services = [
    { icon: Database, name: 'ERPNext Solutions', description: 'Complete business automation and ERP solutions', color: 'from-blue-500 to-cyan-500' },
    { icon: Code2, name: 'Web Development', description: 'Modern full-stack web applications', color: 'from-purple-500 to-pink-500' },
    { icon: Monitor, name: 'Desktop Applications', description: 'Cross-platform desktop software', color: 'from-green-500 to-emerald-500' },
    { icon: Palette, name: 'UI/UX Design', description: 'Beautiful and intuitive designs', color: 'from-orange-500 to-red-500' },
    { icon: Smartphone, name: 'Mobile Development', description: 'Native and cross-platform apps', color: 'from-teal-500 to-cyan-500' },
    { icon: TrendingUp, name: 'Digital Marketing', description: 'Grow your online presence', color: 'from-rose-500 to-pink-500' },
  ];

  const stats = [
    { value: '50+', label: 'Projects Completed', icon: Award },
    { value: '30+', label: 'Happy Clients', icon: Users },
    { value: '99%', label: 'Success Rate', icon: Shield },
    { value: '24/7', label: 'Support', icon: Zap },
  ];

  return (
    <>
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-sm">
                Welcome to the Future
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              Transform Your
              <span className="block text-gradient-primary">Digital Future</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              We build exceptional digital experiences that help businesses grow and succeed in the modern world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={ref} className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What We{' '}
              <span className="text-gradient-primary">Offer</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 30 }
                }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl glass-morphism card-hover cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gradient-primary mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Let's bring your ideas to life with our innovative solutions
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-600 font-semibold hover:shadow-2xl transition-all duration-300 group"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}