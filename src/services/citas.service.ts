import { api } from "./api";

export type CitaDto = {
  id_cita: string;
  fecha: string;
  hora: string;
  motivo: string;
  id_mascota: string;
  id_veterinario: string;
  mascota?: { nombre: string };
  veterinario?: { nombre: string };
};

// Representa tu CreateCitaDto de NestJS
export type CreateCitaDto = {
  fecha: string;
  hora: string;
  motivo: string;
  id_mascota: string;
  id_veterinario: string;
};

export async function getCitas(): Promise<CitaDto[]> {
  const { data } = await api.get<{ items: CitaDto[] }>("/citas?limit=100");
  return data.items;
}

export async function createCita(data: CreateCitaDto): Promise<CitaDto> {
  return (await api.post("/citas", data)).data;
}

export async function deleteCita(id_cita: string): Promise<void> {
  await api.delete(`/citas/${id_cita}`);
}