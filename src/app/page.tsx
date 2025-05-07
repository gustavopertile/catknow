"use client";

import CatCard from "@/components/card/CatCard";
import CategoryChip from "@/components/chip/CategoryChip";
import CatCardSkeleton from "@/components/skeleton/CatCardSkeleton";
import Header from "@/components/template/Header";
import { CATEGORIES } from "@/constants/categories";
import { fetchCats } from "@/services/catService";
import { Cat, CatCategory } from "@/types/cat";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<CatCategory | null>(
    null
  );

  useEffect(() => {
    loadCats();
  }, [page, selectedCategory?.id]);

  const clearData = () => {
    setCats([]);
    setPage(0);
  };

  const loadCats = async () => {
    try {
      const newCats = await fetchCats(page, selectedCategory?.id ?? undefined);
      setCats((prev) => [...prev, ...newCats]);

      console.log(newCats);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <Header />

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((category) => (
          <CategoryChip
            key={category.id}
            label={category.name}
            selected={selectedCategory?.id === category.id}
            onClick={() => {
              clearData();
              setSelectedCategory(
                selectedCategory?.id === category.id ? null : category
              );
            }}
          />
        ))}
      </div>

      <InfiniteScroll
        dataLength={cats.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={true}
        loader={
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 mb-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <CatCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      </InfiniteScroll>
    </main>
  );
}
