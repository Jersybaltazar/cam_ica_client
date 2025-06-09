"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { agricultoresService } from '../../hooks/agricultoreshook';
import { FaSearch } from 'react-icons/fa';

const ConsultSection = () => {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dni.trim()) {
      setError('Por favor ingrese un número de DNI');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await agricultoresService.getAgricultorByDni(dni);
      // Si la consulta es exitosa, redireccionar a la página de trazabilidad
      router.push(`/trazabilidad/${dni}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setError('No se encontró información para el DNI proporcionado');
      } else {
        setError('Ocurrió un error al consultar la información. Intente nuevamente.');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg" style={{ borderTop: '4px solid #2DB292' }}>
          {/* Tarjeta de consulta con diseño consistente */}
          <div className="p-8" style={{ backgroundColor: '#ECEBEB' }}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#154E40' }}>
                <FaSearch size={20} style={{ color: '#ECEBEB' }} />
              </div>
              <h3 
                className="text-2xl font-bold"
                style={{ fontFamily: 'Omegle', color: '#154E40' }}
              >
                Consultar por DNI
              </h3>
            </div>
            
            <p 
              className="mb-6 text-gray-700"
              style={{ fontFamily: 'Montserrat' }}
            >
              Ingrese su número de DNI para acceder a su información de trazabilidad y certificaciones en el proyecto.
            </p>
            
            <form onSubmit={handleConsult}>
              <div className="mb-4">
                <label 
                  htmlFor="dni" 
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: 'Montserrat', color: '#333333' }}
                >
                  Número de DNI
                </label>
                <input
                  type="text"
                  id="dni"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 bg-white"
                  style={{ 
                    borderColor: '#2DB292',
                    fontFamily: 'Montserrat',
                    letterSpacing: '0.5px'
                  }}
                  placeholder="Ejemplo: 80005102"
                />
              </div>
              
              {error && (
                <div 
                  className="mb-4 p-3 rounded-md text-sm bg-red-50 border-l-4"
                  style={{ 
                    borderLeftColor: '#e53e3e', 
                    color: '#c81e1e',
                    fontFamily: 'Montserrat'
                  }}
                >
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md font-medium transition-all flex items-center justify-center"
                style={{ 
                  backgroundColor: loading ? '#66C874' : '#154E40',
                  color: '#ECEBEB',
                  fontFamily: 'Montserrat'
                }}
                onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2DB292')}
                onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#154E40')}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            className="py-4 px-8 flex justify-between items-center text-sm"
            style={{ 
              backgroundColor: '#154E40', 
              color: '#ECEBEB',
              fontFamily: 'Montserrat'
            }}
          >
            <span>Proyecto PLANTAS</span>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2DB292' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#66C874' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFA92B' }}></div>
            </div>
          </div>
        </div>
        
        {/* Nota informativa */}
        <p 
          className="text-center mt-6 text-sm max-w-md mx-auto"
          style={{ 
            fontFamily: 'Montserrat',
            color: '#666666' 
          }}
        >
          Si no encuentra su información o tiene alguna consulta, por favor contacte con el
          equipo del proyecto PLANTAS al correo 
          <a 
            href="mailto:info@proyectoplanta.org" 
            className="ml-1 underline"
            style={{ color: '#2DB292' }}
          >
            info@proyectoplanta.org
          </a>
        </p>
      </div>
    </section>
  );
}

export default ConsultSection;