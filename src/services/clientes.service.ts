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

export async function getClients(): Promise<ClientDto[]> {
  const { data } = await api.get<PaginationResponse<ClientDto>>("/clientes");
  return data.items;
}
