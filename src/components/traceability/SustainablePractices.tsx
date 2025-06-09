import React from 'react';

interface SustainablePracticesProps {
  practicas: string[];
}

const SustainablePractices: React.FC<SustainablePracticesProps> = ({ practicas }) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Prácticas sostenibles implementadas</h3>
      
      <div className="space-y-4">
        {practicas.map((practica, index) => (
          <div key={index} className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-gray-800 font-medium">{practica}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SustainablePractices;