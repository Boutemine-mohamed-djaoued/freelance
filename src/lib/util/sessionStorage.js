export function getSessionStorageItem(key, defaultValue) {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  }
  return defaultValue;
}

export function setSessionStorageItem(key, value) {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}