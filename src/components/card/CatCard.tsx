import { Cat } from "@/types/cat";
import Image from "next/image";
import Link from "next/link";

type CatCardProps = {
  cat: Cat;
};

export default function CatCard({ cat }: CatCardProps) {
  return (
    <Link className="rounded-xl overflow-hidden border" href={`/cat/${cat.id}`}>
      <Image
        src={cat?.url}
        alt={"A cool cat"}
        className={`w-full h-64 object-cover`}
        width={cat.width}
        height={cat.height}
      />
      <p className="text-center text-sm p-2 border-t">
        {cat.breeds.length === 0
          ? "Just a very cool cat"
          : `Beautiful ${cat.breeds[0]?.name}`}
      </p>
    </Link>
  );
}
