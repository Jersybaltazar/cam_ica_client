interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg 
          className="w-12 h-12 text-red-500 mx-auto mb-4"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-gray-700">{message}</p>
        <button 
          onClick={() => window.history.back()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Volver
        </button>
      </div>
    </div>
  );
}