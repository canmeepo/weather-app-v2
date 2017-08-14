export const getStorage = item => {
  return JSON.parse(localStorage.getItem(item));
};

export const updateStorage = (keyName, data) => {
  localStorage.setItem(keyName, JSON.stringify(data));
};
