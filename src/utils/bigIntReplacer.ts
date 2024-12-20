export const bigIntReplacer = (key: string, value: any) => {
  // Si el valor es un BigInt, lo convertimos a string
  return typeof value === 'bigint' ? value.toString() : value;
};