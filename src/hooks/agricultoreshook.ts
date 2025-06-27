import axios from 'axios';
import { Agricultor } from '../types/index';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor simple para logging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Servicio para obtener datos de agricultores
export const agricultoresService = {
  // Obtener un agricultor por DNI
  getAgricultorByDni: async (dni: string): Promise<Agricultor> => {
    try {
      const response = await apiClient.get(`/agricultores/${dni}`);
        return response.data as Agricultor;
    } catch (error) {
      console.error('Error fetching agricultor data:', error);
      throw error;
    }
  },

  // Obtener todos los agricultores con paginación
  getAllAgricultores: async (offset: number = 0, limit: number = 100, search: string = ''): Promise<{ data: Agricultor[], total: number }> => {
    try {
      let params: any = { limit, offset };
      if (search) {
        params.search = search;
      }

      const response = await apiClient.get<Agricultor[]>('/agricultores', { params });

      // Obtener el recuento total del header o usar la longitud de los datos
      const totalCount = response.headers['x-total-count'] || response.data.length;

      return {
        data: response.data,
        total: parseInt(totalCount as string, 10)
      };
    } catch (error) {
      console.error("Error al obtener agricultores:", error);
      throw error;
    }
  },

  // Crear un nuevo agricultor
  createAgricultor: async (agricultor: Agricultor): Promise<Agricultor> => {
    try {
      console.log("Enviando agricultor:", agricultor);
      const response = await apiClient.post<Agricultor>('/agricultores', agricultor);
      return response.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.error("Error al crear agricultor:", error.response?.data || error.message);
      } else {
        console.error("Error desconocido:", error);
      }
      throw error;
    }
  },

  // Actualizar un agricultor existente
  updateAgricultor: async (dni: string, agricultorData: Partial<Agricultor>): Promise<Agricultor> => {
    try {
      // Asegurar que el DNI esté incluido en los datos
      const { dni: _, ...dataWithoutDni } = agricultorData;
      
      console.log(`Actualizando agricultor con DNI: ${dni}`);
      console.log('Datos enviados (sin DNI):', dataWithoutDni);
      
      const response = await apiClient.put<Agricultor>(`/agricultores/${dni}`, dataWithoutDni);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar agricultor con DNI ${dni}:`, error);
      throw error;
    }
  },
  updateAgricultorById: async (id: number, agricultorData: Partial<Agricultor>): Promise<Agricultor> => {
    try {
      const response = await apiClient.put<Agricultor>(`/agricultores/id/${id}`, agricultorData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar agricultor con ID ${id}:`, error);
      throw error;
    }
  },
  // Eliminar un agricultor
  deleteAgricultor: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/agricultores/${id}`);
    } catch (error) {
      console.error(`Error al eliminar agricultor con ID ${id}:`, error);
      throw error;
    }
  }
};

// Exportar también como default para compatibilidad
export default agricultoresService;