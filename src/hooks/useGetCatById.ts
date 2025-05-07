import { useQuery } from "@tanstack/react-query";
import { Cat } from "@/types/cat";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export function useGetCatById(id: string) {
  return useQuery<Cat, Error>({
    queryKey: ["cat", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/v1/images/${id}`, {
        headers: {
          "x-api-key": API_KEY || "",
        },
      });

      if (!res.ok) throw new Error("Gato não encontrado");

      return res.json();
    },
    enabled: !!id,
  });
}
