'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Card } from 'antd';

import AnimalGrid from '@/components/AnimalGrid';
import AnimalSearch from '@/components/AnimalSearch';

import { AnimalRatingsProvider } from '@/context/AnimalRatingsContext';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimalRatingsProvider>
        <div className="flex flex-col gap-10 w-full min-h-screen h-full bg-lime-100 p-10">
          <div className="flex flex-col w-full px-10 gap-10 items-center">
            <h1 className="text-4xl">🐅 My Favourite Animals 🦒</h1>
            <Card className="bg-lime-500">
              Search for animals you like, add them to your favourites list and rate them!
            </Card>
            <AnimalSearch />
          </div>

          <AnimalGrid />
        </div>
      </AnimalRatingsProvider>
    </QueryClientProvider>
  );
}
