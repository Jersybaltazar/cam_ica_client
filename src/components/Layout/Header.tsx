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
      {/* Área de detección de hover en la parte superior */}
      <div 
        className="fixed top-0 left-0 w-full h-8 z-40"
        onMouseEnter={handleMouseEnter}
      />

      {/* Header principal con animación */}
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
                src="/images/logo.png"
                alt="Proyecto PLANTAS"
                width={50}
                height={50}
                className="mr-3"
              />
              <div>
                <h1 className="text-xl font-bold text-green-800">PLANTAS</h1>
                <p className="text-xs text-gray-600">Palanca para la Transición Agrosostenible</p>
              </div>
            </Link>
            
            {/* Menú de escritorio */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/" 
                className={`text-sm font-medium transition hover:text-green-600 ${
                  pathname === '/' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700'
                }`}
              >
                Inicio
              </Link>
              <Link 
                href="/acerca-de" 
                className={`text-sm font-medium transition hover:text-green-600 ${
                  pathname === '/acerca-de' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700'
                }`}
              >
                Acerca de
              </Link>
              <Link 
                href="/trazabilidad" 
                className={`text-sm font-medium transition hover:text-green-600 ${
                  pathname.includes('/trazabilidad') ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700'
                }`}
              >
                Trazabilidad
              </Link>
              <Link 
                href="/recursos" 
                className={`text-sm font-medium transition hover:text-green-600 ${
                  pathname === '/recursos' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700'
                }`}
              >
                Recursos
              </Link>
              <Link 
                href="/contacto" 
                className={`text-sm font-medium transition hover:text-green-600 ${
                  pathname === '/contacto' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-700'
                }`}
              >
                Contacto
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
        
        {/* Menú móvil */}
        <div 
          className={`md:hidden bg-white transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-80 opacity-100 py-4' : 'max-h-0 opacity-0 py-0 overflow-hidden'
          }`}
        >
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              href="/" 
              className={`text-sm font-medium transition p-2 ${
                pathname === '/' ? 'text-green-600 bg-green-50 rounded-md' : 'text-gray-700 hover:bg-gray-50 rounded-md'
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="/acerca-de" 
              className={`text-sm font-medium transition p-2 ${
                pathname === '/acerca-de' ? 'text-green-600 bg-green-50 rounded-md' : 'text-gray-700 hover:bg-gray-50 rounded-md'
              }`}
            >
              Acerca de
            </Link>
            <Link 
              href="/trazabilidad" 
              className={`text-sm font-medium transition p-2 ${
                pathname.includes('/trazabilidad') ? 'text-green-600 bg-green-50 rounded-md' : 'text-gray-700 hover:bg-gray-50 rounded-md'
              }`}
            >
              Trazabilidad
            </Link>
            <Link 
              href="/recursos" 
              className={`text-sm font-medium transition p-2 ${
                pathname === '/recursos' ? 'text-green-600 bg-green-50 rounded-md' : 'text-gray-700 hover:bg-gray-50 rounded-md'
              }`}
            >
              Recursos
            </Link>
            <Link 
              href="/contacto" 
              className={`text-sm font-medium transition p-2 ${
                pathname === '/contacto' ? 'text-green-600 bg-green-50 rounded-md' : 'text-gray-700 hover:bg-gray-50 rounded-md'
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