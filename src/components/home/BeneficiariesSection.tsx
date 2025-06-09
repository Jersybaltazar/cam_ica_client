import React from 'react';

const BeneficiariesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            {/* Título principal con Omegle y color primario #154E40 */}
            <h2 
              className="text-3xl font-bold mb-6" 
              style={{ fontFamily: 'Omegle', color: '#154E40' }}
            >
              ¿A quiénes beneficiamos?
            </h2>
            
            {/* Lista con texto Montserrat y checkmarks en color #2DB292 */}
            <ul className="space-y-4 text-lg" style={{ fontFamily: 'Montserrat', color: '#333333' }}>
              <li className="flex items-start">
                <svg 
                  className="h-6 w-6 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="#2DB292"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Micro, pequeñas y medianas empresas (MiPYME)</span>
              </li>
              <li className="flex items-start">
                <svg 
                  className="h-6 w-6 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="#2DB292"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cooperativas agrarias</span>
              </li>
              <li className="flex items-start">
                <svg 
                  className="h-6 w-6 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="#2DB292"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Asociaciones agrarias</span>
              </li>
              <li className="flex items-start">
                <svg 
                  className="h-6 w-6 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="#2DB292"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Pequeños y medianos productores del sector agrícola</span>
              </li>
            </ul>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            {/* Tarjeta con colores de la paleta */}
            <div 
              className="p-6 rounded-lg" 
              style={{ 
                backgroundColor: '#ECEBEB',
                borderLeft: '4px solid #154E40'
              }}
            >
              {/* Subtítulo con Omegle */}
              <h3 
                className="text-xl font-bold mb-4" 
                style={{ fontFamily: 'Omegle', color: '#2DB292' }}
              >
                Buscamos agricultores con propósito
              </h3>
              
              {/* Texto con Montserrat */}
              <p 
                className="italic" 
                style={{ fontFamily: 'Montserrat', color: '#333333' }}
              >
                "El Programa de Apoyo a la Agricultura Familiar tiene como finalidad formar a
                agricultores con propósito; es decir, con una visión y misión que les permita
                garantizar un aumento de productividad y rentabilidad a través de un crecimiento
                continuo en aprendizaje de nuevas herramientas y metodologías basadas en
                los lineamientos de prácticas económicas agrosostenibles."
              </p>
              
              {/* Línea decorativa con colores de la paleta */}
              <div className="mt-6 flex">
                <div className="w-12 h-1" style={{ backgroundColor: '#154E40' }}></div>
                <div className="w-12 h-1" style={{ backgroundColor: '#2DB292' }}></div>
                <div className="w-12 h-1" style={{ backgroundColor: '#66C874' }}></div>
                <div className="w-12 h-1" style={{ backgroundColor: '#FFA92B' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeneficiariesSection;