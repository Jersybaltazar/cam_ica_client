"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ObjectivesSection = () => {
  // URLs de imágenes de ejemplo (puedes usar las tuyas)
  const objectives = [
    {
      id: 1,
      title: '#1:',
      description: 'Número de MiPYME del sector agrícola que adoptan prácticas económicas sostenibles.',
      image: '../images/logro1.jpg'
    },
    {
      id: 2,
      title: '#2:',
      description: 'Número de MiPYME del sector agrícola que obtienen certificación de normas de sostenibilidad específicas de empresa / desarrollan sistemas de trazabilidad que mejoran la sostenibilidad de sus productos.',
      image: '../images/logro2.jpg'
    },
    {
      id: 3,
      title: '#3:',
      description: 'Número de empleos verdes y/o digitales, equivalentes a tiempo completo mantenidos/creados como resultado directo de la ayuda.',
      image: '../images/logro3.jpg'
    },
    {
      id: 4,
      title: '#4:',
      description: 'Número de MiPYME del sector agrícola que declaran haber aumentado su volumen de negocio como resultado directo de la ayuda recibida.',
      image: '../images/logro4.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === objectives.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? objectives.length - 1 : prev - 1));
  };

  const textVariants = {
    hidden: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    })
  };

  const imageVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    })
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

   return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Título con la misma tipografía y color que AboutSection */}
        <h2 
          className="text-2xl md:text-3xl lg:text-4xl mb-16 text-center"
          style={{ fontFamily: 'Omegle', color: '#154E40' }}
        >
          ¿Qué hemos logrado?
        </h2>
        
        <div className="relative max-w-6xl mx-auto bg-white rounded-xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Columna izquierda - Imagen con backgroundImage */}
            <div className="w-full md:w-1/2 h-[400px] md:h-[500px] relative overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`image-${currentIndex}`}
                  custom={direction}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ 
                      backgroundImage: `url(${objectives[currentIndex].image})`,
                    }}
                  />
                  {/* Overlay muy sutil */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent"></div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Línea divisoria */}
            <div className="hidden md:block w-px bg-gray-200 h-full"></div>
            
            {/* Columna derecha - Texto */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`text-${currentIndex}`}
                  custom={direction}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible" 
                  exit="exit"
                  className="mb-8"
                >
                  {/* Título de logro con color de la paleta */}
                  <h3 
                    className="text-2xl md:text-3xl mb-4"
                    style={{ fontFamily: 'Omegle', color: '#2DB292' }}
                  >
                    {objectives[currentIndex].title}
                  </h3>
                  
                  {/* Descripción con Montserrat */}
                  <p 
                    className="text-lg md:text-xl leading-relaxed"
                    style={{ fontFamily: 'Montserrat', color: '#333333' }}
                  >
                    {objectives[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              {/* Línea horizontal con color de la paleta */}
              <div className="h-px w-full my-6" style={{ backgroundColor: '#ECEBEB' }}></div>
              
              {/* Controles de navegación con colores de la paleta */}
              <div className="flex justify-between items-center mt-auto">
                {/* Botón Atrás */}
                <button
                  onClick={goPrev}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus:outline-none"
                  style={{ 
                    backgroundColor: '#154E40', 
                    color: '#ECEBEB',
                    fontFamily: 'Montserrat'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2DB292'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#154E40'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Atrás</span>
                </button>
                
                {/* Indicadores de posición */}
                <div className="flex space-x-2">
                  {objectives.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors`}
                      style={{ 
                        backgroundColor: index === currentIndex ? '#2DB292' : '#ECEBEB',
                        border: index === currentIndex ? 'none' : '1px solid #66C874'
                      }}
                      aria-label={`Ir a logro ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Botón Siguiente */}
                <button
                  onClick={goNext}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors focus:outline-none"
                  style={{ 
                    backgroundColor: '#154E40', 
                    color: '#ECEBEB',
                    fontFamily: 'Montserrat'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2DB292'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#154E40'}
                >
                  <span className="text-sm font-medium">Siguiente</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;