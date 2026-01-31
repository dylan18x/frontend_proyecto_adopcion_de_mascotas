import { api } from "./api";

export type ClientDto = {
  id: string;
  nombre: string;
  cedula: string;
  telefono: string;
  direccion: string;
};

type PaginationResponse<T> = {
  items: T[];
  meta: any;
};

// 👉 TRAER TODOS LOS CLIENTES
export async function getClients(
  page = 1,
  limit = 1000
): Promise<ClientDto[]> {
  const { data } = await api.get<PaginationResponse<ClientDto>>(
    `/clientes?page=${page}&limit=${limit}`
  );
  return data.items;
}

// CREATE
export async function createClient(
  client: Omit<ClientDto, "id">
): Promise<ClientDto> {
  const { data } = await api.post<ClientDto>("/clientes", client);
  return data;
}

// UPDATE
export async function updateClient(
  id: string,
  client: Omit<ClientDto, "id">
): Promise<ClientDto> {
  const { data } = await api.put<ClientDto>(`/clientes/${id}`, client);
  return data;
}

// DELETE
export async function deleteClient(id: string): Promise<void> {
  await api.delete(`/clientes/${id}`);
}
