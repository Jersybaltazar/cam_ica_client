import React from 'react';

interface Ubicacion {
  departamento: string;
  provincia: string;
  distrito: string;
}

interface LocationInfoProps {
  ubicacion: Ubicacion;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ ubicacion }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ubicación</h3>
      <div className="space-y-3">
        <div className="flex">
          <span className="font-medium text-gray-700 w-40">Departamento:</span>
          <span>{ubicacion.departamento}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-40">Provincia:</span>
          <span>{ubicacion.provincia}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-40">Distrito:</span>
          <span>{ubicacion.distrito}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;