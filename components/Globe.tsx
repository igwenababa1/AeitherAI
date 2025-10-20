import React from 'react';

export const Globe: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden opacity-50">
      <div className="w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] relative">
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.1), transparent 60%)'
          }}
        />
        <div 
          className="absolute inset-0 rounded-full globe-bg"
        />
      </div>
    </div>
  );
};