'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Definir la interfaz para los props del carrusel
interface Partner {
    id: number;
    name: string;
    logo: string;
    alt: string;
}

// Lista de socios/marcas asociadas (reemplaza esto con tus marcas reales)
const partners: Partner[] = [
    { id: 1, name: 'Ministerio de Desarrollo Agrario', logo: '/images/aliados/1.jpg', alt: 'Ministerio de Desarrollo Agrario' },
    { id: 2, name: 'SENASA', logo: '/images/aliados/2.png', alt: 'SENASA' },
    { id: 3, name: 'AGRORURAL', logo: '/images/aliados/3.jpg', alt: 'AGRORURAL' },
    { id: 4, name: 'INIA', logo: '/images/aliados/4.png', alt: 'INIA' },
    { id: 5, name: 'MINAGRI', logo: '/images/aliados/5.png', alt: 'MINAGRI' },
    { id: 6, name: 'FAO', logo: '/images/aliados/6.png', alt: 'FAO' },
    { id: 7, name: 'PNUD', logo: '/images/aliados/10.png', alt: 'PNUD' },
    { id: 8, name: 'CONCYTEC', logo: '/images/aliados/11.png', alt: 'CONCYTEC' },
    { id: 9, name: 'Universidad Nacional Agraria La Molina', logo: '/images/aliados/12.png', alt: 'UNALM' },
    { id: 10, name: 'Universidad San Ignacio de Loyola', logo: '/images/aliados/13.jpeg', alt: 'USIL' },
    { id: 11, name: 'Cámara de Comercio', logo: '/images/aliados/14.png', alt: 'Cámara de Comercio' },
    { id: 12, name: 'ProIca', logo: '/images/aliados/15.png', alt: 'ProIca' },
    { id: 13, name: 'ProIca', logo: '/images/aliados/16.gif', alt: 'ProIca' },
    { id: 14, name: 'ProIca', logo: '/images/aliados/17.png', alt: 'ProIca' },
    { id: 15, name: 'ProIca', logo: '/images/aliados/18.png', alt: 'ProIca' },
    { id: 16, name: 'ProIca', logo: '/images/aliados/19.png', alt: 'ProIca' },
    { id: 17, name: 'ProIca', logo: '/images/aliados/20.png', alt: 'ProIca' },
    { id: 18, name: 'ProIca', logo: '/images/aliados/21.png', alt: 'ProIca' },
];

const PartnersCarousel: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Duplicar los elementos para crear un loop infinito
    const allPartners = [...partners, ...partners];

    useEffect(() => {
        if (!carouselRef.current || isHovered) return;

        // Animación del carrusel
        const animate = () => {
            const carousel = carouselRef.current;
            if (!carousel) return;

            // Si el primer conjunto de logos ha pasado completamente, reiniciar la posición
            if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                carousel.scrollLeft = 0;
            } else {
                // Mover el carrusel lentamente
                carousel.scrollLeft += 1;
                }
            };

        // Ejecutar la animación cada 30ms para un movimiento suave
        const animation = setInterval(animate, 10);

        return () => clearInterval(animation);
    }, [isHovered]);

    return (
        <div className="w-full bg-white py-16">
            <div className="container mx-auto px-4">
                {/* Contenedor del carrusel */}
                <div className="relative overflow-hidden">
                    {/* Sombra izquierda */}
                    <div className="absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-white to-transparent"></div>

                    {/* Carrusel */}
                    <div
                        ref={carouselRef}
                        className="flex items-center overflow-x-scroll no-scrollbar"
                        style={{ scrollBehavior: 'smooth' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {allPartners.map((partner, index) => (
                            <div
                                key={`${partner.id}-${index}`}
                                className="flex-shrink-0 mx-8 py-4"
                                style={{ width: '160px' }}
                            >
                                <div className="h-16 flex items-center justify-center">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.alt}
                                        width={120}
                                        height={60}
                                        className="h-auto max-h-16 w-auto max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        priority={index < 6}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sombra derecha */}
                    <div className="absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-white to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default PartnersCarousel;