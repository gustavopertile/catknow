import { Cat } from "@/types/cat";
import Image from "next/image";

type CatCardProps = {
  cat: Cat;
};

export default function CatCard({ cat }: CatCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-md dark:shadow-customBlack transition cursor-pointer bg-white dark:bg-customBlack">
      <Image
        src={cat?.url}
        alt={"A cool cat"}
        className="w-full h-64 object-cover"
        width={cat.width}
        height={cat.height}
        unoptimized={cat.url.endsWith(".gif")}
      />
      <div className="text-center p-3 text-foreground">
        {cat.breeds.length === 0 ? (
          <p className="text-sm">Just a very cool cat</p>
        ) : (
          cat.breeds.map((breed) => (
            <div key={breed.id}>
              <p className="text-sm">{breed.temperament}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
