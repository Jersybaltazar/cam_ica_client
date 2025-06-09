import React from 'react';

interface CropInfoProps {
  actividad: string;
  superficie: string;
  tipoCultivo: string;
  variedadCultivo: string;
}

const CropInfo: React.FC<CropInfoProps> = ({ actividad, superficie, tipoCultivo, variedadCultivo }) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de cultivo</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Actividad agraria</p>
          <p className="font-medium">{actividad}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Superficie total</p>
          <p className="font-medium">{superficie}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Tipo de cultivo</p>
          <p className="font-medium">{tipoCultivo}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Variedad de cultivo</p>
          <p className="font-medium">{variedadCultivo}</p>
        </div>
      </div>
    </>
  );
};

export default CropInfo;
