'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout/Layout';
import { FaUserCog, FaLock, FaTimes, FaSearch } from 'react-icons/fa';
import { agricultoresService } from '../../hooks/agricultoreshook';

export default function ConsultaTrazabilidadPage() {
  // Estados para el modal de admin
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Estados para la consulta de DNI
  const [dni, setDni] = useState('');
  const [consultLoading, setConsultLoading] = useState(false);
  const [consultError, setConsultError] = useState('');

  const router = useRouter();

  // Handlers
  const handleAdminClick = () => {
    setShowModal(true);
    setError('');
    setPassword('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (password === 'admin123') {
        router.push('/dashboard');
      } else {
        setError('Contraseña incorrecta. Intente nuevamente.');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dni.trim()) {
      setConsultError('Por favor ingrese un número de DNI');
      return;
    }

    setConsultLoading(true);
    setConsultError('');

    try {
      await agricultoresService.getAgricultorByDni(dni);
      router.push(`/trazabilidad/${dni}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setConsultError('No se encontró información para el DNI proporcionado');
      } else {
        setConsultError('Ocurrió un error al consultar la información. Intente nuevamente.');
      }
    } finally {
      setConsultLoading(false);
    }
  };

  return (
    <Layout title="Consulta de Trazabilidad - Proyecto PLANTAS">
      
      <div className="min-h-screen flex flex-col">
        {/* Banner con imagen de fondo ocupando toda la pantalla */}
        <div
          className="flex-grow flex flex-col justify-center items-center py-16 lg:py-8"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/images/banner-trazabilidad.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="container mx-auto px-4">
            {/* Sección central con título y contenido */}
            <div className="flex flex-col lg:flex-row items-center justify-center mt-10 lg:mt-0 gap-16">
              {/* Columna izquierda: Título y descripción */}
              <div className="w-full lg:w-5/12 text-center lg:text-left">
                <h1
                  className="text-4xl md:text-5xl font-bold mb-6 text-white"
                  style={{ fontFamily: 'Omegle' }}
                >
                  Consulta de<br />Trazabilidad
                </h1>

                <p
                  className="text-lg text-white mb-6"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  Acceda a la información de su participación en el proyecto PLANTAS
                  y verifique sus certificaciones de prácticas agrícolas sostenibles.
                </p>
                <div className="flex justify-center lg:justify-start mb-6">
                  <button
                    onClick={handleAdminClick}
                    className="inline-flex items-center px-4 py-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: 'rgba(236, 235, 235, 0.2)',
                      color: '#ECEBEB',
                      fontFamily: 'Montserrat',
                      border: '1px solid #ECEBEB'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(45, 178, 146, 0.7)';
                      e.currentTarget.style.borderColor = '#2DB292';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(236, 235, 235, 0.2)';
                      e.currentTarget.style.borderColor = '#ECEBEB';
                    }}
                  >
                    <FaUserCog className="mr-2" />
                    <span className="font-medium">Modo Admin</span>
                  </button>
                </div>
                {/* Línea decorativa con colores de la paleta */}
                <div className="flex lg:justify-start justify-center mb-6">
                  <div className="w-12 h-1" style={{ backgroundColor: '#154E40' }}></div>
                  <div className="w-12 h-1" style={{ backgroundColor: '#2DB292' }}></div>
                  <div className="w-12 h-1" style={{ backgroundColor: '#66C874' }}></div>
                  <div className="w-12 h-1" style={{ backgroundColor: '#FFA92B' }}></div>
                </div>
              </div>

              {/* Columna derecha: Formulario de consulta */}
              <div className="w-full lg:w-5/12">
                <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-xl" style={{ borderTop: '4px solid #2DB292' }}>
                  {/* Tarjeta de consulta */}
                  <div className="p-6" style={{ backgroundColor: '#ECEBEB' }}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#154E40' }}>
                        <FaSearch size={16} style={{ color: '#ECEBEB' }} />
                      </div>
                      <h3
                        className="text-xl font-bold"
                        style={{ fontFamily: 'Omegle', color: '#154E40' }}
                      >
                        Consultar por DNI
                      </h3>
                    </div>

                    <form onSubmit={handleConsult}>
                      <div className="mb-3">
                        <label
                          htmlFor="dni"
                          className="block text-sm font-medium mb-1"
                          style={{ fontFamily: 'Montserrat', color: '#333333' }}
                        >
                          Número de DNI
                        </label>
                        <input
                          type="text"
                          id="dni"
                          value={dni}
                          onChange={(e) => setDni(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white"
                          style={{
                            borderColor: '#2DB292',
                            fontFamily: 'Montserrat'
                          }}
                          placeholder="Ejemplo: 80005102"
                        />
                      </div>

                      {consultError && (
                        <div
                          className="mb-3 p-2 rounded-md text-sm bg-red-50 border-l-4"
                          style={{
                            borderLeftColor: '#e53e3e',
                            color: '#c81e1e',
                            fontFamily: 'Montserrat'
                          }}
                        >
                          {consultError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={consultLoading}
                        className="w-full py-2 rounded-md font-medium transition-colors flex items-center justify-center"
                        style={{
                          backgroundColor: consultLoading ? '#66C874' : '#154E40',
                          color: '#ECEBEB',
                          fontFamily: 'Montserrat'
                        }}
                        onMouseOver={(e) => !consultLoading && (e.currentTarget.style.backgroundColor = '#2DB292')}
                        onMouseOut={(e) => !consultLoading && (e.currentTarget.style.backgroundColor = '#154E40')}
                      >
                        {consultLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Consultando...
                          </>
                        ) : (
                          <>
                            <FaSearch className="mr-2" />
                            Consultar Trazabilidad
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Pie de la tarjeta */}
                  <div
                    className="py-3 px-6 flex justify-between items-center text-xs"
                    style={{
                      backgroundColor: '#154E40',
                      color: '#ECEBEB',
                      fontFamily: 'Montserrat'
                    }}
                  >
                    <span>Proyecto PLANTAS</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2DB292' }}></div>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#66C874' }}></div>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFA92B' }}></div>
                    </div>
                  </div>
                </div>

                {/* Nota informativa más compacta */}
                <p
                  className="text-center mt-3 text-xs max-w-md mx-auto"
                  style={{
                    fontFamily: 'Montserrat',
                    color: '#ECEBEB'
                  }}
                >
                  Si no encuentra su información, contacte al correo
                  <a
                    href="mailto:info@proyectoplanta.org"
                    className="ml-1 underline"
                    style={{ color: '#66C874' }}
                  >
                    info@proyectoplanta.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de administrador */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 relative"
            style={{ border: '1px solid #154E40' }}
          >
            {/* Botón de cerrar */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Cerrar"
            >
              <FaTimes size={20} />
            </button>

            {/* Título del modal */}
            <div className="text-center mb-6">
              <h3
                className="text-2xl font-bold"
                style={{ fontFamily: 'Omegle', color: '#154E40' }}
              >
                Acceso Administrativo
              </h3>
              <div className="mt-2 h-1 w-24 mx-auto" style={{ backgroundColor: '#2DB292' }}></div>
            </div>

            {/* Ícono */}
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#ECEBEB' }}
              >
                <FaLock size={36} style={{ color: '#154E40' }} />
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleLogin}>
              {error && (
                <div
                  className="mb-4 p-3 rounded text-sm text-red-700 bg-red-100 border border-red-200"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                  style={{ fontFamily: 'Montserrat', color: '#333333' }}
                >
                  Ingrese la contraseña de administrador:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                  style={{
                    borderColor: '#2DB292',
                    fontFamily: 'Montserrat'
                  }}
                  placeholder="Contraseña"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-md font-medium transition-colors flex items-center justify-center"
                style={{
                  backgroundColor: '#154E40',
                  color: '#ECEBEB',
                  fontFamily: 'Montserrat'
                }}
                onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2DB292')}
                onMouseOut={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#154E40')}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verificando...
                  </>
                ) : "Iniciar sesión"}
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}