import React from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ totalItems }) => {
  const { currentPage, setCurrentPage, itemsPerPage } = useShop();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const catalogElement = document.getElementById('products-grid');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(totalItems, currentPage * itemsPerPage);

  return (
    <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      
      {/* Items Range Counter */}
      <div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
        Showing <strong style={{ color: '#fff' }}>{startItem}–{endItem}</strong> of <strong style={{ color: '#10B981' }}>{totalItems.toLocaleString()}</strong> items
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: currentPage === 1 ? '#4B5563' : '#fff',
            borderRadius: '8px',
            padding: '0.5rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
            fontWeight: 700
          }}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {getPageNumbers()[0] > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', width: '36px', height: '36px', fontWeight: 700, fontSize: '0.85rem' }}>1</button>
            {getPageNumbers()[0] > 2 && <span style={{ color: '#9CA3AF' }}>...</span>}
          </>
        )}

        {getPageNumbers().map(num => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            style={{
              background: currentPage === num ? '#7C3AED' : 'rgba(255, 255, 255, 0.05)',
              border: currentPage === num ? '1px solid #7C3AED' : '1px solid var(--border-color)',
              color: '#fff',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: currentPage === num ? '0 0 15px rgba(124, 58, 237, 0.5)' : 'none'
            }}
          >
            {num}
          </button>
        ))}

        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && <span style={{ color: '#9CA3AF' }}>...</span>}
            <button onClick={() => handlePageChange(totalPages)} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', width: '36px', height: '36px', fontWeight: 700, fontSize: '0.85rem' }}>{totalPages}</button>
          </>
        )}

        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: currentPage === totalPages ? '#4B5563' : '#fff',
            borderRadius: '8px',
            padding: '0.5rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
            fontWeight: 700
          }}
        >
          Next <ChevronRight size={16} />
        </button>

      </div>

    </div>
  );
};
