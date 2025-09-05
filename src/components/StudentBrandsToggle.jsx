import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentBrandsToggle = ({ onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const activeTab = location.pathname === '/brands' ? 'Brands' : 'Students';

  const handleToggle = (tab) => {
    if (tab === 'Students') {
      navigate('/');
    } else if (tab === 'Brands') {
      navigate('/brands');
    }
    
    if (onToggle) {
      onToggle(tab);
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-full p-1 flex shadow-lg">
      <button
        onClick={() => handleToggle('Students')}
        className={`px-6 py-3 font-medium transition-all duration-300 rounded-full ${
          activeTab === 'Students'
            ? 'bg-[#b8001f] text-white shadow-lg'
            : 'text-white/70 hover:text-white'
        }`}
      >
        Students
      </button>
      <button
        onClick={() => handleToggle('Brands')}
        className={`px-6 py-3 font-medium transition-all duration-300 rounded-full ${
          activeTab === 'Brands'
            ? 'bg-[#b8001f] text-white shadow-lg'
            : 'text-white/70 hover:text-white'
        }`}
      >
        Brands
      </button>
    </div>
  );
};

export default StudentBrandsToggle;
