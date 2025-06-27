import React from "react";
import { FaEdit, FaUser, FaSeedling, FaMapMarkerAlt, FaLeaf, FaCertificate, FaChartLine, FaPhone, FaBuilding, FaIndustry, FaMapPin, FaLink } from "react-icons/fa";
import { Agricultor } from "../../types";

interface VistaAgricultorProps {
  agricultor: Agricultor | null;
  onBack: () => void;
  onEdit: (agricultor: Agricultor) => void;
}
const VistaAgricultor: React.FC<VistaAgricultorProps> = ({ agricultor, onBack, onEdit }) => {
  if (!agricultor) return null;

  // Función para determinar qué cultivos están activos
  const getCultivosActivos = () => {
    const cultivos = [];

    if (agricultor.esparrago === 'SÍ') cultivos.push('Espárrago');
    if (agricultor.granada === 'SÍ') cultivos.push('Granada');
    if (agricultor.maiz === 'SÍ') cultivos.push('Maíz');
    if (agricultor.palta === 'SÍ') cultivos.push('Palta');
    if (agricultor.papa === 'SÍ') cultivos.push('Papa');
    if (agricultor.pecano === 'SÍ') cultivos.push('Pecano');
    if (agricultor.vid === 'SÍ') cultivos.push('Vid');
    if (agricultor.castaña === 'SÍ') cultivos.push('Castaña');

    return cultivos;
  };
  const getProgramasActivos = () => {
    const programas = [];

    if (agricultor.programa_plantas === 'SÍ') programas.push('Programa PLANTAS');
    if (agricultor.inia_programa_peru_2m === 'SÍ') programas.push('INIA Programa Perú 2M');
    if (agricultor.senasa_escuela_campo === 'SÍ') programas.push('SENASA Escuela de Campo');

    return programas;
  };
  // Formatear fechas
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'No especificado';

    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const cultivosActivos = getCultivosActivos();
  const programasActivos = getProgramasActivos();

return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Encabezado */}
      <div
        className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: 'Omegle', color: '#154E40' }}
          >
            {agricultor.nombre_completo}
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'Montserrat' }}>
            DNI: {agricultor.dni} | Censado: {formatDate(agricultor.fecha_censo)}
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="px-4 py-2 border rounded-md text-gray-600"
            style={{
              fontFamily: 'Montserrat',
              borderColor: '#ECEBEB'
            }}
          >
            Volver
          </button>

          <button
            onClick={() => onEdit(agricultor)}
            className="px-4 py-2 rounded-md text-white flex items-center"
            style={{
              backgroundColor: '#FFA92B',
              fontFamily: 'Montserrat'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e69518'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFA92B'}
          >
            <FaEdit className="mr-2" />
            Editar
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna 1: Datos personales y ubicación */}
          <div className="space-y-6">
            {/* Datos personales */}
            <div className="border rounded-lg p-6">
              <h3
                className="text-xl font-semibold mb-4 flex items-center"
                style={{ fontFamily: 'Omegle', color: '#2DB292' }}
              >
                <FaUser className="mr-2" />
                Datos Personales
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    Nombres
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.nombres || "No especificado"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    Apellidos
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.apellidos || "No especificado"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    País
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.pais || "No especificado"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    Sexo
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.sexo || "No especificado"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    Edad
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.edad || "No especificada"}
                  </p>
                </div>

                {/* Nuevo campo: Teléfono */}
                {agricultor.telefono && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      <FaPhone className="inline mr-1" /> Teléfono
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.telefono}
                    </p>
                  </div>
                )}
                {agricultor.nombre_empresa_organizacion && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      <FaBuilding className="inline mr-1" /> Empresa u Organización
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.nombre_empresa_organizacion}
                    </p>
                  </div>
                )}
                {/* Nuevo campo: Tamaño Empresa */}
                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    <FaBuilding className="inline mr-1" /> Tamaño de Empresa
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.tamaño_empresa || "No especificado"}
                  </p>
                </div>

                {/* Nuevo campo: Sector */}
                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    <FaIndustry className="inline mr-1" /> Sector
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.sector || "No especificado"}
                  </p>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="border rounded-lg p-6">
              <h3
                className="text-xl font-semibold mb-4 flex items-center"
                style={{ fontFamily: 'Omegle', color: '#2DB292' }}
              >
                <FaMapMarkerAlt className="mr-2" />
                Ubicación
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    Departamento
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.dpto || "No especificado"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    Provincia
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.provincia || "No especificado"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                    Distrito
                  </p>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.distrito || "No especificado"}
                  </p>
                </div>

                {agricultor.centro_poblado && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Centro Poblado
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.centro_poblado}
                    </p>
                  </div>
                )}

                {agricultor.ubicacion_completa && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Ubicación completa
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.ubicacion_completa}
                    </p>
                  </div>
                )}

                {/* Nuevos campos: Coordenadas */}
                {agricultor.coordenadas && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      <FaMapPin className="inline mr-1" /> Coordenadas
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.coordenadas}
                    </p>
                  </div>
                )}

                {/* Nuevo campo: Link de Google Maps */}
                {agricultor.ubicacion_maps && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      <FaLink className="inline mr-1" /> Ver en Google Maps
                    </p>
                    <a
                      href={agricultor.ubicacion_maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#2DB292] hover:underline"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      Abrir mapa
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna 2: Cultivos y certificaciones */}
          <div className="space-y-6">
            {/* Cultivos */}
            <div className="border rounded-lg p-6">
              <h3
                className="text-xl font-semibold mb-4 flex items-center"
                style={{ fontFamily: 'Omegle', color: '#2DB292' }}
              >
                <FaSeedling className="mr-2" />
                Cultivos
              </h3>

              {cultivosActivos.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {cultivosActivos.map((cultivo, index) => (
                    <div
                      key={index}
                      className="bg-green-100 text-green-800 rounded-md px-3 py-2 text-center"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {cultivo}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                  No se han registrado cultivos
                </p>
              )}
            </div>

            {/* Certificaciones */}
            <div className="border rounded-lg p-6">
              <h3
                className="text-xl font-semibold mb-4 flex items-center"
                style={{ fontFamily: 'Omegle', color: '#2DB292' }}
              >
                <FaCertificate className="mr-2" />
                Certificaciones
              </h3>

              <div className="space-y-4">
                {/* Programas de certificación */}
                <div>
                  <p className="text-sm text-gray-500 mb-2" style={{ fontFamily: 'Montserrat' }}>
                    Capacitaciones
                  </p>
                  {programasActivos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {programasActivos.map((programa, index) => (
                        <div
                          key={index}
                          className="bg-blue-50 text-blue-700 rounded-md px-3 py-2 text-center"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          {programa}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      No participa en programas de certificación
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2" style={{ fontFamily: 'Montserrat' }}>
                    Certificaciones
                  </p>
                  <div className="flex mt-2 space-x-3">
                    <div className={`py-1 px-3 rounded-md ${agricultor.senasa === 'SÍ' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      <span style={{ fontFamily: 'Montserrat' }}>SENASA</span>
                    </div>
                    <div className={`py-1 px-3 rounded-md ${agricultor.sispa === 'SÍ' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      <span style={{ fontFamily: 'Montserrat' }}>SISPA</span>
                    </div>
                  </div>
                </div>

                {/* SENASA información detallada */}
                {agricultor.senasa === 'SÍ' && (
                  <div className="pt-3 space-y-3 border-t border-gray-200">
                    <p className="font-medium text-[#2DB292]" style={{ fontFamily: 'Montserrat' }}>
                      Información SENASA
                    </p>
                    
                    {agricultor.cod_lugar_prod && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Código de lugar de producción
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.cod_lugar_prod}
                        </p>
                      </div>
                    )}

                    {agricultor.area_solicitada !== null && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Área solicitada
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.area_solicitada} ha
                        </p>
                      </div>
                    )}

                    {agricultor.rendimiento_certificado !== null && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Rendimiento certificado
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.rendimiento_certificado} ton/ha
                        </p>
                      </div>
                    )}

                    {agricultor.predio && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Predio
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.predio}
                        </p>
                      </div>
                    )}

                    {agricultor.direccion && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Dirección
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.direccion}
                        </p>
                      </div>
                    )}

                    {agricultor.departamento_senasa && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Departamento SENASA
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.departamento_senasa}
                        </p>
                      </div>
                    )}

                    {agricultor.provincia_senasa && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Provincia SENASA
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.provincia_senasa}
                        </p>
                      </div>
                    )}

                    {agricultor.distrito_senasa && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Distrito SENASA
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.distrito_senasa}
                        </p>
                      </div>
                    )}

                    {agricultor.sector_senasa && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Sector SENASA
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.sector_senasa}
                        </p>
                      </div>
                    )}

                    {agricultor.subsector_senasa && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Subsector SENASA
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.subsector_senasa}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {agricultor.sispa === 'SÍ' && (
                  <div className="pt-3 space-y-3 border-t border-gray-200">
                    <p className="font-medium text-[#2DB292]" style={{ fontFamily: 'Montserrat' }}>
                      Información SISPA
                    </p>
                    
                    {agricultor.codigo_autogene_sispa && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Código SISPA
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.codigo_autogene_sispa}
                        </p>
                      </div>
                    )}

                    {agricultor.regimen_tenencia_sispa && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Régimen de tenencia
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.regimen_tenencia_sispa}
                        </p>
                      </div>
                    )}

                    {agricultor.area_total_declarada !== null && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Área total declarada
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {agricultor.area_total_declarada} ha
                        </p>
                      </div>
                    )}

                    {agricultor.fecha_actualizacion_sispa && (
                      <div>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                          Última actualización
                        </p>
                        <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                          {formatDate(agricultor.fecha_actualizacion_sispa)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna 3: Información técnica y sostenibilidad */}
          <div className="space-y-6">
            {/* Información técnica */}
            <div className="border rounded-lg p-6">
              <h3
                className="text-xl font-semibold mb-4 flex items-center"
                style={{ fontFamily: 'Omegle', color: '#2DB292' }}
              >
                <FaChartLine className="mr-2" />
                Información Técnica
              </h3>

              <div className="space-y-3">
                {agricultor.toma && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Toma
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.toma}
                    </p>
                  </div>
                )}

                {agricultor.edad_cultivo && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Edad del cultivo
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.edad_cultivo}
                    </p>
                  </div>
                )}

                {agricultor.total_ha_sembrada !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Total hectáreas sembradas
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.total_ha_sembrada} ha
                    </p>
                  </div>
                )}

                {agricultor.productividad_x_ha !== null && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Productividad por hectárea
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.productividad_x_ha} Ton/ha
                    </p>
                  </div>
                )}

                {agricultor.tipo_riego && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Tipo de riego
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.tipo_riego}
                    </p>
                  </div>
                )}

                {agricultor.nivel_alcance_venta && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Nivel de alcance de venta
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.nivel_alcance_venta}
                    </p>
                  </div>
                )}

                {agricultor.jornales_por_ha !== null && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Jornales por hectárea
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.jornales_por_ha}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sostenibilidad */}
            <div className="border rounded-lg p-6">
              <h3
                className="text-xl font-semibold mb-4 flex items-center"
                style={{ fontFamily: 'Omegle', color: '#2DB292' }}
              >
                <FaLeaf className="mr-2" />
                Prácticas Sostenibles
              </h3>

              <div className="space-y-4">
                <div className={`p-3 rounded-lg ${agricultor.tiene_practicas_sostenibles ? 'bg-green-50 border-l-4 border-green-500' : 'bg-gray-50 border-l-4 border-gray-300'}`}>
                  <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                    {agricultor.tiene_practicas_sostenibles
                      ? "Implementa prácticas sostenibles"
                      : "No implementa prácticas sostenibles"}
                  </p>
                </div>

                {agricultor.practica_economica_sost && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Práctica económica sostenible
                    </p>
                    <p className="font-medium bg-green-50 p-2 rounded mt-1" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.practica_economica_sost}
                    </p>
                  </div>
                )}

                {agricultor.porcentaje_prac_economica_sost && (
                  <div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>
                      Porcentaje de implementación
                    </p>
                    <p className="font-medium" style={{ fontFamily: 'Montserrat' }}>
                      {agricultor.porcentaje_prac_economica_sost}
                    </p>

                    {agricultor.porcentaje_prac_economica_sost && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="h-2.5 rounded-full transition-all duration-300 ease-in-out"
                          style={{
                            width: `${(() => {
                              // Manejar el caso en que porcentaje_prac_economica_sost sea null
                              if (!agricultor.porcentaje_prac_economica_sost) return 0;
                              
                              const porcentaje = agricultor.porcentaje_prac_economica_sost;
                              // Si contiene un guión, es un rango, tomar el valor máximo
                              if (porcentaje.includes('-')) {
                                const match = porcentaje.match(/(\d+)\s*-\s*(\d+)%/);
                                return match ? parseInt(match[2]) : 0;
                              }
                              // Si es un valor simple como "50%"
                              return parseInt(porcentaje.replace('%', '').trim()) || 0;
                            })()}%`,
                            backgroundColor: '#66C874'
                          }}>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Línea decorativa con colores de la paleta */}
        <div className="mt-8 flex">
          <div className="w-16 h-1" style={{ backgroundColor: '#154E40' }}></div>
          <div className="w-16 h-1" style={{ backgroundColor: '#2DB292' }}></div>
          <div className="w-16 h-1" style={{ backgroundColor: '#66C874' }}></div>
          <div className="w-16 h-1" style={{ backgroundColor: '#FFA92B' }}></div>
        </div>
      </div>
    </div>
  );
};

export default VistaAgricultor;