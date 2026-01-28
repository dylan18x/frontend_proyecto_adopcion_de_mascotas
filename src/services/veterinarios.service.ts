import { api } from "./api";

export type VeterinarioDto = {
  id: string;
  nombre: string;
  especialidad: string;
  telefono: string;
};

export async function getVeterinarios(): Promise<VeterinarioDto[]> {
  const { data } = await api.get<{ items: VeterinarioDto[] }>("/veterinarios");
  return data.items;
}

export async function createVeterinario(vet: Omit<VeterinarioDto, "id">): Promise<VeterinarioDto> {
  const { data } = await api.post<VeterinarioDto>("/veterinarios", vet);
  return data;
}

export async function updateVeterinario(id: string, vet: Omit<VeterinarioDto, "id">): Promise<VeterinarioDto> {
  const { data } = await api.put<VeterinarioDto>(`/veterinarios/${id}`, vet);
  return data;
}

export async function deleteVeterinario(id: string): Promise<void> {
  await api.delete(`/veterinarios/${id}`);
}