'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  Clock,
  MessageSquare,
  User,
  Briefcase
} from 'lucide-react';

const API_URL = 'https://nexavo-backend.vercel.app';

export default function Contact() {
  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    project_type: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${API_URL}/api/enquiries`, formData);
      setStatus({ 
        type: 'success', 
        message: 'Message sent successfully! We will contact you within 24 hours.' 
      });
      setFormData({ client_name: '', email: '', project_type: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'nexavoagency@gmail.com', href: 'mailto:nexavoagency@gmail.com', color: 'from-blue-500 to-cyan-500' },
    { icon: Phone, label: 'Phone/WhatsApp', value: '0325 3001794', href: 'https://wa.me/923253001794', color: 'from-green-500 to-emerald-500' },
    { icon: MapPin, label: 'Location', value: 'Pakistan', href: null, color: 'from-orange-500 to-red-500' },
    { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null, color: 'from-purple-500 to-pink-500' },
  ];

  const projectTypes = [
    'ERPNext Solutions',
    'Web Development',
    'Desktop Application',
    'UI/UX Design',
    'WordPress Development',
    'Social Media Management',
    'Other',
  ];

  return (
    <>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
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
                📬 Get in Touch
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Let's <span className="text-gradient-primary">Connect</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have a project in mind? We'd love to hear from you. Let's bring your ideas to life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass-morphism p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-lg font-semibold hover:text-purple-400 transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-morphism p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Office Hours</h2>
                <div className="space-y-2 text-gray-300">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="glass-morphism p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                <div className="flex gap-4">
                  {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map((social) => (
                    <button key={social} className="w-10 h-10 rounded-full glass-morphism hover:bg-purple-500/20 transition-colors flex items-center justify-center">
                      <span className="text-sm">{social[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-morphism p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-400" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="client_name"
                    required
                    value={formData.client_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    Project Type
                  </label>
                  <select
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-400" />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      status.type === 'success' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    {status.message}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-2xl overflow-hidden"
          >
            <div className="h-96 bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <p className="text-gray-400">Interactive Map Location</p>
                <p className="text-sm text-gray-500">Pakistan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}