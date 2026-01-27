import { api } from "./api";

export type MascotaDto = {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  cliente?: {
    nombre: string;
  } | null;
};

export async function getMascotas(): Promise<MascotaDto[]> {
  const { data } = await api.get<{ items: MascotaDto[] }>("/mascotas");
  return data.items;
}

export async function createMascota(payload: {
  nombre: string;
  especie: string;
  raza: string;
}) {
  const { data } = await api.post("/mascotas", payload);
  return data;
}

export async function updateMascota(
  id: string,
  payload: {
    nombre?: string;
    especie?: string;
    raza?: string;
  }
) {
  const { data } = await api.put(`/mascotas/${id}`, payload);
  return data;
}

export async function adoptarMascota(id: string, id_cliente: string) {
  const { data } = await api.patch(`/mascotas/${id}/adoptar`, {
    id_cliente
  });
  return data;
}

export async function deleteMascota(id: string) {
  await api.delete(`/mascotas/${id}`);
}
