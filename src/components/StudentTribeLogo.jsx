import React from 'react';

const StudentTribeLogo = ({ className = '', size = 'medium' }) => {
  const sizeClasses = {
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6'
  };

  const textSizes = {
    small: { main: 'text-lg', sub: 'text-xs' },
    medium: { main: 'text-3xl', sub: 'text-sm' },
    large: { main: 'text-4xl', sub: 'text-base' }
  };

  return (
    <div className={`bg-white rounded-full ${sizeClasses[size]} shadow-2xl ${className}`}>
      <div className="flex flex-col items-center">
        <span className={`${textSizes[size].main} font-bold text-[#b8001f] mb-1`}>
          ST.
        </span>
        <span className={`${textSizes[size].sub} font-semibold text-gray-600`}>
          Student Tribe
        </span>
      </div>
    </div>
  );
};

export default StudentTribeLogo;
