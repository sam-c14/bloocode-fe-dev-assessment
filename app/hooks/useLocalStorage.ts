import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T | null = null) => {
  const getStoredValue = () => {
    if (typeof window === "undefined") return;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const setValue = (value: T) => {
    if (typeof window === "undefined") return;
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.error("Error setting value to localStorage", error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue as T);
    } catch (error) {
      console.error("Error removing item from localStorage", error);
    }
  };

  const clear = () => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.clear();
      setStoredValue(initialValue as T); // Reset to initial value
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  };

  return {
    storedValue,
    setValue,
    removeValue,
    clear,
  };
};

export default useLocalStorage;
