export const numberInputConvert = (value: unknown): number | undefined => {
  const valueStr = String(value);
  if (value != null && !Number.isNaN(value) && valueStr) {
    return parseInt(valueStr);
  }
  return undefined;
};
