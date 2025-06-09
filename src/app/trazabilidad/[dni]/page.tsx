'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '../../../components/Layout/Layout';
import { agricultoresService } from '../../../hooks/agricultoreshook';
import { Agricultor } from '../../../types/index';
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaLeaf, FaClipboardCheck, FaCertificate, FaExclamationTriangle } from 'react-icons/fa';
import { FaWaterLadder, FaTractor, FaHandHoldingDollar } from 'react-icons/fa6';

export default function TrazabilidadPage() {
  const { dni } = useParams();
  const [agricultor, setAgricultor] = useState<Agricultor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dni) {
          const data = await agricultoresService.getAgricultorByDni(dni as string);
          setAgricultor(data as Agricultor);
        }
      } catch (err) {
        setError('No se pudo cargar la información del agricultor');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dni]);

  const handleBack = () => {
    router.push('/trazabilidad');
  };

  if (loading) {
    return (
      <Layout title="Cargando datos de trazabilidad - Proyecto PLANTAS">
        <div
          className="min-h-screen flex flex-col items-center justify-center"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#2DB292] border-r-[#154E40] border-b-[#66C874] border-l-[#FFA92B] animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
              <img src="/images/isotipo.png" alt="Plantas" className="w-10 h-10" />
            </div>
          </div>
          <p
            className="mt-4 text-lg text-gray-600"
            style={{ fontFamily: 'Montserrat' }}
          >
            Cargando información del agricultor...
          </p>
        </div>
      </Layout>
    );
  }

  if (error || !agricultor) {
    return (
      <Layout title="Error - Proyecto PLANTAS">
        <div
          className="min-h-screen py-16 px-4"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-red-50 flex items-start">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <FaExclamationTriangle className="text-red-500 text-xl" />
                </div>
              </div>
              <div>
                <h2
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: 'Omegle', color: '#154E40' }}
                >
                  No se encontró la información
                </h2>
                <p
                  className="text-gray-700 mb-6"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  {error || "No se encontró información para el DNI proporcionado. Verifique el número e intente nuevamente."}
                </p>
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-md flex items-center transition-colors"
                  style={{
                    backgroundColor: '#154E40',
                    color: 'white',
                    fontFamily: 'Montserrat'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2DB292'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#154E40'}
                >
                  <FaArrowLeft className="mr-2" />
                  Volver a consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Determinar cultivos activos
  const cultivosActivos = [];
  if (agricultor.esparrago === "SÍ") cultivosActivos.push("Espárrago");
  if (agricultor.granada === "SÍ") cultivosActivos.push("Granada");
  if (agricultor.maiz === "SÍ") cultivosActivos.push("Maíz");
  if (agricultor.palta === "SÍ") cultivosActivos.push("Palta");
  if (agricultor.papa === "SÍ") cultivosActivos.push("Papa");
  if (agricultor.pecano === "SÍ") cultivosActivos.push("Pecano");
  if (agricultor.vid === "SÍ") cultivosActivos.push("Vid");

  return (
    <Layout title={`Trazabilidad - ${agricultor.nombre_completo} - Proyecto PLANTAS`}>
      <div
        className="py-12 px-4 min-h-screen"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="container mx-auto">
          {/* Encabezado con nombre y resumen */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div
              className="p-8 relative"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(21,78,64,0.95) 0%, rgba(45,178,146,0.9) 100%)',
                color: 'white'
              }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: '#154E40' }}
                  >
                    {agricultor.nombre_completo.charAt(0)}
                  </span>
                </div>

                <div>
                  <h1
                    className="text-3xl font-bold mb-2 text-center md:text-left"
                    style={{ fontFamily: 'Omegle' }}
                  >
                    {agricultor.nombre_completo}
                  </h1>

                  <p
                    className="mb-4 text-center md:text-left"
                    style={{ fontFamily: 'Montserrat', color: 'rgba(255,255,255,0.9)' }}
                  >
                    DNI: {agricultor.dni} | Censo: {agricultor.fecha_censo}
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <div
                      className="px-3 py-1 rounded-full text-sm flex items-center"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)', fontFamily: 'Montserrat' }}
                    >
                      <FaMapMarkerAlt className="mr-1" />
                      {agricultor.distrito}, {agricultor.provincia}
                    </div>

                    {agricultor.tiene_practicas_sostenibles && (
                      <div
                        className="px-3 py-1 rounded-full text-sm flex items-center"
                        style={{ backgroundColor: '#66C874', color: 'white', fontFamily: 'Montserrat' }}
                      >
                        <FaLeaf className="mr-1" />
                        Con prácticas sostenibles
                      </div>
                    )}

                    {agricultor.senasa === "SÍ" && (
                      <div
                        className="px-3 py-1 rounded-full text-sm flex items-center"
                        style={{ backgroundColor: '#FFA92B', color: 'white', fontFamily: 'Montserrat' }}
                      >
                        <FaCertificate className="mr-1" />
                        Certificado SENASA
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal en dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda */}
            <div className="lg:col-span-1">
              {/* Tarjeta de datos personales */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2
                    className="text-xl font-bold flex items-center"
                    style={{ fontFamily: 'Omegle', color: '#154E40' }}
                  >
                    <FaUser className="mr-2 text-[#2DB292]" />
                    Datos Personales
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p
                      className="text-sm text-gray-500 mb-1"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      Nombres
                    </p>
                    <p
                      className="font-medium"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {agricultor.nombres}
                    </p>
                  </div>

                  <div>
                    <p
                      className="text-sm text-gray-500 mb-1"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      Apellidos
                    </p>
                    <p
                      className="font-medium"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {agricultor.apellidos}
                    </p>
                  </div>

                  {agricultor.edad > 0 && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Edad
                      </p>
                      <p
                        className="font-medium"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.edad} años
                      </p>
                    </div>
                  )}

                  {agricultor.sexo && agricultor.sexo !== "No especificado" && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Género
                      </p>
                      <p
                        className="font-medium"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.sexo}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tarjeta de ubicación */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2
                    className="text-xl font-bold flex items-center"
                    style={{ fontFamily: 'Omegle', color: '#154E40' }}
                  >
                    <FaMapMarkerAlt className="mr-2 text-[#2DB292]" />
                    Ubicación
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <p
                      className="text-sm text-gray-500 mb-1"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      Departamento
                    </p>
                    <p
                      className="font-medium"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {agricultor.dpto}
                    </p>
                  </div>

                  <div>
                    <p
                      className="text-sm text-gray-500 mb-1"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      Provincia
                    </p>
                    <p
                      className="font-medium"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {agricultor.provincia}
                    </p>
                  </div>

                  <div>
                    <p
                      className="text-sm text-gray-500 mb-1"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      Distrito
                    </p>
                    <p
                      className="font-medium"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {agricultor.distrito}
                    </p>
                  </div>

                  {agricultor.centro_poblado && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Centro Poblado
                      </p>
                      <p
                        className="font-medium"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.centro_poblado}
                      </p>
                    </div>
                  )}

                  {agricultor.ubicacion_completa && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Dirección completa
                      </p>
                      <p
                        className="font-medium"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.ubicacion_completa}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tarjeta de certificaciones */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2
                    className="text-xl font-bold flex items-center"
                    style={{ fontFamily: 'Omegle', color: '#154E40' }}
                  >
                    <FaCertificate className="mr-2 text-[#2DB292]" />
                    Certificaciones
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${agricultor.senasa === "SÍ" ? 'bg-[#2DB292]' : 'bg-gray-200'}`}
                      >
                        {agricultor.senasa === "SÍ" && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${agricultor.senasa === "SÍ" ? 'text-gray-800' : 'text-gray-500'}`}
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          SENASA
                        </p>
                        <p
                          className="text-sm text-gray-500"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          {agricultor.senasa === "SÍ" ? 'Certificado' : 'No certificado'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${agricultor.sispa === "SÍ" ? 'bg-[#2DB292]' : 'bg-gray-200'}`}
                      >
                        {agricultor.sispa === "SÍ" && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${agricultor.sispa === "SÍ" ? 'text-gray-800' : 'text-gray-500'}`}
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          SISPA
                        </p>
                        <p
                          className="text-sm text-gray-500"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          {agricultor.sispa === "SÍ" ? 'Registrado' : 'No registrado'}
                        </p>
                      </div>
                    </div>

                    {agricultor.codigo_autogene_sispa && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p
                          className="text-sm text-gray-500 mb-1"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          Código SISPA
                        </p>
                        <p
                          className="font-medium"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          {agricultor.codigo_autogene_sispa}
                        </p>
                      </div>
                    )}

                    {agricultor.fecha_actualizacion_sispa && (
                      <div>
                        <p
                          className="text-sm text-gray-500 mb-1"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          Última actualización SISPA
                        </p>
                        <p
                          className="font-medium"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          {agricultor.fecha_actualizacion_sispa}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha (más ancha) */}
            <div className="lg:col-span-2">
              {/* Tarjeta de cultivos */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2
                    className="text-xl font-bold flex items-center"
                    style={{ fontFamily: 'Omegle', color: '#154E40' }}
                  >
                    <FaLeaf className="mr-2 text-[#2DB292]" />
                    Cultivos
                  </h2>
                </div>

                <div className="p-6">
                  {cultivosActivos.length > 0 ? (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {agricultor.esparrago === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/esparrago.jpg" alt="Espárrago" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }}>Espárrago</p>
                          </div>
                        )}

                        {agricultor.granada === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div
                              className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center"
                              style={{ backgroundColor: '#daf1ea' }}
                            >
                              <img
                                src="/images/cultivos/granada.jpg"
                                alt="Granada"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }}>Granada</p>
                          </div>
                        )}


                        {agricultor.maiz === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div
                              className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center"
                              style={{ backgroundColor: '#daf1ea' }}>
                              <img
                                src="/images/cultivos/maiz.jpg"
                                alt="Maíz"
                                className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }}>Maíz</p>
                          </div>
                        )}

                        {agricultor.palta === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/palta.jpg" alt="Palta" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }}>Palta</p>
                          </div>
                        )}

                        {agricultor.papa === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/papa.jpg" alt="Papa" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }}>Papa</p>
                          </div>
                        )}

                        {agricultor.pecano === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/pecano.png" alt="Pecano" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }}>Pecano</p>
                          </div>
                        )}

                        {agricultor.vid === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/vid.png" alt="Vid" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }}>Vid</p>
                          </div>
                        )}
                      </div>

                      {/* Detalles técnicos */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 border-t border-gray-100 pt-6">
                        {agricultor.area_total_declarada && (
                          <div>
                            <p
                              className="text-sm text-gray-500 mb-1"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              Área total declarada
                            </p>
                            <p
                              className="font-medium flex items-center"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              {agricultor.area_total_declarada} ha
                            </p>
                          </div>
                        )}

                        {agricultor.total_ha_sembrada > 0 && (
                          <div>
                            <p
                              className="text-sm text-gray-500 mb-1"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              Hectáreas sembradas
                            </p>
                            <p
                              className="font-medium flex items-center"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              {agricultor.total_ha_sembrada} ha
                            </p>
                          </div>
                        )}

                        {agricultor.edad_cultivo && (
                          <div>
                            <p
                              className="text-sm text-gray-500 mb-1"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              Edad del cultivo
                            </p>
                            <p
                              className="font-medium"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              {agricultor.edad_cultivo}
                            </p>
                          </div>
                        )}

                        {agricultor.productividad_x_ha && (
                          <div>
                            <p
                              className="text-sm text-gray-500 mb-1"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              Productividad por hectárea
                            </p>
                            <p
                              className="font-medium"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              {agricultor.productividad_x_ha}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <p
                      className="text-center text-gray-500 py-6"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      No se han registrado cultivos activos para este agricultor.
                    </p>
                  )}
                </div>
              </div>

              {/* Tarjeta de información técnica */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2
                    className="text-xl font-bold flex items-center"
                    style={{ fontFamily: 'Omegle', color: '#154E40' }}
                  >
                    <FaTractor className="mr-2 text-[#2DB292]" />
                    Información Técnica
                  </h2>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {agricultor.tipo_riego && (
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          <FaWaterLadder className="text-[#2DB292]" />
                        </div>
                        <div>
                          <p
                            className="text-sm text-gray-500 mb-1"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            Tipo de riego
                          </p>
                          <p
                            className="font-medium"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {agricultor.tipo_riego}
                          </p>
                        </div>
                      </div>
                    )}

                    {agricultor.nivel_alcance_venta && (
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          <FaHandHoldingDollar className="text-[#2DB292]" />
                        </div>
                        <div>
                          <p
                            className="text-sm text-gray-500 mb-1"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            Nivel de alcance de venta
                          </p>
                          <p
                            className="font-medium"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {agricultor.nivel_alcance_venta}
                          </p>
                        </div>
                      </div>
                    )}

                    {agricultor.jornales_por_ha && (
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          <FaUser className="text-[#2DB292]" />
                        </div>
                        <div>
                          <p
                            className="text-sm text-gray-500 mb-1"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            Jornales por hectárea
                          </p>
                          <p
                            className="font-medium"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {agricultor.jornales_por_ha}
                          </p>
                        </div>
                      </div>
                    )}

                    {agricultor.regimen_tenencia_sispa && (
                      <div className="flex items-start">
                        <div className="mt-1 mr-3">
                          <FaClipboardCheck className="text-[#2DB292]" />
                        </div>
                        <div>
                          <p
                            className="text-sm text-gray-500 mb-1"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            Régimen de tenencia
                          </p>
                          <p
                            className="font-medium"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {agricultor.regimen_tenencia_sispa}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tarjeta de prácticas sostenibles */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2
                    className="text-xl font-bold flex items-center"
                    style={{ fontFamily: 'Omegle', color: '#154E40' }}
                  >
                    <FaLeaf className="mr-2 text-[#2DB292]" />
                    Prácticas Sostenibles
                  </h2>
                </div>

                <div className="p-6">
                  {agricultor.tiene_practicas_sostenibles ? (
                    <div className="space-y-6">
                      <div className="flex items-center bg-[#F0F9F6] p-4 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-[#66C874] flex items-center justify-center mr-4">
                          <FaLeaf className="text-white text-xl" />
                        </div>
                        <div>
                          <h3
                            className="text-lg font-semibold mb-1"
                            style={{ fontFamily: 'Montserrat', color: '#154E40' }}
                          >
                            Agricultor Sostenible
                          </h3>
                          <p
                            className="text-gray-600"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            Este agricultor implementa prácticas agrícolas sostenibles.
                          </p>
                        </div>
                      </div>

                      {agricultor.practica_economica_sost && (
                        <div>
                          <h4
                            className="text-lg font-medium mb-2"
                            style={{ fontFamily: 'Montserrat', color: '#2DB292' }}
                          >
                            Prácticas económicas sostenibles
                          </h4>
                          <p
                            className="mb-4"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {agricultor.practica_economica_sost}
                          </p>

                          {agricultor.porcentaje_prac_economica_sost && (
                            <div className="mt-3">
                              <p
                                className="text-sm text-gray-500 mb-2"
                                style={{ fontFamily: 'Montserrat' }}
                              >
                                Porcentaje de implementación
                              </p>

                              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                                <div
                                  className="h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                  style={{
                                    width: `${(() => {
                                      const porcentaje = agricultor.porcentaje_prac_economica_sost;
                                      // Si contiene un guión, es un rango, tomar el valor máximo
                                      if (porcentaje.includes('-')) {
                                        const match = porcentaje.match(/(\d+)\s*-\s*(\d+)%/);
                                        return match ? parseInt(match[2]) : 0;
                                      }
                                      // Si es un valor simple como "50%"
                                      return parseInt(porcentaje.replace('%', '').trim());
                                    })()}%`,
                                    backgroundColor: '#66C874'
                                  }}>
                                </div>
                              </div>

                              <p
                                className="text-right text-sm"
                                style={{ fontFamily: 'Montserrat', color: '#154E40' }}
                              >
                                {agricultor.porcentaje_prac_economica_sost}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaLeaf className="text-gray-400 text-2xl" />
                      </div>
                      <p
                        className="text-gray-500"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        No se han registrado prácticas sostenibles para este agricultor.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pie de página con información del proyecto */}
          <div className="mt-8 text-center">
            <div
              className="inline-flex items-center text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm"
              style={{ fontFamily: 'Montserrat' }}
            >
              Proyecto PLANTAS - Palanca para la Transición Agrosostenible
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}