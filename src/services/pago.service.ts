import axios from "axios";

const API_URL = "http://localhost:3000/pagos";

export const pagoService = {
  getAll: () => axios.get(API_URL),
  create: (data: any) => axios.post(API_URL, data),
};
