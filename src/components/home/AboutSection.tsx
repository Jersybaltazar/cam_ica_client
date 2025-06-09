import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: 'Omegle', color: '#154E40' }}
            className="text-3xl  mb-6">¿Qué es el proyecto PLANTAS?</h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: 'Montserrat',
              color: '#333333'  // Color oscuro para el texto principal
            }}
          >
            El proyecto <span style={{ color: '#154E40', fontWeight: 600 }}>PLANTAS: Palanca para la Transición Agrosostenible</span>,
            forma parte del AL-INVEST Verde, programa de la Unión Europea (UE), mediante el cual buscamos
            generar valor enfocado en los dos pilares
            <span style={{ color: '#2DB292', fontWeight: 500 }}> (1) sistemas de trazabilidad y sostenibilidad</span> y
            <span style={{ color: '#66C874', fontWeight: 500 }}> (2) prácticas agrícolas sostenibles</span>.

            <br /><br />

            Este proyecto tiene una duración de 30 meses donde los beneficiarios podrán adoptar productos,
            procesos y servicios amigables con el planeta, con lo que se promueven modelos de consumo sostenibles
            además de ser más eficientes en el uso de recursos.
          </p>

          {/* Línea decorativa con los colores de la paleta */}
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-1" style={{ backgroundColor: '#154E40' }}></div>
            <div className="w-16 h-1" style={{ backgroundColor: '#2DB292' }}></div>
            <div className="w-16 h-1" style={{ backgroundColor: '#66C874' }}></div>
            <div className="w-16 h-1" style={{ backgroundColor: '#FFA92B' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
