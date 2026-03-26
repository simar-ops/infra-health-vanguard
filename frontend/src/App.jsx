import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, CheckCircle, AlertCircle, RefreshCw, PlusCircle, Globe2, Trash2 } from 'lucide-react';

function App() {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ websiteName: '', url: '' });

  const fetchStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/targets/all');
      setTargets(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Backend connection failed", error);
      setLoading(false);
    }
  };

  // --- NEW CHANGE: Clear All Logic ---
  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete all monitored services?")) {
      try {
        await axios.delete('http://localhost:5000/api/targets/clear-all');
        fetchStatus(); // Refresh the list
      } catch (error) {
        alert("Error clearing database.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/targets/add', formData);
      setFormData({ websiteName: '', url: '' });
      fetchStatus();
    } catch (error) {
      alert("Error adding target.");
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'system-ui', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0f172a', margin: 0 }}>
              <Activity size={32} color="#3b82f6" strokeWidth={2.5} /> Infrastructure Monitor
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleClearAll} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #fee2e2', background: '#fef2f2', cursor: 'pointer', color: '#ef4444' }} title="Clear All Data">
              <Trash2 size={20} />
            </button>
            <button onClick={fetchStatus} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
              <RefreshCw size={20} color="#64748b" />
            </button>
          </div>
        </header>

        <section style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', marginBottom: '32px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input type="text" placeholder="Service Name" value={formData.websiteName} onChange={(e) => setFormData({...formData, websiteName: e.target.value})} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <input type="url" placeholder="https://..." value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Start Monitoring</button>
          </form>
        </section>

        <div style={{ display: 'grid', gap: '16px' }}>
          {targets.map((site) => (
            <div key={site._id} style={{ background: 'white', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Globe2 size={24} color="#64748b" />
                <div>
                  <h3 style={{ margin: 0, color: '#1e293b' }}>{site.websiteName}</h3>
                  <code style={{ color: '#94a3b8', fontSize: '12px' }}>{site.url}</code>
                </div>
              </div>
              <div style={{ padding: '6px 14px', borderRadius: '20px', backgroundColor: site.status === 'Up' ? '#f0fdf4' : '#fef2f2', color: site.status === 'Up' ? '#166534' : '#991b1b', fontWeight: '700', fontSize: '12px' }}>
                {site.status.toUpperCase()}
              </div>
            </div>
          ))}
          {targets.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8' }}>No services monitored. Use the form to start fresh!</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
