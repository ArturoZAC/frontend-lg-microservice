type ENVS = {
  // [key: string]: any;
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;

  //*AGREGA LAS ENVS QUE QUIERAS :)
  VITE_BASE_URL_API: string;
};

export const getEnvs = () => {
  const envs = import.meta.env as ENVS;

  return { ...envs };
};
