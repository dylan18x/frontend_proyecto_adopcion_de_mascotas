import { api } from "./api";

export type VacunacionDto = {
  id: string;
  fecha: string;
  mascotaId: string; 
  vacunaId: string;  
  // Estos campos capturan los objetos que TypeORM envía gracias al eager: true
  mascota?: { 
    id: string;
    nombre: string; 
  };
  vacuna?: { 
    id: string;
    nombre: string; 
  };
};

type PaginationResponse<T> = {
  items: T[];
  meta: any;
};

export async function getVacunaciones(): Promise<VacunacionDto[]> {
  const { data } = await api.get<PaginationResponse<VacunacionDto>>("/vacunaciones");
  return data.items;
}