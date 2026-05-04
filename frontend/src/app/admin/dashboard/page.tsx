'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = 'https://nexavo-backend.vercel.app';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url: string;
  live_url: string;
  created_at: string;
}

interface Enquiry {
  id: number;
  client_name: string;
  email: string;
  project_type: string;
  message: string;
  timestamp: string;
}

interface FormData {
  id: number | null;
  title: string;
  description: string;
  category: string;
  live_url: string;
  image: File | null;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    id: null,
    title: '',
    description: '',
    category: '',
    live_url: '',
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

  useEffect(() => {
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const [projectsRes, enquiriesRes] = await Promise.all([
        axios.get(`${API_URL}/api/projects`),
        axios.get(`${API_URL}/api/enquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setProjects(projectsRes.data.projects || []);
      setEnquiries(enquiriesRes.data.enquiries || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('category', formData.category);
    if (formData.live_url) submitData.append('live_url', formData.live_url);
    if (formData.image) submitData.append('image', formData.image);

    try {
      if (isEditing && formData.id) {
        await axios.put(`${API_URL}/api/projects/${formData.id}`, submitData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${API_URL}/api/projects`, submitData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        });
      }
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      id: project.id,
      title: project.title,
      description: project.description,
      category: project.category,
      live_url: project.live_url || '',
      image: null,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const resetForm = () => {
    setFormData({ id: null, title: '', description: '', category: '', live_url: '', image: null });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Admin <span className="gradient-text">Dashboard</span>
        </h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-600/30"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 ${activeTab === 'projects' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
        >
          Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2 ${activeTab === 'enquiries' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
        >
          Enquiries ({enquiries.length})
        </button>
      </div>

      {activeTab === 'projects' && (
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            {showForm ? 'Cancel' : '+ Add New Project'}
          </button>

          {showForm && (
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">Select Category</option>
                    <option value="ERPNext">ERPNext</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Desktop App">Desktop App</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="WordPress">WordPress</option>
                    <option value="Canva">Canva</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Live URL (optional)</label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project Image *</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required={!isEditing}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                  {isEditing && <p className="text-xs text-gray-400 mt-1">Leave empty to keep current image</p>}
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg">
                    {isEditing ? 'Update' : 'Create'} Project
                  </button>
                  <button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-8 text-center text-gray-400">
                No projects yet. Click "Add New Project" to get started.
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {project.image_url && (
                      <img 
                        src={`${API_URL}${project.image_url}`} 
                        alt={project.title} 
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-blue-400">{project.category}</p>
                      <p className="text-sm text-gray-400">{project.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(project)} className="text-blue-400 hover:text-blue-300 px-3 py-1">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300 px-3 py-1">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          {enquiries.length === 0 ? (
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-8 text-center text-gray-400">
              No enquiries yet.
            </div>
          ) : (
            enquiries.map((enquiry) => (
              <div key={enquiry.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{enquiry.client_name}</h3>
                    <p className="text-sm text-blue-400">{enquiry.email}</p>
                    {enquiry.project_type && (
                      <p className="text-sm text-gray-400 mt-1">Project: {enquiry.project_type}</p>
                    )}
                    <p className="text-gray-300 mt-2">{enquiry.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(enquiry.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}