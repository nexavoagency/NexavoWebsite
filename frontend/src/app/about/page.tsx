'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Target, 
  Eye, 
  Heart, 
  Code2, 
  Layout, 
  Users, 
  PenTool,
  Award,
  TrendingUp,
  Briefcase,
  Sparkles
} from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

 const team = [
    { 
      name: 'Muhammad Hunain', 
      role: 'Senior ERPNext & Desktop App Developer',
      photo: '/images/team/hunain.jpg.png',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      skills: ['ERPNext', 'Python', 'Desktop Apps', 'PostgreSQL'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    { 
      name: 'Muhammad Ahzam', 
      role: 'Backend Developer & UI/UX Expert',
      photo: '/images/team/ahzam.jpg',
      icon: Layout,
      color: 'from-purple-500 to-pink-500',
      skills: ['Node.js', 'React', 'UI/UX', 'MongoDB'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    { 
      name: 'Muhammad Warzan', 
      role: 'Social Media Strategist & WordPress Developer',
      photo: '/images/team/warzan.jpg',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      skills: ['WordPress', 'SEO', 'Social Media', 'Content Strategy'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    { 
      name: 'Muhammad Huzaifa', 
      role: 'Creative Designer',
      photo: '/images/team/huzaifa.jpg',
      icon: PenTool,
      color: 'from-green-500 to-emerald-500',
      skills: ['Figma', 'Designs', 'Adobe Suite', 'Branding'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
  ];

  const values = [
    { icon: Target, title: 'Mission', description: 'To empower businesses with cutting-edge technology solutions that drive growth and innovation.', color: 'from-blue-500 to-cyan-500' },
    { icon: Eye, title: 'Vision', description: 'To become a global leader in IT solutions, recognized for excellence and digital transformation.', color: 'from-purple-500 to-pink-500' },
    { icon: Heart, title: 'Values', description: 'Innovation, integrity, collaboration, and client-centric approach in everything we do.', color: 'from-orange-500 to-red-500' },
  ];

  const achievements = [
    { value: '50+', label: 'Projects', icon: Briefcase },
    { value: '30+', label: 'Clients', icon: Users },
    { value: '4', label: 'Experts', icon: Sparkles },
    { value: '98%', label: 'Satisfaction', icon: Award },
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
                 About Us
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Meet the{" "}
              <span className="text-gradient-primary">Team</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're a team of passionate creators, developers, and innovators dedicated to building exceptional digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-gradient-primary">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Nexavo was founded by four passionate technologists who shared a common vision: 
                  to make enterprise-grade technology accessible to businesses of all sizes.
                </p>
                <p>
                  What started as a small collaboration has grown into a full-service IT solutions 
                  agency, helping businesses automate their operations and scale their digital presence.
                </p>
                <p>
                  Today, we're proud to serve clients across various industries, delivering 
                  innovative solutions that drive real business results.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {achievements.map((item, i) => (
                <div key={i} className="glass-morphism p-6 rounded-2xl text-center card-hover">
                  <item.icon className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gradient-primary">{item.value}</div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-morphism p-8 rounded-2xl text-center card-hover"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-gradient-primary">Experts</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A team of dedicated professionals committed to your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-morphism p-6 rounded-2xl text-center card-hover"
              >
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                  <member.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-purple-400 text-sm mb-3">{member.role}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-400">
                      {skill}
                    </span>
                  ))}
                </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Join Our Team?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our growing family
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-600 font-semibold hover:shadow-2xl transition-all duration-300 group">
                Contact Us To View Open Positions 
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}