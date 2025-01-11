export const getItem = (key) => JSON.parse(localStorage.getItem(key)) || null;

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
