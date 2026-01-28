import { api } from "./api";

// Definición clara del objeto Consulta
export type ConsultaDto = {
  id: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  id_cita: string;
  cita?: { 
    fecha: string; 
    mascota?: { nombre: string } 
  }; 
};

// Estructura de paginación que devuelve NestJS
type PaginationResponse<T> = {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};

// 1. Obtener todas (Admin)
export async function getConsultas(): Promise<ConsultaDto[]> {
  const { data } = await api.get<PaginationResponse<ConsultaDto>>("/consulta", {
    params: { limit: 100, page: 1 }
  });
  return data.items;
}

// 2. Obtener solo las del usuario logueado
export async function getMisConsultas(): Promise<ConsultaDto[]> {
  const { data } = await api.get<PaginationResponse<ConsultaDto>>("/consulta/mis-mascotas");
  return data.items;
}

// 3. Obtener citas para el Select del formulario
export async function getCitasDisponibles(): Promise<any[]> {
  const { data } = await api.get<PaginationResponse<any>>("/cita", {
    params: { limit: 100 }
  });
  return data.items;
}

// 4. Crear: Omitimos 'id' porque lo genera la DB y 'cita' porque es la relación de retorno
export async function createConsulta(data: Omit<ConsultaDto, "id" | "cita">): Promise<ConsultaDto> {
  const response = await api.post<ConsultaDto>("/consulta", data);
  return response.data;
}

// 5. Actualizar: Permitimos enviar solo algunos campos
export async function updateConsulta(id: string, data: Partial<Omit<ConsultaDto, "id" | "cita">>): Promise<ConsultaDto> {
  const response = await api.put<ConsultaDto>(`/consulta/${id}`, data);
  return response.data;
}

// 6. Eliminar
export async function deleteConsulta(id: string): Promise<void> {
  await api.delete(`/consulta/${id}`);
}