import { useInfiniteQuery } from "@tanstack/react-query";
import { Cat } from "@/types/cat";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export function useGetCats(categoryId?: number) {
  return useInfiniteQuery<Cat[], Error>({
    queryKey: ["cats", categoryId],
    queryFn: async ({ pageParam = 0 }) => {
      const page = pageParam as number;

      const params = new URLSearchParams({
        limit: "12",
        page: page.toString(),
        ...(categoryId ? { category_ids: categoryId.toString() } : {}),
      });

      const response = await fetch(`${API_URL}/v1/images/search?${params}`, {
        headers: {
          "x-api-key": API_KEY || "",
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar gatos");

      return await response.json();
    },
    getNextPageParam: (_lastPage, pages) => pages.length,
    initialPageParam: 0,
  });
}
