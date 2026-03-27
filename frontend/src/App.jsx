import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Trash2, RefreshCw, Globe2, ArrowLeft } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [targets, setTargets] = useState([]);
  const [formData, setFormData] = useState({ websiteName: '', url: '' });

  const fetchStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/targets/status`);
      setTargets(response.data);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/targets/add`, formData);
      setFormData({ websiteName: '', url: '' });
      fetchStatus();
    } catch (error) {
      alert("Error adding target.");
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete all monitored services?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/targets/clear-all`);
        fetchStatus();
      } catch (error) {
        alert("Error clearing database.");
      }
    }
  };

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'Lexend, sans-serif', backgroundColor: '#0a0f1a', minHeight: '100vh', color: '#ffffff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Navigation Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <a href="https://simarpreet.in" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: '700', color: '#fff', letterSpacing: '1px' }}>
            SIMAR-<span style={{ color: '#3b82f6' }}>OPS</span>
          </a>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleClearAll} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: 'transparent', cursor: 'pointer', color: '#ef4444' }}>
              <Trash2 size={20} />
            </button>
            <button onClick={fetchStatus} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: 'transparent', cursor: 'pointer', color: '#3b82f6' }}>
              <RefreshCw size={20} />
            </button>
          </div>
        </header>

        {/* Back Link */}
        <a href="https://simarpreet.in" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'none', marginBottom: '30px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Portfolio
        </a>

        {/* Hero Section */}
        <section style={{ marginBottom: '40px' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '2.5rem', margin: '0 0 10px 0' }}>
            <Activity size={32} color="#3b82f6" strokeWidth={2.5} /> Infrastructure Monitor
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Real-time health tracking for your distributed services.</p>
        </section>

        {/* Input Form - Pill Design */}
        <section style={{ background: '#161e2d', padding: '24px', borderRadius: '16px', border: '1px solid #2d3748', marginBottom: '40px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Service Name" 
                value={formData.websiteName} 
                onChange={(e) => setFormData({...formData, websiteName: e.target.value})}
                style={{ flex: 1, padding: '12px 20px', borderRadius: '30px', border: '1px solid #2d3748', backgroundColor: '#0a0f1a', color: '#fff', outline: 'none' }}
              />
              <input 
                type="url" 
                placeholder="https://..." 
                value={formData.url} 
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                style={{ flex: 1, padding: '12px 20px', borderRadius: '30px', border: '1px solid #2d3748', backgroundColor: '#0a0f1a', color: '#fff', outline: 'none' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#3b82f6', color: 'white', padding: '12px', borderRadius: '30px', border: 'none', fontWeight: '600', cursor: 'pointer', transition: '0.3s' }}>
              Start Monitoring
            </button>
          </form>
        </section>

        {/* Grid Display */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {targets.map((site) => (
            <div key={site._id} style={{ background: '#161e2d', padding: '20px', borderRadius: '12px', border: '1px solid #2d3748', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Globe2 size={24} color="#3b82f6" />
                <div>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>{site.websiteName}</h3>
                  <code style={{ color: '#94a3b8', fontSize: '12px' }}>{site.url}</code>
                </div>
              </div>
              <div style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', backgroundColor: site.status === 'Up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: site.status === 'Up' ? '#22c55e' : '#ef4444', border: `1px solid ${site.status === 'Up' ? '#22c55e' : '#ef4444'}` }}>
                {site.status.toUpperCase()}
              </div>
            </div>
          ))}
          {targets.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px', border: '2px dashed #2d3748', borderRadius: '16px' }}>No services monitored. Use the form to start fresh!</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
