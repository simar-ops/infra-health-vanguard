import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Trash2, RefreshCw, Globe2, ArrowLeft, Plus } from 'lucide-react';

// Externalized Configuration
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
    if (!formData.websiteName || !formData.url) return alert("Please fill all fields");
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
    <div style={{ 
      padding: '20px 20px 60px', 
      fontFamily: "'Lexend', sans-serif", 
      backgroundColor: '#0a0f1a', 
      minHeight: '100vh', 
      color: '#ffffff' 
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* TOP NAVIGATION BAR */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '20px 0',
          borderBottom: '1px solid #1e293b',
          marginBottom: '40px'
        }}>
          <div>
            <a href="https://simarpreet.in" style={{ textDecoration: 'none' }}>
              <h2 style={{ color: '#fff', margin: 0, letterSpacing: '1px', fontSize: '1.4rem' }}>
                SIMAR-<span style={{ color: '#3b82f6' }}>OPS</span>
              </h2>
            </a>
            <a href="https://simarpreet.in" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: '#94a3b8', 
              textDecoration: 'none', 
              fontSize: '0.85rem',
              marginTop: '4px'
            }}>
              <ArrowLeft size={14} /> Back to Portfolio
            </a>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button title="Clear All" onClick={handleClearAll} style={{ padding: '10px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#161e2d', cursor: 'pointer', color: '#ef4444' }}>
              <Trash2 size={18} />
            </button>
            <button title="Refresh Status" onClick={fetchStatus} style={{ padding: '10px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#161e2d', cursor: 'pointer', color: '#3b82f6' }}>
              <RefreshCw size={18} />
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
        <section style={{ marginBottom: '50px' }}>
          <h1 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px', 
            fontSize: '2.8rem', 
            margin: '0 0 10px 0',
            fontWeight: '700',
            color: '#ffffff' // Explicitly set to white for visibility
          }}>
            <Activity size={40} color="#3b82f6" strokeWidth={2.5} /> 
            Infrastructure Monitor
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Tracking real-time uptime and latency for your mission-critical services.
          </p>
        </section>

        {/* INPUT FORM - PILL DESIGN */}
        <section style={{ 
          background: '#161e2d', 
          padding: '30px', 
          borderRadius: '20px', 
          border: '1px solid #2d3748', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          marginBottom: '50px' 
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Service Name (e.g. Auth API)" 
                value={formData.websiteName} 
                onChange={(e) => setFormData({...formData, websiteName: e.target.value})}
                style={{ flex: 1, minWidth: '250px', padding: '14px 24px', borderRadius: '50px', border: '1px solid #2d3748', backgroundColor: '#0a0f1a', color: '#fff', outline: 'none' }}
              />
              <input 
                type="url" 
                placeholder="https://your-service.com" 
                value={formData.url} 
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                style={{ flex: 1, minWidth: '250px', padding: '14px 24px', borderRadius: '50px', border: '1px solid #2d3748', backgroundColor: '#0a0f1a', color: '#fff', outline: 'none' }}
              />
            </div>
            <button type="submit" style={{ 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              padding: '14px', 
              borderRadius: '50px', 
              border: 'none', 
              fontWeight: '700', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '1rem'
            }}>
              <Plus size={20} /> Start Monitoring
            </button>
          </form>
        </section>

        {/* MONITORING GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {targets.map((site) => (
            <div key={site._id} style={{ 
              background: '#161e2d', 
              padding: '24px', 
              borderRadius: '16px', 
              border: '1px solid #2d3748', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '15px',
              transition: 'transform 0.2s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                   <Globe2 size={20} color="#3b82f6" />
                   <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>{site.websiteName}</h3>
                </div>
                <div style={{ 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  fontWeight: '800', 
                  backgroundColor: site.status === 'Up' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                  color: site.status === 'Up' ? '#4ade80' : '#f87171',
                  border: `1px solid ${site.status === 'Up' ? '#22c55e' : '#ef4444'}`
                }}>
                  {site.status.toUpperCase()}
                </div>
              </div>
              <code style={{ color: '#94a3b8', fontSize: '0.85rem', wordBreak: 'break-all', backgroundColor: '#0a0f1a', padding: '8px', borderRadius: '8px' }}>
                {site.url}
              </code>
            </div>
          ))}
        </div>

        {targets.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            color: '#64748b', 
            padding: '80px 20px', 
            border: '2px dashed #1e293b', 
            borderRadius: '20px' 
          }}>
            <p style={{ fontSize: '1.2rem' }}>No active monitors found. Initialize a service above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
