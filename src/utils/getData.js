const getData = (data) => {
  const obj = {};

  const keys = Object.keys(data || {}) || [];

  for (const key of keys) {
    obj[key] = data[key]?.toString();
  }

  return obj;
};

export default getData;
