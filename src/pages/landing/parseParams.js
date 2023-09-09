const parseParams = (params = "") => {
  let returnVal;
  if (params.includes("?")) {
    const rawParams1 = params.split("=");
    return rawParams1[1];
  }
  return returnVal;
};

export default parseParams;
