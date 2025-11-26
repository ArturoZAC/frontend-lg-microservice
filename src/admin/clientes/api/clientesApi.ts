import { getEnvs } from "@/helpers/getEnvs";
import axios from "axios";

const { VITE_BASE_URL_API } = getEnvs();

// console.log({ VITE_BASE_URL_API });

export const clientesApi = axios.create({
  baseURL: VITE_BASE_URL_API,
});
