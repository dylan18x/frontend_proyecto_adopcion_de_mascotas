import axios from "axios";

const API_URL = "http://localhost:3000/facturas";

export const facturaService = {
  getAll: () => axios.get(API_URL),
};
