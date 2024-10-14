import React, { createContext, useContext, useEffect, useState } from 'react';

import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorageHelper';
import { AnimalRating } from '@/utils/types';

const STORAGE_KEY = 'animalRatings';

interface AnimalRatingsContextType {
  animalRatings: AnimalRating[];
  setAnimalRatings: (ratings: AnimalRating[]) => void;
}

const AnimalRatingsContext = createContext<AnimalRatingsContextType | undefined>(undefined);

export const useAnimalRatings = (): AnimalRatingsContextType => {
  const context = useContext(AnimalRatingsContext);
  if (!context) {
    throw new Error('useAnimalRatings must be used within an AnimalRatingsProvider');
  }
  return context;
};

export const AnimalRatingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [animalRatings, setAnimalRatingsState] = useState<AnimalRating[]>([]);

  useEffect(() => {
    const savedRatings = getFromLocalStorage(STORAGE_KEY);
    if (savedRatings) {
      setAnimalRatingsState(savedRatings);
    }
  }, []);

  useEffect(() => {
    if (animalRatings.length > 0) {
      setToLocalStorage(STORAGE_KEY, animalRatings);
    }
  }, [animalRatings]);

  const setAnimalRatings = (ratings: AnimalRating[]) => {
    setAnimalRatingsState(ratings);
  };

  return (
    <AnimalRatingsContext.Provider value={{ animalRatings, setAnimalRatings }}>
      {children}
    </AnimalRatingsContext.Provider>
  );
};
