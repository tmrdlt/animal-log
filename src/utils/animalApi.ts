import { useQuery } from '@tanstack/react-query';

import { Animal } from '@/utils/types';

const API_KEY = process.env.NEXT_PUBLIC_API_NINJAS_API_KEY;

const fetchAnimals = async (name: string): Promise<Animal[]> => {
  const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
    headers: {
      'X-Api-Key': API_KEY || '',
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
};

export const useSearchAnimals = (name: string) => {
  return useQuery({
    queryKey: ['animals', name],
    queryFn: () => fetchAnimals(name),
    enabled: !!name,
    initialData: [],
  });
};
