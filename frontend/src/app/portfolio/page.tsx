"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ExternalLink, X, Eye, Tag } from "lucide-react";

const API_URL = "https://nexavo-backend.vercel.app";

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const categories = [
    { id: "all", name: "All Projects", icon: "" },
    { id: "ERPNext", name: "ERPNext", icon: "" },
    { id: "Web Development", name: "Web Development", icon: "" },
    { id: "Desktop App", name: "Desktop Apps", icon: "" },
    { id: "UI/UX", name: "UI/UX Design", icon: "" },
    { id: "WordPress", name: "WordPress", icon: "" },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === selectedCategory),
      );
    }
  }, [selectedCategory, projects]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`);
      setProjects(response.data.projects || []);
      setFilteredProjects(response.data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
          <div
            className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          />
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
                ✨ Our Work
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="text-gradient-primary">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore some of our finest work that showcases our expertise and
              creativity
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "glass-morphism hover:bg-white/10"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400">
                No projects found in this category.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="glass-morphism rounded-2xl overflow-hidden card-hover">
                    <div className="relative overflow-hidden h-64">
                      {project.image_url && (
                        <img
                          src={`${API_URL}${project.image_url}`}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="px-6 py-3 rounded-full bg-white text-purple-600 font-semibold flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View Project
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-400">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full glass-morphism rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={`${API_URL}${selectedProject.image_url}`}
                alt={selectedProject.title}
                className="w-full h-96 object-cover"
              />

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400">
                    {selectedProject.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-300 mb-6">
                  {selectedProject.description}
                </p>
                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Project
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
