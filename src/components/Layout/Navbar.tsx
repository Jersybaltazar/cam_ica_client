'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();

  // Control de la visibilidad basado en hover en la zona superior
  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Solo ocultamos si el menú móvil no está abierto
    if (!isOpen) {
      setTimeout(() => {
        if (!isHovering) {
          setIsVisible(false);
        }
      }, 1000); // Pequeño retraso para evitar que desaparezca si el usuario mueve el mouse brevemente fuera
    }
  };

  // Cerrar el menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Si el menú móvil está abierto, siempre mostrar la barra
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else if (!isHovering) {
      setTimeout(() => {
        if (!isHovering && !isOpen) {
          setIsVisible(false);
        }
      }, 1000);
    }
  }, [isOpen, isHovering]);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-full h-8 z-40"
        onMouseEnter={handleMouseEnter}
      />

      <header 
        className={`fixed w-full bg-white shadow-md z-30 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.jpg"
                alt="Proyecto PLANTAS"
                width={200}
                height={200}
                className="mr-3"
              />
            </Link>
            
            {/* Menú de escritorio con efecto de línea superior al hover */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/acerca-de" 
                className={`text-sm font-medium transition relative group ${
                  pathname === '/acerca-de' ? 'text-[#154E40]' : 'text-gray-700'
                }`}
              >
                {/* Línea superior que se muestra al hover */}
                <span className="absolute -top-1 left-0 w-0 h-0.5 bg-[#154E40] transition-all duration-300 group-hover:w-full"></span>
                
                {/* Línea inferior para la ruta activa */}
                {pathname === '/acerca-de' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#154E40]"></span>
                )}
                
                Acerca del Proyecto
              </Link>
              
              <Link 
                href="/trazabilidad" 
                className={`text-sm font-medium transition relative group ${
                  pathname.includes('/trazabilidad') ? 'text-[#154E40]' : 'text-gray-700'
                }`}
              >
                {/* Línea superior que se muestra al hover */}
                <span className="absolute -top-1 left-0 w-0 h-0.5 bg-[#154E40] transition-all duration-300 group-hover:w-full"></span>
                
                {/* Línea inferior para la ruta activa */}
                {pathname.includes('/trazabilidad') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#154E40]"></span>
                )}
                
                Consulta de Trazabilidad
              </Link>
            </nav>
            
            {/* Botón de menú móvil */}
            <button 
              className="md:hidden text-gray-700 focus:outline-none" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menú móvil con efectos mejorados */}
        <div 
          className={`md:hidden bg-white transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-80 opacity-100 py-4' : 'max-h-0 opacity-0 py-0 overflow-hidden'
          }`}
        >
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              href="/" 
              className={`text-sm font-medium transition relative p-2 rounded-md ${
                pathname === '/' 
                  ? 'text-[#154E40] bg-green-50 border-l-4 border-[#154E40]' 
                  : 'text-gray-700 hover:bg-gray-50 hover:border-l-4 hover:border-[#2DB292]'
              }`}
            >
              Inicio
            </Link>
            
            <Link 
              href="/acerca-de" 
              className={`text-sm font-medium transition relative p-2 rounded-md ${
                pathname === '/acerca-de' 
                  ? 'text-[#154E40] bg-green-50 border-l-4 border-[#154E40]' 
                  : 'text-gray-700 hover:bg-gray-50 hover:border-l-4 hover:border-[#2DB292]'
              }`}
            >
              Acerca del Proyecto
            </Link>
            
            <Link 
              href="/trazabilidad" 
              className={`text-sm font-medium transition relative p-2 rounded-md ${
                pathname.includes('/trazabilidad') 
                  ? 'text-[#154E40] bg-green-50 border-l-4 border-[#154E40]' 
                  : 'text-gray-700 hover:bg-gray-50 hover:border-l-4 hover:border-[#2DB292]'
              }`}
            >
              Consulta de Trazabilidad
            </Link>
            
            <Link 
              href="/recursos" 
              className={`text-sm font-medium transition relative p-2 rounded-md ${
                pathname === '/recursos' 
                  ? 'text-[#154E40] bg-green-50 border-l-4 border-[#154E40]' 
                  : 'text-gray-700 hover:bg-gray-50 hover:border-l-4 hover:border-[#2DB292]'
              }`}
            >
              Recursos
            </Link>
            
            <Link 
              href="/contacto" 
              className={`text-sm font-medium transition relative p-2 rounded-md ${
                pathname === '/contacto' 
                  ? 'text-[#154E40] bg-green-50 border-l-4 border-[#154E40]' 
                  : 'text-gray-700 hover:bg-gray-50 hover:border-l-4 hover:border-[#2DB292]'
              }`}
            >
              Contacto
            </Link>
          </nav>
        </div>
      </header>

      {/* Espacio para evitar que el contenido quede debajo del header cuando está visible */}
      <div className={`h-0 transition-all duration-300 ${isVisible ? 'md:h-20' : 'h-0'}`} />
    </>
  );
};

export default Navbar;