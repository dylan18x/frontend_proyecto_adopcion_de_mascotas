import axios from "axios";

const API_URL = "http://localhost:3000/pagos";

export interface PagoData {
  fecha: string;
  monto: number;
  metodo_pago: string;
  username_donante: string; 
}

export const pagoService = {
  getAll: (page: number = 1, limit: number = 10) => 
    axios.get(`${API_URL}?page=${page}&limit=${limit}`),
    
  create: (data: PagoData) => axios.post(API_URL, data),
  
  update: (id: string, data: Partial<PagoData>) => 
    axios.put(`${API_URL}/${id}`, data),
    
  delete: (id: string) => axios.delete(`${API_URL}/${id}`),
};