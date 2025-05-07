"use client";

import CatCard from "@/components/card/CatCard";
import CategoryChip from "@/components/chip/CategoryChip";
import CatCardSkeleton from "@/components/skeleton/CatCardSkeleton";
import Header from "@/components/template/Header";
import { CATEGORIES } from "@/constants/categories";
import { fetchCats } from "@/services/catService";
import { Cat, CatCategory } from "@/types/cat";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CatCategory | null>(
    null
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.75, rootMargin: "200px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  const clearData = () => {
    setCats([]);
    setPage(0);
    setHasMore(true);
  };

  useEffect(() => {
    const loadCats = async () => {
      setLoading(true);
      try {
        const newCats = await fetchCats(page, selectedCategory?.id);
        setCats((prev) => [...prev, ...newCats]);

        if (newCats.length === 0) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Failed to fetch cats:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadCats();
  }, [page, selectedCategory]);

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
              clearData();
              setSelectedCategory(
                selectedCategory?.id === category.id ? null : category
              );
            }}
          />
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map((cat, index) => (
          <CatCard key={index} cat={cat} />
        ))}
      </div>

      {loading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CatCardSkeleton key={index} />
          ))}
        </div>
      )}

      <div ref={loadMoreRef} className="h-40" />
    </main>
  );
}
