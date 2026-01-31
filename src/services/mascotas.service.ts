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

// 🔹 Traer MUCHAS mascotas (evitar paginación invisible)
export async function getMascotas(): Promise<MascotaDto[]> {
  const { data } = await api.get<{ items: MascotaDto[] }>(
    "/mascotas?limit=1000"
  );
  return data.items;
}

// 🔹 Crear y DEVOLVER la mascota creada
export async function createMascota(payload: {
  nombre: string;
  especie: string;
  raza: string;
}): Promise<MascotaDto> {
  const { data } = await api.post<MascotaDto>("/mascotas", payload);
  return data;
}

// 🔹 Editar y devolver la mascota actualizada
export async function updateMascota(
  id: string,
  payload: {
    nombre?: string;
    especie?: string;
    raza?: string;
  }
): Promise<MascotaDto> {
  const { data } = await api.put<MascotaDto>(
    `/mascotas/${id}`,
    payload
  );
  return data;
}

// 🔹 Adoptar y devolver mascota actualizada
export async function adoptarMascota(
  id: string,
  id_cliente: string
): Promise<MascotaDto> {
  const { data } = await api.patch<MascotaDto>(
    `/mascotas/${id}/adoptar`,
    { id_cliente }
  );
  return data;
}

// 🔹 Borrar (no devuelve nada)
export async function deleteMascota(id: string): Promise<void> {
  await api.delete(`/mascotas/${id}`);
}
