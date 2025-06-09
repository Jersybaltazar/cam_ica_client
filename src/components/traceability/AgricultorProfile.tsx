import React from 'react';
import { Agricultor } from '../../types';
import { FaUser, FaMapMarkerAlt, FaSeedling, FaLeaf, FaChartLine, FaCertificate } from 'react-icons/fa';

interface AgricultorProfileProps {
  agricultor: Agricultor;
}

const AgricultorProfile: React.FC<AgricultorProfileProps> = ({ agricultor }) => {
  // Función para determinar qué cultivos están activos
  const getCultivosActivos = () => {
    const cultivos = [];
    if (agricultor.esparrago) cultivos.push('Espárrago');
    if (agricultor.granada) cultivos.push('Granada');
    if (agricultor.maiz) cultivos.push('Maíz');
    if (agricultor.palta) cultivos.push('Palta');
    if (agricultor.papa) cultivos.push('Papa');
    if (agricultor.pecano) cultivos.push('Pecano');
    if (agricultor.vid) cultivos.push('Vid');
    return cultivos;
  };

  const cultivosActivos = getCultivosActivos();

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-xl overflow-hidden">
      {/* Header con información principal */}
      <div className="bg-green-700 text-white px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{agricultor.nombre_completo}</h1>
            <div className="mt-2 flex items-center">
              <FaUser className="mr-2" />
              <span>DNI: {agricultor.dni}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 bg-white bg-opacity-20 rounded-lg px-4 py-2 backdrop-blur-sm">
            <p className="font-medium">Censado el {formatDate(agricultor.fecha_censo)}</p>
          </div>
        </div>
      </div>

      {/* Contenido principal en una cuadrícula */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda */}
          <div className="space-y-8">
            {/* Información personal */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl font-bold text-green-800 flex items-center mb-4">
                <FaUser className="mr-3 text-green-600" />
                Información Personal
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sexo:</span>
                  <span className="font-medium">{agricultor.sexo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Edad:</span>
                  <span className="font-medium">{agricultor.edad} años</span>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl font-bold text-green-800 flex items-center mb-4">
                <FaMapMarkerAlt className="mr-3 text-green-600" />
                Ubicación
              </h2>
              <div className="space-y-3">
                <div className="bg-green-50 p-4 rounded-lg text-center mb-4">
                  <p className="font-medium text-lg text-green-800">{agricultor.ubicacion_completa}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Departamento:</span>
                  <span className="font-medium">{agricultor.dpto}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Provincia:</span>
                  <span className="font-medium">{agricultor.provincia}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Distrito:</span>
                  <span className="font-medium">{agricultor.distrito}</span>
                </div>
                {agricultor.centro_poblado && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Centro Poblado:</span>
                    <span className="font-medium">{agricultor.centro_poblado}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Certificaciones */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl font-bold text-green-800 flex items-center mb-4">
                <FaCertificate className="mr-3 text-green-600" />
                Certificaciones
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`rounded-lg p-4 ${agricultor.senasa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                  <h3 className="font-bold text-lg mb-1">SENASA</h3>
                  <p>{agricultor.senasa || 'No registrado'}</p>
                </div>
                <div className={`rounded-lg p-4 ${agricultor.sispa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                  <h3 className="font-bold text-lg mb-1">SISPA</h3>
                  <p>{agricultor.sispa || 'No registrado'}</p>
                </div>
              </div>
              
              {(agricultor.codigo_autogene_sispa || agricultor.regimen_tenencia_sispa) && (
                <div className="mt-4 space-y-3">
                  {agricultor.codigo_autogene_sispa && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Código SISPA:</span>
                      <span className="font-medium">{agricultor.codigo_autogene_sispa}</span>
                    </div>
                  )}
                  {agricultor.regimen_tenencia_sispa && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Régimen SISPA:</span>
                      <span className="font-medium">{agricultor.regimen_tenencia_sispa}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Columna derecha */}
          <div className="space-y-8">
            {/* Cultivos */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl font-bold text-green-800 flex items-center mb-4">
                <FaSeedling className="mr-3 text-green-600" />
                Cultivos
              </h2>
              
              {cultivosActivos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cultivosActivos.map((cultivo, index) => (
                    <div 
                      key={index} 
                      className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-center font-medium"
                    >
                      {cultivo}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No hay cultivos registrados</p>
              )}
            </div>
            
            {/* Información de producción */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl font-bold text-green-800 flex items-center mb-4">
                <FaChartLine className="mr-3 text-green-600" />
                Información de Producción
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Hectáreas:</span>
                  <span className="font-medium">{agricultor.total_ha_sembrada || 0} ha</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tipo de Riego:</span>
                  <span className="font-medium">{agricultor.tipo_riego || 'No especificado'}</span>
                </div>
                {agricultor.productividad_x_ha && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Productividad por Ha:</span>
                    <span className="font-medium">{agricultor.productividad_x_ha}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nivel de Venta:</span>
                  <span className="font-medium">{agricultor.nivel_alcance_venta || 'No especificado'}</span>
                </div>
                {agricultor.jornales_por_ha && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Jornales por Ha:</span>
                    <span className="font-medium">{agricultor.jornales_por_ha}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Prácticas sostenibles */}
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl font-bold text-green-800 flex items-center mb-4">
                <FaLeaf className="mr-3 text-green-600" />
                Prácticas Sostenibles
              </h2>
              
              <div className={`mb-5 rounded-lg p-4 ${agricultor.tiene_practicas_sostenibles ? 'bg-green-100 text-green-800 border-l-4 border-green-600' : 'bg-gray-100 text-gray-600 border-l-4 border-gray-400'}`}>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 ${agricultor.tiene_practicas_sostenibles ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                  <p className="font-medium">
                    {agricultor.tiene_practicas_sostenibles 
                      ? 'Implementa prácticas sostenibles' 
                      : 'No implementa prácticas sostenibles'}
                  </p>
                </div>
              </div>
              
              {agricultor.practica_economica_sost && (
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-gray-600 mb-1">Práctica Económica Sostenible:</span>
                    <span className="font-medium bg-green-50 p-2 rounded">{agricultor.practica_economica_sost}</span>
                  </div>
                  
                  {agricultor.porcentaje_prac_economica_sost && (
                    <div className="mt-3">
                      <span className="text-gray-600 block mb-1">Porcentaje de Implementación:</span>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                        <div 
                          className="bg-green-600 h-4 rounded-full" 
                          style={{ width: `${agricultor.porcentaje_prac_economica_sost}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{agricultor.porcentaje_prac_economica_sost}%</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sección inferior - datos adicionales */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.01] duration-300">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Información Adicional</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agricultor.fecha_actualizacion_sispa && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600 block mb-1">Actualización SISPA:</span>
                <span className="font-medium">{formatDate(agricultor.fecha_actualizacion_sispa)}</span>
              </div>
            )}
            
            {agricultor.area_total_declarada && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600 block mb-1">Área Total Declarada:</span>
                <span className="font-medium">{agricultor.area_total_declarada} ha</span>
              </div>
            )}
            
            {agricultor.toma && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600 block mb-1">Toma:</span>
                <span className="font-medium">{agricultor.toma}</span>
              </div>
            )}
            
            {agricultor.edad_cultivo && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-600 block mb-1">Edad del Cultivo:</span>
                <span className="font-medium">{agricultor.edad_cultivo} años</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgricultorProfile;