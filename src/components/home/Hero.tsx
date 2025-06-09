'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasFullyRevealed, setHasFullyRevealed] = useState(false);
  
  useEffect(() => {
    // Función para calcular el progreso del scroll
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Calculamos el progreso del scroll (0 a 1)
      const progress = Math.min(scrollY / (windowHeight * 0.8), 1);
      setScrollProgress(progress);
      
      // Verificamos si todos los elementos se han revelado
      if (progress >= 1 && !hasFullyRevealed) {
        setHasFullyRevealed(true);
      } else if (progress < 1 && hasFullyRevealed) {
        setHasFullyRevealed(false);
      }
    };

    // Intentar reproducir el video cuando el componente se monte
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error reproduciendo el video:', error);
        });
      }
    }

    // Registramos el event listener para el scroll
    window.addEventListener('scroll', handleScroll);
    
    // Limpieza
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasFullyRevealed]);

  // Calculamos la opacidad para cada elemento según el progreso del scroll
  const titleOpacity = Math.min(scrollProgress * 3, 1);
  const subtitleOpacity = Math.max(0, Math.min((scrollProgress - 0.1) * 3, 1));
  const descriptionOpacity = Math.max(0, Math.min((scrollProgress - 0.2) * 3, 1));
  const buttonsOpacity = Math.max(0, Math.min((scrollProgress - 0.3) * 3, 1));
  
  // Calculamos la transformación para cada elemento
  const titleTransform = `translateY(${(1 - titleOpacity) * 50}px)`;
  const subtitleTransform = `translateY(${(1 - subtitleOpacity) * 50}px)`;
  const descriptionTransform = `translateY(${(1 - descriptionOpacity) * 50}px)`;
  const buttonsTransform = `translateY(${(1 - buttonsOpacity) * 50}px)`;

  // Calculamos la opacidad del overlay según el scroll
  const overlayOpacity = Math.min(0.1 + scrollProgress * 0.5, 0.7);

  return (
    <div 
      ref={sectionRef}
      style={{
        height: '200vh', // Hacemos la sección más alta para controlar el scroll
      }}
      
    >
      {/* Video y contenido fijo mientras se revelan los elementos */}
      <div 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden"
        style={{
          zIndex: hasFullyRevealed ? -1 : 0, // Cambiamos el z-index cuando se complete la revelación
        }}
      >
        {/* Video a pantalla completa */}
        <div className="absolute top-0 left-0 w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/dos.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          
          {/* Overlay que se oscurece al hacer scroll */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </div>

        {/* Contenedor para el contenido */}
        <div 
          ref={contentRef}
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center"
        >
          {/* Título con animación */}
          <h1 
            className="text-5xl md:text-6xl mb-4"
            style={{ 
              opacity: titleOpacity, 
              transform: titleTransform,
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out', 
              color: '#ECEBEB',
              fontFamily: 'Omegle'
            }}
          >
            Proyecto PLANTAS
          </h1>
          
          {/* Subtítulo con animación */}
          <h2 
            className="text-3xl md:text-4xl font-semibold text-white mb-6"
            style={{ 
              opacity: subtitleOpacity, 
              transform: subtitleTransform,
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
              fontFamily: 'Montserrat'
            }}
          >
            Palanca para la Transición Agrosostenible
          </h2>
          
          {/* Descripción con animación */}
          <p 
            className="text-lg md:text-xl text-white max-w-3xl mb-10"
            style={{ 
              opacity: descriptionOpacity, 
              transform: descriptionTransform,
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
              fontFamily: 'Montserrat'
            }}
          >
            Trabajamos para impulsar prácticas agrícolas sostenibles y sistemas de trazabilidad
            que mejoren la competitividad y sostenibilidad de MiPYMEs, cooperativas y asociaciones
            agrarias del Perú.
          </p>
          
          {/* Botones con animación */}
          <div 
            className="flex flex-col sm:flex-row gap-6"
            style={{ 
              opacity: buttonsOpacity, 
              transform: buttonsTransform,
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            }}
          >
            <Link 
              href="/trazabilidad" 
              className="px-8 py-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors transform hover:scale-105 duration-200 shadow-lg"
              style={{ fontFamily: 'Montserrat', color: '#000000' }}
            >
              Consulta de Trazabilidad
            </Link>
          </div>

          {/* Indicador de scroll - visible solo al inicio */}
          <div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            style={{ 
              opacity: 1 - scrollProgress * 3,
              transition: 'opacity 0.3s ease-out'
            }}
          >
            <div className="flex flex-col items-center text-white">
              <p className="mb-2 text-sm">Scroll para descubrir</p>
              <svg 
                className="w-6 h-6 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      

      <div style={{ height: '100vh' }}></div>
    </div>
  );
};

export default Hero;