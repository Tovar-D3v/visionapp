import axios from "axios";
import config from "../config/config";

const API_URL = `${config.API_CLIENTES}/clientes`;

export const listarClientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error en listarClientes:", error);
    throw error;
  }
};