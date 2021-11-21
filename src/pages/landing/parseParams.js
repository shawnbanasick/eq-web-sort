const parseParams = (params = "") => {
  const rawParams1 = params.split("?");
  const extractedParams = {};
  rawParams1.forEach((item) => {
    item = item.split("=");
    extractedParams[item[0]] = item[1];
  });
  return extractedParams;
};

export default parseParams;
