'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '../../../components/Layout/Layout';
import { agricultoresService } from '../../../hooks/agricultoreshook';
import { Agricultor } from '../../../types/index';
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaLeaf, FaClipboardCheck, FaCertificate, FaExclamationTriangle, FaLink, FaMapPin, FaGraduationCap, FaFilePdf } from 'react-icons/fa';
import { FaWaterLadder, FaTractor, FaHandHoldingDollar } from 'react-icons/fa6';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';

export default function TrazabilidadPage() {
  const { dni } = useParams();
  const [agricultor, setAgricultor] = useState<Agricultor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pdfRef = useRef<HTMLDivElement>(null);

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

  // Función mejorada para exportar a PDF
  const exportToPDF = async () => {
    if (!pdfRef.current) return;

    // Mostrar indicador de carga
    const loadingToast = toast.loading("Generando PDF...");

    try {
      // 1. Crear una copia profunda del contenido para manipularlo
      const originalElement = pdfRef.current;
      const clonedElement = originalElement.cloneNode(true) as HTMLElement;

      // 2. Hacerlo invisible pero en el DOM para mantener los estilos
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      document.body.appendChild(clonedElement);

      // 3. Reemplazar todos los estilos que contengan oklch
      const elementsWithStyle = clonedElement.querySelectorAll('*[style]');
      elementsWithStyle.forEach(el => {
        const style = (el as HTMLElement).style;

        // Reemplazar cualquier color oklch con un color RGB equivalente
        for (let i = 0; i < style.length; i++) {
          const prop = style[i];
          const value = style.getPropertyValue(prop);

          if (value.includes('oklch')) {
            // Usar colores de la paleta del proyecto en lugar de oklch
            if (value.includes('154E40')) {
              style.setProperty(prop, '#154E40');
            } else if (value.includes('2DB292')) {
              style.setProperty(prop, '#2DB292');
            } else if (value.includes('66C874')) {
              style.setProperty(prop, '#66C874');
            } else if (value.includes('FFA92B')) {
              style.setProperty(prop, '#FFA92B');
            } else {
              // Color por defecto si no coincide con ninguno de la paleta
              style.setProperty(prop, '#2DB292');
            }
          }
        }
      });

      // 4. Reemplazar también gradientes que puedan usar oklch
      const elementsWithBg = clonedElement.querySelectorAll('*[style*="background"]');
      elementsWithBg.forEach(el => {
        const style = (el as HTMLElement).style;
        const bgImg = style.backgroundImage;

        if (bgImg && bgImg.includes('oklch')) {
          // Reemplazar con un gradiente estándar RGB
          style.backgroundImage = 'linear-gradient(90deg, rgba(21,78,64,0.95) 0%, rgba(45,178,146,0.9) 100%)';
        }
      });

      // 5. Capturar la versión modificada
      const options = {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 0,
        backgroundColor: '#ffffff'
      };

      const canvas = await html2canvas(clonedElement, options);

      // 6. Limpiar - quitar el clon del DOM
      document.body.removeChild(clonedElement);

      // 7. Continuar con la generación del PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Para documentos de una sola página
      if (imgHeight * ratio <= pdfHeight) {
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      } else {
        // Para documentos de varias páginas
        let heightLeft = imgHeight;
        let position = 0;
        const heightLimit = pdfHeight / ratio;

        while (heightLeft > 0) {
          pdf.addImage(
            imgData, 'PNG',
            imgX, imgY - position * ratio,
            imgWidth * ratio, imgHeight * ratio
          );

          heightLeft -= heightLimit;
          position += heightLimit;

          if (heightLeft > 0) {
            pdf.addPage();
          }
        }
      }

      // Guardar el PDF
      pdf.save(`trazabilidad_${agricultor?.nombre_completo || agricultor?.dni || 'agricultor'}.pdf`);

      toast.success("PDF generado con éxito");
    } catch (err) {
      console.error('Error al generar PDF:', err);
      toast.error(`Error al generar el PDF: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      toast.dismiss(loadingToast);
    }
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
  if (agricultor.castaña === "SÍ") cultivosActivos.push("Castaña");
  return (
    <Layout title={`Trazabilidad - ${agricultor.nombre_completo} - Proyecto PLANTAS`}>
      <Toaster position="top-center" />
      <div
        className="min-h-screen"
        style={{ backgroundColor: '#f8f9fa' }}
      >
      <div className="bg-white shadow-sm">
        <div className="flex justify-center items-center py-6 px-6">
          <img
            src="/images/cultivos/CCITIca - PLANTAS - AIV (fondo blanco).png"
            alt="Proyecto PLANTAS - Socios Estratégicos"
            className="h-20 w-auto object-contain max-w-full"
            style={{ maxHeight: '80px' }}
          />
        </div>
      </div>
      <div className="px-4">
        <div ref={pdfRef} className="container mx-auto">

          {/* Encabezado con nombre y resumen */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div
              className="p-8 relative"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(21,78,64,0.95) 0%, rgba(45,178,146,0.9) 100%)',
                color: 'white'
              }}
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={exportToPDF}
                  disabled={loading}
                  className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${loading
                    ? 'bg-opacity-70 cursor-not-allowed'
                    : 'bg-white text-[#154E40] hover:bg-opacity-90 hover:shadow transform hover:scale-105'
                    }`}
                  style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-[#154E40] border-t-transparent rounded-full mr-2"></div>
                      <span>Generando...</span>
                    </>
                  ) : (
                    <>
                      <FaFilePdf className="mr-2" />
                      <span>Exportar a PDF</span>
                    </>
                  )}
                </button>
              </div>
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
                    className="text-3xl font-bold mb-2 text-center md:text-left uppercase-dynamic-data"
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
                      className="px-3 py-1 rounded-full text-sm flex items-center uppercase-dynamic-data"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)', fontFamily: 'Montserrat' }}
                    >
                      <FaMapMarkerAlt className="mr-1" />
                      {agricultor.distrito}, {agricultor.provincia}
                    </div>

                    {agricultor.tiene_practicas_sostenibles && (
                      <div
                        className="px-3 py-1 rounded-full text-sm flex items-center uppercase-dynamic-data"
                        style={{ backgroundColor: '#66C874', color: 'white', fontFamily: 'Montserrat' }}
                      >
                        <FaLeaf className="mr-1" />
                        Con prácticas sostenibles
                      </div>
                    )}

                    {agricultor.senasa === "SÍ" && (
                      <div
                        className="px-3 py-1 rounded-full text-sm flex items-center uppercase-dynamic-data"
                        style={{ backgroundColor: '#FFA92B', color: 'white', fontFamily: 'Montserrat' }}
                      >
                        <FaCertificate className="mr-1" />
                        Certificado SENASA
                      </div>
                    )}
                    {[
                      agricultor.programa_plantas === "SÍ",
                      agricultor.inia_programa_peru_2m === "SÍ",
                      agricultor.senasa_escuela_campo === "SÍ"
                    ].filter(Boolean).length > 0 && (
                        <div
                          className="px-3 py-1 rounded-full text-sm flex items-center uppercase-dynamic-data"
                          style={{ backgroundColor: '#2DB292', color: 'white', fontFamily: 'Montserrat' }}
                        >
                          <FaGraduationCap className="mr-1" />
                          {[
                            agricultor.programa_plantas === "SÍ",
                            agricultor.inia_programa_peru_2m === "SÍ",
                            agricultor.senasa_escuela_campo === "SÍ"
                          ].filter(Boolean).length} Capacitaciones
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
                      className="font-medium uppercase-dynamic-data"
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
                      className="font-medium uppercase-dynamic-data"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {agricultor.apellidos}
                    </p>
                  </div>

                  {agricultor.edad && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Edad
                      </p>
                      <p
                        className="font-medium uppercase-dynamic-data"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.edad}
                      </p>
                    </div>
                  )}
                  {agricultor.nombre_empresa_organizacion && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Empresa u Organización
                      </p>
                      <p
                        className="font-medium uppercase-dynamic-data"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.nombre_empresa_organizacion}
                      </p>
                    </div>
                  )}
                  {agricultor.tamaño_empresa && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Tamaño de Empresa
                      </p>
                      <p
                        className="font-medium uppercase-dynamic-data"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.tamaño_empresa}
                      </p>
                    </div>
                  )}

                  {agricultor.sector && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Sector
                      </p>
                      <p
                        className="font-medium uppercase-dynamic-data"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.sector}
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
                        className="font-medium uppercase-dynamic-data"
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
                      País
                    </p>
                    <p
                      className="font-medium uppercase-dynamic-data"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      {agricultor.pais || 'PERÚ'}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-sm text-gray-500 mb-1"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      Departamento
                    </p>
                    <p
                      className="font-medium uppercase-dynamic-data"
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
                      className="font-medium uppercase-dynamic-data"
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
                      className="font-medium uppercase-dynamic-data"
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
                        className="font-medium uppercase-dynamic-data"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.centro_poblado}
                      </p>
                    </div>
                  )}
                  {agricultor.coordenadas && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Coordenadas
                      </p>
                      <div className="flex items-center">
                        <FaMapPin className="text-[#2DB292] mr-2" />
                        <p
                          className="font-medium uppercase-dynamic-data"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          {agricultor.coordenadas}
                        </p>
                      </div>
                    </div>
                  )}

                  {agricultor.ubicacion_maps && (
                    <div>
                      <p
                        className="text-sm text-gray-500 mb-1"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Ver en Google Maps
                      </p>
                      <a
                        href={agricultor.ubicacion_maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#2DB292] hover:text-[#154E40] transition-colors"
                        style={{ fontFamily: 'Montserrat', fontWeight: 500 }}
                      >
                        <FaLink className="mr-2" />
                        Abrir ubicación
                      </a>
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
                        className="font-medium uppercase-dynamic-data"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        {agricultor.ubicacion_completa}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2
                    className="text-xl font-bold flex items-center"
                    style={{ fontFamily: 'Omegle', color: '#154E40' }}
                  >
                    <FaGraduationCap className="mr-2 text-[#2DB292]" />
                    Capacitaciones
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-5">
                    {/* Programa PLANTAS */}
                    <div className="flex items-start">
                      <div
                        className={`w-8 h-8 rounded-full mt-1 mr-4 flex items-center justify-center ${agricultor.programa_plantas === "SÍ" ? 'bg-[#2DB292]' : 'bg-gray-200'}`}
                      >
                        {agricultor.programa_plantas === "SÍ" ? (
                          <FaGraduationCap className="text-white" />
                        ) : (
                          <FaGraduationCap className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${agricultor.programa_plantas === "SÍ" ? 'text-[#154E40]' : 'text-gray-500'} uppercase-dynamic-data`}
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          Programa PLANTAS
                        </p>
                        <p
                          className="text-sm text-gray-600 mt-1"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          Capacitación enfocada en prácticas sostenibles y transición agroecológica
                        </p>
                        <div
                          className={`mt-2 inline-block px-3 py-1 rounded-full text-xs ${agricultor.programa_plantas === "SÍ" ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          {agricultor.programa_plantas === "SÍ" ? 'Completada' : 'No realizada'}
                        </div>
                      </div>
                    </div>

                    {/* INIA Programa Perú 2M */}
                    <div className="flex items-start pt-4 border-t border-gray-100">
                      <div
                        className={`w-8 h-8 rounded-full mt-1 mr-4 flex items-center justify-center ${agricultor.inia_programa_peru_2m === "SÍ" ? 'bg-[#FFA92B]' : 'bg-gray-200'}`}
                      >
                        {agricultor.inia_programa_peru_2m === "SÍ" ? (
                          <FaGraduationCap className="text-white" />
                        ) : (
                          <FaGraduationCap className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${agricultor.inia_programa_peru_2m === "SÍ" ? 'text-[#154E40]' : 'text-gray-500'} uppercase-dynamic-data`}
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          INIA Programa Perú 2M
                        </p>
                        <p
                          className="text-sm text-gray-600 mt-1"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          Capacitación en mejoramiento de semillas y técnicas agrícolas avanzadas
                        </p>
                        <div
                          className={`mt-2 inline-block px-3 py-1 rounded-full text-xs ${agricultor.inia_programa_peru_2m === "SÍ" ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'}`}
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          {agricultor.inia_programa_peru_2m === "SÍ" ? 'Completada' : 'No realizada'}
                        </div>
                      </div>
                    </div>

                    {/* SENASA Escuela de Campo */}
                    <div className="flex items-start pt-4 border-t border-gray-100">
                      <div
                        className={`w-8 h-8 rounded-full mt-1 mr-4 flex items-center justify-center ${agricultor.senasa_escuela_campo === "SÍ" ? 'bg-[#66C874]' : 'bg-gray-200'}`}
                      >
                        {agricultor.senasa_escuela_campo === "SÍ" ? (
                          <FaGraduationCap className="text-white" />
                        ) : (
                          <FaGraduationCap className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${agricultor.senasa_escuela_campo === "SÍ" ? 'text-[#154E40]' : 'text-gray-500'} uppercase-dynamic-data`}
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          SENASA Escuela de Campo
                        </p>
                        <p
                          className="text-sm text-gray-600 mt-1"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          Formación en manejo integrado de plagas y buenas prácticas sanitarias agrícolas
                        </p>
                        <div
                          className={`mt-2 inline-block px-3 py-1 rounded-full text-xs ${agricultor.senasa_escuela_campo === "SÍ" ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'}`}
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          {agricultor.senasa_escuela_campo === "SÍ" ? 'Completada' : 'No realizada'}
                        </div>
                      </div>
                    </div>

                    {/* Resumen de capacitaciones */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div>
                          <p
                            className="font-medium text-[#154E40]"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            Nivel de capacitación
                          </p>
                          <p
                            className="text-sm text-gray-500 mt-1"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {(() => {
                              const capacitaciones = [
                                agricultor.programa_plantas === "SÍ",
                                agricultor.inia_programa_peru_2m === "SÍ",
                                agricultor.senasa_escuela_campo === "SÍ"
                              ].filter(Boolean).length;

                              if (capacitaciones === 0) return 'Sin capacitaciones';
                              if (capacitaciones === 1) return 'Nivel básico';
                              if (capacitaciones === 2) return 'Nivel intermedio';
                              return 'Nivel avanzado';
                            })()}
                          </p>
                        </div>
                        <div
                          className="mt-3 sm:mt-0 bg-gray-100 px-4 py-2 rounded-lg flex items-center"
                          style={{ fontFamily: 'Montserrat' }}
                        >
                          <div className="flex items-center gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-8 rounded-sm ${i < [
                                  agricultor.programa_plantas === "SÍ",
                                  agricultor.inia_programa_peru_2m === "SÍ",
                                  agricultor.senasa_escuela_campo === "SÍ"
                                ].filter(Boolean).length
                                  ? 'bg-[#2DB292]'
                                  : 'bg-gray-300'}`}
                              ></div>
                            ))}
                          </div>
                          <span className="ml-3 font-medium">
                            {[
                              agricultor.programa_plantas === "SÍ",
                              agricultor.inia_programa_peru_2m === "SÍ",
                              agricultor.senasa_escuela_campo === "SÍ"
                            ].filter(Boolean).length}/3
                          </span>
                        </div>
                      </div>
                    </div>

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
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }} className='uppercase-dynamic-data' >Espárrago</p>
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
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }} className='uppercase-dynamic-data'>Granada</p>
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
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }} className='uppercase-dynamic-data'>Maíz</p>
                          </div>
                        )}

                        {agricultor.palta === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/palta.jpg" alt="Palta" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }} className='uppercase-dynamic-data'>Palta</p>
                          </div>
                        )}

                        {agricultor.papa === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/papa.jpg" alt="Papa" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }} className='uppercase-dynamic-data'>Papa</p>
                          </div>
                        )}

                        {agricultor.pecano === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/pecano.png" alt="Pecano" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }} className='uppercase-dynamic-data'>Pecano</p>
                          </div>
                        )}

                        {agricultor.vid === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/vid.png" alt="Vid" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }} className='uppercase-dynamic-data'>Vid</p>
                          </div>
                        )}
                        {agricultor.castaña === "SÍ" && (
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0F9F6' }}>
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#daf1ea' }}>
                              <img src="/images/cultivos/castaña.jpg" alt="Castaña" className="w-full h-full object-cover" />
                            </div>
                            <p style={{ fontFamily: 'Montserrat', fontWeight: 600, color: '#154E40' }} className='uppercase-dynamic-data'>Castaña</p>
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
                              className="font-medium flex items-center uppercase-dynamic-data"
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
                              className="font-medium flex items-center uppercase-dynamic-data"
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
                              className="font-medium uppercase-dynamic-data"
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
                              className="font-medium uppercase-dynamic-data"
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
                            className="font-medium uppercase-dynamic-data"
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
                            className="font-medium uppercase-dynamic-data"
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
                            className="font-medium uppercase-dynamic-data"
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
                            className="font-medium uppercase-dynamic-data"
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
                            className="text-lg font-semibold mb-1 uppercase-dynamic-data"
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
                            className="mb-4 uppercase-dynamic-data"
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
                <div className="p-6 space-y-6">
                  {/* Bloque de SENASA */}
                  <div className={`rounded-lg border p-4 ${agricultor.senasa === "SÍ" ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${agricultor.senasa === "SÍ" ? 'bg-[#2DB292]' : 'bg-gray-300'}`}
                      >
                        {agricultor.senasa === "SÍ" && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <h3
                        className={`text-lg font-medium ${agricultor.senasa === "SÍ" ? 'text-[#154E40]' : 'text-gray-500'}`}
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Certificación SENASA
                      </h3>
                    </div>

                    {agricultor.senasa === "SÍ" ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {agricultor.cod_lugar_prod && (
                            <div>
                              <p
                                className="text-sm text-gray-600 mb-1"
                                style={{ fontFamily: 'Montserrat' }}
                              >
                                Código lugar de producción
                              </p>
                              <p
                                className="font-medium uppercase-dynamic-data"
                                style={{ fontFamily: 'Montserrat' }}
                              >
                                {agricultor.cod_lugar_prod}
                              </p>
                            </div>
                          )}

                          {agricultor.area_solicitada !== null && (
                            <div>
                              <p
                                className="text-sm text-gray-600 mb-1"
                                style={{ fontFamily: 'Montserrat' }}
                              >
                                Área solicitada
                              </p>
                              <p
                                className="font-medium uppercase-dynamic-data"
                                style={{ fontFamily: 'Montserrat' }}
                              >
                                {agricultor.area_solicitada} ha
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Más información sobre SENASA */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 mt-3 border-t border-green-200">
                          <p
                            className="text-sm text-gray-600 mb-2 sm:mb-0"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            Ver información oficial de su certificación:
                          </p>
                          <a
                            href={`https://servicios.senasa.gob.pe/inspeccionweb/faces/consultaMTDP.xhtml`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-4 py-2 bg-[#2DB292] text-white rounded-md hover:bg-[#154E40] transition-colors"
                            style={{ fontFamily: 'Montserrat', fontWeight: 500 }}
                          >
                            <FaLink className="mr-2" />
                            Consultar en SENASA
                          </a>
                        </div>
                        <div className="bg-white rounded border border-green-100 p-3 text-sm text-gray-600"
                          style={{ fontFamily: 'Montserrat' }}>
                          <p className="mb-1">
                            <strong>Nota:</strong> En el portal SENASA, use el código <strong>{agricultor.cod_lugar_prod}</strong> para consultar su información.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p
                        className="text-gray-500 text-sm"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Este agricultor no cuenta con certificación SENASA.
                      </p>
                    )}
                  </div>
                  {/* Bloque de SISPA */}
                  <div className={`rounded-lg border p-4 ${agricultor.sispa === "SÍ" ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${agricultor.sispa === "SÍ" ? 'bg-[#2DB292]' : 'bg-gray-300'}`}
                      >
                        {agricultor.sispa === "SÍ" && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <h3
                        className={`text-lg font-medium ${agricultor.sispa === "SÍ" ? 'text-[#154E40]' : 'text-gray-500'}`}
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Registro SISPA
                      </h3>
                    </div>
                    {agricultor.sispa === "SÍ" ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {agricultor.codigo_autogene_sispa && (
                            <div>
                              <p
                                className="text-sm text-gray-600 mb-1"
                                style={{ fontFamily: 'Montserrat' }}
                              >
                                Código SISPA
                              </p>
                              <p
                                className="font-medium uppercase-dynamic-data"
                                style={{ fontFamily: 'Montserrat' }}
                              >
                                {agricultor.codigo_autogene_sispa}
                              </p>
                            </div>
                          )}

                          {agricultor.regimen_tenencia_sispa && (
                            <div>
                              <p
                                className="text-sm text-gray-600 mb-1"
                                style={{ fontFamily: 'Montserrat' }}
                              >
                                Régimen de tenencia
                              </p>
                              <p
                                className="font-medium uppercase-dynamic-data"
                                style={{ fontFamily: 'Montserrat' }}
                              >
                                {agricultor.regimen_tenencia_sispa}
                              </p>
                            </div>
                          )}
                        </div>

                        {agricultor.fecha_actualizacion_sispa && (
                          <div>
                            <p
                              className="text-sm text-gray-600 mb-1"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              Última actualización
                            </p>
                            <p
                              className="font-medium uppercase-dynamic-data"
                              style={{ fontFamily: 'Montserrat' }}
                            >
                              {agricultor.fecha_actualizacion_sispa}
                            </p>
                          </div>
                        )}

                        {/* Más información sobre SISPA */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 mt-3 border-t border-blue-200">
                          <p
                            className="text-sm text-gray-600 mb-2 sm:mb-0"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            Ver información oficial de su registro:
                          </p>
                          <a
                            href={`https://consultapadron.midagri.gob.pe/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-4 py-2 bg-[#2DB292] text-white rounded-md hover:bg-[#154E40] transition-colors"
                            style={{ fontFamily: 'Montserrat', fontWeight: 500 }}
                          >
                            <FaLink className="mr-2" />
                            Consultar en SISPA
                          </a>
                        </div>
                        <div className="bg-white rounded border border-blue-100 p-3 text-sm text-gray-600"
                          style={{ fontFamily: 'Montserrat' }}>
                          <p className="mb-1">
                            <strong>Nota:</strong> En el portal SISPA, use el código <strong>{agricultor.codigo_autogene_sispa}</strong> para consultar su información.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p
                        className="text-gray-500 text-sm"
                        style={{ fontFamily: 'Montserrat' }}
                      >
                        Este agricultor no está registrado en SISPA.
                      </p>
                    )}
                  </div>
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
      </div>
    </Layout>
  );
}