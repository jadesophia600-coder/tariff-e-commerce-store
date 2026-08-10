import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught runtime error in Tariff E-Commerce:", error, errorInfo);
  }

  handleReload = () => {
    localStorage.removeItem('tariff_wishlist');
    localStorage.removeItem('tariff_user_profile');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '20px', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <AlertTriangle size={48} color="#EF4444" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>Tariff Mall Recovery Mode</h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '500px', lineHeight: 1.6, marginBottom: '2rem' }}>
            We encountered a temporary session error. Click below to restore your marketplace session.
          </p>
          <button 
            onClick={this.handleReload}
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.85rem 2rem',
              borderRadius: '30px',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)'
            }}
          >
            <RefreshCw size={18} />
            <span>Restore & Reload Website</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
