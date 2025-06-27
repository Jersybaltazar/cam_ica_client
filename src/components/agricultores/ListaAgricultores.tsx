import React from "react";
import { FaSearch, FaEdit, FaEye } from "react-icons/fa";
import { Agricultor } from "../../types";
import Pagination from "./Pagination";

interface ListaAgricultoresProps {
  agricultores: Agricultor[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onView: (agricultor: Agricultor) => void;
  onEdit: (agricultor: Agricultor) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

const ListaAgricultores: React.FC<ListaAgricultoresProps> = ({
  agricultores,
  loading,
  error,
  searchQuery,
  setSearchQuery,
  onView,
  onEdit,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems
}) => {
  // Asegurarse de que agricultores siempre sea un array
  const agricultoresList = Array.isArray(agricultores) ? agricultores : [];

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Barra de búsqueda */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const newQuery = e.target.value;
              setSearchQuery(newQuery);
            }}
            placeholder="Buscar por nombre o DNI..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
            style={{ fontFamily: 'Montserrat' }}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Tabla de agricultores */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center" style={{ fontFamily: 'Montserrat' }}>
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2DB292]"></div>
            <p className="mt-2 text-gray-600">Cargando agricultores...</p>
          </div>
        ) : error ? (
          <div
            className="p-6 text-center text-red-600"
            style={{ fontFamily: 'Montserrat' }}
          >
            {error}
          </div>
        ) : agricultoresList.length === 0 ? (
          <div
            className="p-8 text-center text-gray-600"
            style={{ fontFamily: 'Montserrat' }}
          >
            {searchQuery ? "No se encontraron agricultores que coincidan con la búsqueda." : "No hay agricultores registrados."}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  DNI
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  Localidad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  Certificaciones
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agricultoresList.map((agricultor: Agricultor) => (
                <tr key={agricultor.dni} className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {agricultor.dni}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {agricultor.nombre_completo}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {agricultor.provincia}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    style={{ fontFamily: 'Montserrat' }}
                  >
                    {/* Cambiar esto para evitar error con senasa.length */}
                    {agricultor.senasa === "SÍ" ? "SENASA" : ""}
                    {agricultor.senasa === "SÍ" && agricultor.sispa === "SÍ" ? " | " : ""}
                    {agricultor.sispa === "SÍ" ? "SISPA" : ""}
                    {agricultor.senasa !== "SÍ" && agricultor.sispa !== "SÍ" ? "Ninguna" : ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onView(agricultor)}
                      className="text-[#2DB292] hover:text-[#154E40] mr-3"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      <FaEye className="inline mr-1" />
                      Ver
                    </button>
                    <button
                      onClick={() => onEdit(agricultor)}
                      className="text-[#FFA92B] hover:text-amber-700"
                      style={{ fontFamily: 'Montserrat' }}
                    >
                      <FaEdit className="inline mr-1" />
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginación */}
      {!loading && !error && agricultoresList.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems} // Añadir esta prop
          onPageChange={onPageChange}
          pageSizes={[10, 25, 50, 100, 200, 500]} // Ampliar opciones
          currentPageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};

export default ListaAgricultores;