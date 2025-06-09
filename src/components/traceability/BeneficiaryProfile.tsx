import React from 'react';
import AttendanceChart from '../traceability/AttendanceChart';
import CropInfo from '../traceability/CropInfo';
import LocationInfo from '../traceability/LocationInfo';
import SustainablePractices from '../traceability/SustainablePractices';

interface BeneficiaryProfileProps {
  data: {
    nombres: string;
    codigo: string;
    dni: string;
    fechaCenso: string;
    ubicacion: any; // Replace 'any' with the correct type if available
    actividad: string;
    superficie: string | number;
    tipoCultivo: string;
    variedadCultivo: string;
    asistencia: any; // Replace 'any' with the correct type if available
    empleosVerdes: number;
    totalEmpleos: number;
    practicasSostenibles: any; // Replace 'any' with the correct type if available
  };
}

const BeneficiaryProfile: React.FC<BeneficiaryProfileProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Encabezado */}
      <div className="bg-green-600 px-6 py-4">
        <h2 className="text-xl text-white font-semibold">
          Sr.(a) {data.nombres}, a continuación se muestra su trayectoria durante su participación en el proyecto PLANTAS.
        </h2>
      </div>
      
      {/* Información personal */}
      <div className="p-6 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="font-medium text-gray-700 w-40">Código de agricultor:</span>
                <span>{data.codigo}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-40">Nombres y apellidos:</span>
                <span>{data.nombres}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-40">DNI:</span>
                <span>{data.dni}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-40">Fecha de censo:</span>
                <span>{data.fechaCenso}</span>
              </div>
            </div>
          </div>
          
          <LocationInfo ubicacion={data.ubicacion} />
        </div>
      </div>
      
      {/* Información de cultivo */}
      <div className="p-6 border-b">
        <CropInfo 
          actividad={data.actividad}
          superficie={String(data.superficie)}
          tipoCultivo={data.tipoCultivo}
          variedadCultivo={data.variedadCultivo}
        />
      </div>
      
      {/* Asistencia y participación */}
      <div className="p-6 border-b grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Control de asistencia</h3>
          <AttendanceChart asistencia={data.asistencia} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Empleos verdes</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Empleos verdes contratados:</span>
              <span className="font-semibold">{data.empleosVerdes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total de empleos:</span>
              <span className="font-semibold">{data.totalEmpleos}</span>
            </div>
            
            <div className="mt-4">
              <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600" 
                  style={{ width: `${(data.empleosVerdes / data.totalEmpleos) * 100}%` }}
                ></div>
              </div>
              <div className="text-right mt-1 text-sm text-gray-600">
                {Math.round((data.empleosVerdes / data.totalEmpleos) * 100)}% de empleos verdes
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Prácticas sostenibles */}
      <div className="p-6">
        <SustainablePractices practicas={data.practicasSostenibles} />
      </div>
      
      {/* Pie de página */}
      <div className="px-6 py-4 bg-gray-50 text-xs text-gray-500 italic">
        "Esta publicación con el apoyo financiero de la Unión Europea,
        a través de sequa. Su contenido es responsabilidad exclusiva de la Cámara de Comercio, Industria y Turismo de Ica
        y no refleja necesariamente las opiniones de la Unión Europea, sequa o del consorcio
        responsable de la ejecución del programa AL-INVEST Verde"
      </div>
    </div>
  );
};

export default BeneficiaryProfile;