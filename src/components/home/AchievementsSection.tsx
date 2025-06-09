import React from 'react';
import Link from 'next/link';

const AchievementsSection = () => {
  // Estos serían datos simulados de logros que luego se conectarían con la API real
  const achievements = [
    {
      id: 1,
      title: 'Capacitación en prácticas sostenibles',
      description: 'Más de 200 agricultores capacitados en técnicas de agricultura sostenible',
      date: 'Marzo 2025'
    },
    {
      id: 2,
      title: 'Implementación de sistemas de trazabilidad',
      description: '50 MiPYMEs han implementado sistemas de trazabilidad para sus productos',
      date: 'Abril 2025' 
    },
    {
      id: 3,
      title: 'Certificaciones obtenidas',
      description: '25 asociaciones agrarias han obtenido certificaciones de sostenibilidad',
      date: 'Mayo 2025'
    }
  ];
  
  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">¿Qué hemos logrado?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-4">
                {achievement.date}
              </span>
              <h3 className="text-xl font-bold text-green-800 mb-3">{achievement.title}</h3>
              <p className="text-gray-700 mb-6">{achievement.description}</p>
              <Link 
                href="/news" 
                className="text-green-600 font-medium hover:text-green-700"
              >
                Leer más →
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/news" 
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 inline-block"
          >
            Ver todos los logros
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;