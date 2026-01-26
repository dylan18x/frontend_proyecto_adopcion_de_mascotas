import { api } from "./api";

export type ConsultaDto = {
  id: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  cita?: { fecha: string }; 
};

type PaginationResponse<T> = {
  items: T[];
  meta: any;
};

export async function getConsultas(): Promise<ConsultaDto[]> {
  const { data } = await api.get<PaginationResponse<ConsultaDto>>("/consultas");
  return data.items;
}