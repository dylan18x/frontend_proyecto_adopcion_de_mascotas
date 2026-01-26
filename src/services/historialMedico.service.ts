import axios from "axios";

const API_URL = "http://localhost:3000/historial-medico";

export const historialMedicoService = {
  getAll: () => axios.get(API_URL),
};
