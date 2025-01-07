export const useStringUtilities = () => {
  const trim = (str: string, len?: number) => {
    if (str.length > (len ? len : 17)) {
      return str.slice(0, len ? len : 17).concat("...");
    }
    return str;
  };
  return {
    trim,
  };
};
