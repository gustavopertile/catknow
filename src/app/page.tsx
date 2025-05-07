"use client";

import CatCard from "@/components/card/CatCard";
import CategoryChip from "@/components/chip/CategoryChip";
import CatCardSkeleton from "@/components/skeleton/CatCardSkeleton";
import Header from "@/components/template/Header";
import { CATEGORIES } from "@/constants/categories";
import { useGetCats } from "@/hooks/useGetCats";
import { CatCategory } from "@/types/cat";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<CatCategory | null>(
    null
  );

  const { data, fetchNextPage, hasNextPage, isLoading, error } = useGetCats(
    selectedCategory?.id
  );

  const cats = data?.pages?.flat() ?? [];

  if (error)
    return (
      <p className="p-4">
        Desculpe, algum erro inesperado aconteceu. Tente novamente mais tarde.
      </p>
    );

  return (
    <main className="p-4 pt-0 max-w-6xl mx-auto gap-4 flex flex-col">
      <Header />

      <div className="flex flex-wrap gap-2 ">
        {CATEGORIES.map((category) => (
          <CategoryChip
            key={category.id}
            label={category.name}
            selected={selectedCategory?.id === category.id}
            onClick={() => {
              setSelectedCategory(
                selectedCategory?.id === category.id ? null : category
              );
            }}
          />
        ))}
      </div>

      {isLoading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <CatCardSkeleton key={index} />
          ))}
        </div>
      )}

      <InfiniteScroll
        dataLength={cats.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 mb-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <CatCardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat, index) => (
            <CatCard key={index} cat={cat} />
          ))}
        </div>
      </InfiniteScroll>
    </main>
  );
}
