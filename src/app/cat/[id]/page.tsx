"use client";

import BreedAttributes from "@/components/info/BreedAttributes";
import BreedDescription from "@/components/info/BreedDescription";
import CatDetailSkeleton from "@/components/skeleton/CatDetailSkeleton";
import Header from "@/components/template/Header";
import { useGetCatById } from "@/hooks/useGetCatById";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: cat, isLoading, error } = useGetCatById(id);

  if (isLoading) {
    return (
      <main className="p-4 pt-0 max-w-6xl mx-auto gap-4 flex flex-col">
        <Header />
        <CatDetailSkeleton />
      </main>
    );
  }

  if (error || !cat)
    return <p className="p-4">Ops, ocorreu um erro ao carregar gato.</p>;

  const breed = cat?.breeds?.[0];

  return (
    <main className="p-4 pt-0 max-w-6xl mx-auto gap-4 flex flex-col">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-xl overflow-hidden border">
          <Image
            src={cat.url}
            alt={"A cool cat"}
            width={cat.width}
            height={cat.height}
            className="object-cover w-full h-auto"
          />
          <p className="text-center text-sm p-2 border-t">
            {breed?.name || "Just a very cool cat"}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <BreedDescription breed={breed} />

          {breed && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-2">Breed Attributes</h2>
              <BreedAttributes breed={breed} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
