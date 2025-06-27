"use client";
import React from 'react';
import Link from 'next/link';
import { FaLeaf, FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#154E40' }} className="text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Sección principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Información del proyecto */}
          <div>
            <div className="flex items-center mb-6">
              <FaLeaf className="text-[#66C874] text-2xl mr-2" />
              <h3 
                className="text-2xl" 
                style={{ fontFamily: 'Omegle' }}
              >
                Proyecto PLANTAS
              </h3>
            </div>
            <p 
              className="text-gray-200 mb-6"
              style={{ fontFamily: 'Montserrat' }}
            >
              Palanca para la Transición Agrosostenible, forma parte del AL-INVEST Verde,
              programa de la Unión Europea (UE), mediante el cual buscamos generar valor
              enfocado en sistemas de trazabilidad y prácticas agrícolas sostenibles.
            </p>
            
            {/* Logos de colaboradores */}
          </div>
          
          {/* Columna 2: Enlaces rápidos */}
          <div className="lg:ml-8">
            <h4 
              className="text-xl mb-6" 
              style={{ fontFamily: 'Omegle', color: '#2DB292' }}
            >
              Enlaces de Interés
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center text-gray-200 hover:text-[#FFA92B] transition-colors"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66C874] mr-2"></span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="flex items-center text-gray-200 hover:text-[#FFA92B] transition-colors"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66C874] mr-2"></span>
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link 
                  href="/project" 
                  className="flex items-center text-gray-200 hover:text-[#FFA92B] transition-colors"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66C874] mr-2"></span>
                  El Proyecto
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="flex items-center text-gray-200 hover:text-[#FFA92B] transition-colors"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66C874] mr-2"></span>
                  Noticias
                </Link>
              </li>
              <li>
                <Link 
                  href="/trazabilidad" 
                  className="flex items-center text-gray-200 hover:text-[#FFA92B] transition-colors"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66C874] mr-2"></span>
                  Consulta de Trazabilidad
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="flex items-center text-gray-200 hover:text-[#FFA92B] transition-colors"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66C874] mr-2"></span>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Columna 3: Información de contacto */}
          <div>
            <h4 
              className="text-xl mb-6" 
              style={{ fontFamily: 'Omegle', color: '#2DB292' }}
            >
              Contacto
            </h4>
            <address 
              className="not-italic space-y-4"
              style={{ fontFamily: 'Montserrat' }}
            >
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-[#FFA92B] mt-1 mr-3" />
                <p className="text-gray-200">
                  Cámara de Comercio, Industria y Turismo de Ica
                  <br />Av. Grau 634, Ica, Perú
                </p>
              </div>
              
              <div className="flex items-center">
                <FaEnvelope className="text-[#FFA92B] mr-3" />
                <a 
                  href="mailto:info@proyecto-plantas.com" 
                  className="text-gray-200 hover:text-white"
                >
                  info@proyecto-plantas.com
                </a>
              </div>
              
              <div className="flex items-center">
                <FaPhone className="text-[#FFA92B] mr-3" />
                <a 
                  href="tel:+51123456789" 
                  className="text-gray-200 hover:text-white"
                >
                  +51 123 456 789
                </a>
              </div>
            </address>
          </div>
          
          {/* Columna 4: Redes sociales y boletín */}
          <div>
            <h4 
              className="text-xl mb-6" 
              style={{ fontFamily: 'Omegle', color: '#2DB292' }}
            >
              Síguenos
            </h4>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2DB292'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2DB292'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <FaTwitter />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2DB292'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <FaInstagram />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2DB292'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <FaLinkedin />
              </a>
            </div>
            
            <p 
              className="text-gray-200 mb-4"
              style={{ fontFamily: 'Montserrat' }}
            >
              Suscríbete a nuestro boletín para recibir actualizaciones sobre el proyecto.
            </p>
          
          </div>
        </div>
        
        {/* Línea decorativa con colores de la paleta */}
        <div className="mt-12 flex">
          <div className="w-1/4 h-1" style={{ backgroundColor: '#154E40' }}></div>
          <div className="w-1/4 h-1" style={{ backgroundColor: '#2DB292' }}></div>
          <div className="w-1/4 h-1" style={{ backgroundColor: '#66C874' }}></div>
          <div className="w-1/4 h-1" style={{ backgroundColor: '#FFA92B' }}></div>
        </div>
        
        {/* Disclaimer y copyright */}
        <div className="mt-8 pt-6 border-t border-green-700 text-sm text-gray-300">
          <p 
            className="mb-4 max-w-4xl mx-auto text-center"
            style={{ fontFamily: 'Montserrat' }}
          >
            "Esta publicación cuenta con el apoyo financiero de la Unión Europea,
            a través de sequa. Su contenido es responsabilidad exclusiva de la Cámara de Comercio, 
            Industria y Turismo de Ica y no refleja necesariamente las opiniones de la Unión Europea, 
            sequa o del consorcio responsable de la ejecución del programa AL-INVEST Verde"
          </p>
          <p 
            className="text-center"
            style={{ fontFamily: 'Montserrat' }}
          >
            © {new Date().getFullYear()} Proyecto PLANTAS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;