import axios from 'axios';
import { Agricultor } from '../types/index';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio para obtener datos de agricultores
export const agricultoresService = {
  // Obtener un agricultor por DNI
  getAgricultorByDni: async (dni: string) => {
    try {
      const response = await apiClient.get(`/agricultores/${dni}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching agricultor data:', error);
      throw error;
    }
  },

  // Modificar la función getAllAgricultores para soportar paginación
  // En agricultoreshook.ts
  getAllAgricultores: async (offset: number = 0, limit: number = 100, search: string = ''): Promise<{ data: Agricultor[], total: number }> => {
    try {
      let params: any = { limit, offset };
      if (search) {
        params.search = search; // Asumiendo que tu API soporta un parámetro de búsqueda
      }

      const response = await axios.get<Agricultor[]>(`${API_BASE_URL}/agricultores`, { params });

      // Obtener el recuento total del header 'x-total-count' o un valor similar que devuelve tu API
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
  createAgricultor: async (agricultor: Agricultor): Promise<Agricultor> => {
  try {
    console.log("Enviando agricultor:", agricultor);
    const response = await axios.post<Agricultor>(`${API_BASE_URL}/agricultores`, agricultor);
    return response.data;
  } catch (error: any) {
    if ((error as any).isAxiosError) {
      console.error("Error al crear agricultor:", (error as any).response?.data || (error as any).message);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error;
  }
},


  // Actualizar un agricultor existente
  updateAgricultor: async (id: number, agricultor: Agricultor): Promise<Agricultor> => {
    try {
      const response = await axios.put<Agricultor>(`${API_BASE_URL}/agricultores/${id}`, agricultor);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar agricultor con ID ${id}:`, error);
      throw error;
    }
  },
};