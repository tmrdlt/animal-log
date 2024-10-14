import { AutoComplete, Input, message } from 'antd';
import debounce from 'lodash.debounce';
import React, { useMemo, useState } from 'react';

import { useAnimalRatings } from '@/context/AnimalRatingsContext';
import { useSearchAnimals } from '@/utils/animalApi';
import { Animal } from '@/utils/types';

interface AnimalOption {
  value: string;
  label: string;
}

const AnimalSearch = () => {
  const { animalRatings, setAnimalRatings } = useAnimalRatings();

  const [searchTerm, setSearchTerm] = useState('');

  // Start searching only after debounce of 500ms to save api call tokens
  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => setSearchTerm(value), 500);
  }, []);

  const { data: animals } = useSearchAnimals(searchTerm);

  const options: AnimalOption[] =
    animals?.map((animal: Animal) => ({
      value: animal.name,
      label: animal.name,
    })) || [];

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const handleSelect = (value: string) => {
    const selectedAnimal = animals.find((animal: Animal) => animal.name === value);
    if (selectedAnimal) {
      if (animalRatings.filter((a) => a.animal.name === selectedAnimal.name).length === 0) {
        setAnimalRatings([
          ...animalRatings,
          {
            animal: selectedAnimal,
            rating: {
              stars: 0,
              characteristics: {
                weight: null,
                lifespan: null,
                skin_type: null,
                diet: null,
                habitat: null,
                lifestyle: null,
              },
            },
          },
        ]);
      } else {
        message.error(`${selectedAnimal.name} is already in your favourites list`);
      }
    }
  };

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      className="w-[600px]"
      placeholder="Search for any animal you like to add"
    >
      <Input.Search size="large" />
    </AutoComplete>
  );
};

export default AnimalSearch;
