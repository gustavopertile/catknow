import { Cat } from "@/types/cat";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CatCardProps = {
  cat: Cat;
};

export default function CatCard({ cat }: CatCardProps) {
  const router = useRouter();

  return (
    <div
      className="rounded-xl overflow-hidden border cursor-pointer"
      onClick={() => router.push(`/cat/${cat.id}`)}
    >
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
    </div>
  );
}
