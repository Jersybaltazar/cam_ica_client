export interface Agricultor {
  id?: number;
  dni: string;
  fecha_censo: string;
  apellidos: string;
  nombres: string;
  nombre_completo: string;
  sexo: string;
  edad: number;
  esparrago: string | null;
  granada: string | null;
  maiz: string | null;
  palta: string | null;
  papa: string | null;
  pecano: string | null;
  vid: string | null;
  dpto: string;
  provincia: string;
  distrito: string;
  centro_poblado: string | null;
  ubicacion_completa: string;
  senasa: string | null;
  sispa: string | null;
  codigo_autogene_sispa: string | null;
  regimen_tenencia_sispa: string | null;
  area_total_declarada: number | null;
  fecha_actualizacion_sispa: string | null;
  toma: string | null;
  edad_cultivo: string | null;
  total_ha_sembrada: number;
  productividad_x_ha: number | null;
  tipo_riego: string;
  nivel_alcance_venta: string;
  jornales_por_ha: number | null;
  practica_economica_sost: string;
  porcentaje_prac_economica_sost: string | null;
  tiene_practicas_sostenibles: boolean;
  cultivos_activos: Record<string, any>;
}

export interface Certificacion {
  id?: number;
  nombre: string;
  fecha: string;
  descripcion?: string;
}