import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number; // Añadir el total de items
  onPageChange: (page: number) => void;
  pageSizes?: number[];
  currentPageSize?: number;
  onPageSizeChange?: (size: number) => void;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems,
  onPageChange,
  pageSizes = [10, 25, 50, 100],
  currentPageSize = 10,
  onPageSizeChange
}: PaginationProps) => {
  // Asegurarse de que totalPages nunca sea menor que 1
  const safeTotal = Math.max(1, totalPages || 1);
  const safeCurrent = Math.min(safeTotal, Math.max(1, currentPage));
  
  // Calcular índices de registros que se están mostrando
  const startItem = (safeCurrent - 1) * currentPageSize + 1;
  const endItem = Math.min(startItem + currentPageSize - 1, totalItems);
  
  // Crear un array de números de páginas para mostrar
  const pageNumbers = [];
  const maxPagesToShow = 5;
  
  let startPage = Math.max(1, safeCurrent - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(safeTotal, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-t border-gray-200 bg-white" style={{ fontFamily: 'Montserrat' }}>
      <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
        <div className="flex items-center mb-2 md:mb-0">
          <span className="text-sm text-gray-700 mr-3">
            Mostrar
          </span>
          <select
            value={currentPageSize}
            onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          >
            {pageSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span className="text-sm text-gray-700 ml-3">
            por página
          </span>
        </div>
        
        {/* Añadir indicador de registros totales */}
        <div className="text-sm text-gray-700 md:ml-6">
          Mostrando <span className="font-medium">{startItem}</span> a <span className="font-medium">{endItem}</span> de <span className="font-medium">{totalItems}</span> registros
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={safeCurrent === 1}
          className={`p-2 rounded-md ${safeCurrent === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          aria-label="Primera página"
          title="Primera página"
        >
          <span className="sr-only">Primera página</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
          </svg>
        </button>
        
        <button
          onClick={() => onPageChange(safeCurrent - 1)}
          disabled={safeCurrent === 1}
          className={`p-2 rounded-md ${safeCurrent === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          aria-label="Página anterior"
          title="Página anterior"
        >
          <FaChevronLeft size={14} />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 rounded-md ${
              number === safeCurrent
                ? 'bg-[#2DB292] text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {number}
          </button>
        ))}
        
        {endPage < safeTotal && (
          <>
            {endPage < safeTotal - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => onPageChange(safeTotal)}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              {safeTotal}
            </button>
          </>
        )}
        
        <button
          onClick={() => onPageChange(safeCurrent + 1)}
          disabled={safeCurrent === safeTotal}
          className={`p-2 rounded-md ${safeCurrent === safeTotal ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          aria-label="Página siguiente"
          title="Página siguiente"
        >
          <FaChevronRight size={14} />
        </button>
        
        <button
          onClick={() => onPageChange(safeTotal)}
          disabled={safeCurrent === safeTotal}
          className={`p-2 rounded-md ${safeCurrent === safeTotal ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          aria-label="Última página"
          title="Última página"
        >
          <span className="sr-only">Última página</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;