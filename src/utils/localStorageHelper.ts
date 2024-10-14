import { AnimalRating } from '@/utils/types';

export const getFromLocalStorage = (key: string): AnimalRating[] => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

export const setToLocalStorage = (key: string, value: AnimalRating[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};
