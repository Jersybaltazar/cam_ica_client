import React from 'react';

interface AttendanceChartProps {
  asistencia: number;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ asistencia }) => {
  const noAsistencia = 100 - asistencia;
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center justify-center mb-4">
        <div className="w-32 h-32 relative">
          {/* Círculo de fondo */}
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="4"
              strokeDasharray="100, 100"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#10B981"
              strokeWidth="4"
              strokeDasharray={`${asistencia}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{asistencia}%</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700">Asistió</span>
          </div>
          <p className="font-semibold">{asistencia}%</p>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700">No asistió</span>
          </div>
          <p className="font-semibold">{noAsistencia}%</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;