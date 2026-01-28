import { api } from "./api";

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
  const { data } = await api.get<PaginationResponse<ConsultaDto>>("/consultas", {
    params: { limit: 100, page: 1 }
  });
  return data.items;
}

// 2. Obtener solo las del usuario logueado
export async function getMisConsultas(): Promise<ConsultaDto[]> {
  const { data } = await api.get<PaginationResponse<ConsultaDto>>("/consultas/mis-mascotas");
  return data.items;
}

// 3. Obtener citas para el Select del formulario
export async function getCitasDisponibles(): Promise<any[]> {
  const { data } = await api.get<PaginationResponse<any>>("/cita", {
    params: { limit: 100 }
  });
  return data.items;
}

export async function createConsulta(data: Omit<ConsultaDto, "id" | "cita">): Promise<ConsultaDto> {
  const response = await api.post<ConsultaDto>("/consultas", data);
  return response.data;
}

export async function updateConsulta(id: string, data: Partial<Omit<ConsultaDto, "id" | "cita">>): Promise<ConsultaDto> {
  const response = await api.put<ConsultaDto>(`/consultas/${id}`, data);
  return response.data;
}


export async function deleteConsulta(id: string): Promise<void> {
  await api.delete(`/consultas/${id}`);
}