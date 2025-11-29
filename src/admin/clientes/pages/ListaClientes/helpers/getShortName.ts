export const getShortName = (nombres: string, apellidos: string) => {
  const primerNombre = nombres.trim().split(" ")[0];
  const primerApellido = apellidos.trim().split(" ")[0];
  return `${primerNombre} ${primerApellido}`;
};
