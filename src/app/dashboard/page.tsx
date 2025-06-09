'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout/Layout';
import { FaUsers, FaPlus, FaEdit, FaEye, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { agricultoresService } from '../../hooks/agricultoreshook';
import ListaAgricultores from '../../components/agricultores/ListaAgricultores';
import FormularioAgricultor from '../../components/agricultores/FormularioAgricultor';
import VistaAgricultor from '../../components/agricultores/VistaAgricultor';
import { Agricultor } from '../../types/index';

export default function AdminDashboardPage() {
  const [agricultores, setAgricultores] = useState<Agricultor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'create', 'view', 'edit'
  const [selectedAgricultor, setSelectedAgricultor] = useState<Agricultor | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();
  // Calcular offset basado en la página actual y el tamaño de página
  const calculateOffset = (page: number, size: number) => (page - 1) * size;

  // Calcular el número total de páginas
  const totalPages = Math.ceil(totalItems / pageSize);

  // Cargar agricultores
  useEffect(() => {
    const loadAgricultores = async () => {
      try {
        setLoading(true);
        const offset = calculateOffset(currentPage, pageSize);
        const result = await agricultoresService.getAllAgricultores(offset, pageSize, searchQuery);
        
        // Asegurarse de que result.data siempre sea un array
        setAgricultores(Array.isArray(result.data) ? result.data : []);
        setTotalItems(result.total);
        setError('');
      } catch (err) {
        console.error('Error al cargar agricultores:', err);
        setError('No se pudieron cargar los datos de agricultores. Por favor, intente nuevamente.');
        setAgricultores([]); // Establecer un array vacío en caso de error
        setTotalItems(0); // Resetear totalItems en caso de error
      } finally {
        setLoading(false);
      }
    };

    // Usar un timeout para no hacer una solicitud por cada tecla presionada
    const searchTimeout = setTimeout(() => {
      loadAgricultores();
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [currentPage, pageSize, searchQuery]);

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Función para cambiar tamaño de página
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset a primera página cuando cambia el tamaño
  };
  // Filtrar agricultores por búsqueda
  const filteredAgricultores = searchQuery
    ? agricultores.filter(agricultor =>
      agricultor.nombre_completo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agricultor.dni.includes(searchQuery)
    )
    : agricultores;

  // Manejadores de eventos
  const handleViewAgricultor = (agricultor: Agricultor) => {
    setSelectedAgricultor(agricultor);
    setActiveTab('view');
  };

  const handleEditAgricultor = (agricultor: Agricultor) => {
    setSelectedAgricultor(agricultor);
    setActiveTab('edit');
  };

  const handleCreateNew = () => {
    setSelectedAgricultor(null);
    setActiveTab('create');
  };

  const handleLogout = () => {
    // Aquí implementa la lógica de cierre de sesión
    router.push('/trazabilidad');
  };

  return (
    <Layout title="Panel Administrativo - Proyecto PLANTAS" hideNavbar={true}>
      <div className="min-h-screen bg-[#f8f9fa]">
        {/* Header del Dashboard */}
        <header
          className="bg-[#154E40] text-white py-4 px-6 flex justify-between items-center shadow-md"
        >
          <div className="flex items-center">
            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'Omegle' }}
            >
              Panel Administrativo
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 rounded-lg transition-all"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              fontFamily: 'Montserrat',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            <span className="font-medium mr-2">Cerrar sesión</span>
            <FaSignOutAlt />
          </button>
        </header>

        {/* Contenido principal */}
        <div className="container mx-auto px-4 py-8">
          {/* Encabezado con estadísticas */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: 'Omegle', color: '#154E40' }}
                >
                  Gestión de Agricultores
                </h2>
                <p
                  className="text-gray-600 mb-4 md:mb-0"
                  style={{ fontFamily: 'Montserrat' }}
                >
                  Total de agricultores registrados: <span className="font-semibold">{totalItems}</span>
                </p>
              </div>

              <button
                onClick={handleCreateNew}
                className="flex items-center px-6 py-2 rounded-lg text-white transition-all"
                style={{
                  backgroundColor: '#2DB292',
                  fontFamily: 'Montserrat',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#154E40'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2DB292'}
              >
                <FaPlus className="mr-2" />
                Nuevo Agricultor
              </button>
            </div>
          </div>

          {/* Contenido basado en la pestaña activa */}
          {activeTab === 'list' ? (
            <ListaAgricultores
              agricultores={agricultores || []}
              loading={loading}
              error={error}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onView={handleViewAgricultor}
              onEdit={handleEditAgricultor}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              totalItems={totalItems}
            />
          ) : activeTab === 'create' ? (
            <FormularioAgricultor
              agricultor={null} // No hay agricultor seleccionado al crear uno nuevo
              onCancel={() => setActiveTab('list')}
              onSuccess={() => {
                // Recargar lista después de crear/editar
                setActiveTab('list');
                setCurrentPage(1); // Volver a la primera página
                // Recargar datos con paginación
                const reloadData = async () => {
                  try {
                    const result = await agricultoresService.getAllAgricultores(0, pageSize);
                    setAgricultores(Array.isArray(result.data) ? result.data : []);
                    setTotalItems(result.total);
                  } catch (error) {
                    console.error("Error recargando datos:", error);
                  }
                };
                reloadData();
              }}
            />
          ) : activeTab === 'view' ? (
            <VistaAgricultor
              agricultor={selectedAgricultor}
              onBack={() => setActiveTab('list')}
              onEdit={() => setActiveTab('edit')}
            />
          ) : (
            <FormularioAgricultor
              agricultor={selectedAgricultor}
              onCancel={() => setActiveTab('list')}
              onSuccess={() => {
                // Recargar lista después de editar
                setActiveTab('list');
                
                // Recargar datos con paginación
                const reloadData = async () => {
                  try {
                    const offset = calculateOffset(currentPage, pageSize);
                    const result = await agricultoresService.getAllAgricultores(offset, pageSize);
                    setAgricultores(Array.isArray(result.data) ? result.data : []);
                    setTotalItems(result.total);
                  } catch (error) {
                    console.error("Error recargando datos:", error);
                  }
                };
                reloadData();
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}