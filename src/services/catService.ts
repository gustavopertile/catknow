import { Cat } from "@/types/cat";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchCats(
  page: number,
  categoryId?: number
): Promise<Cat[]> {
  const params = new URLSearchParams({
    limit: "12",
    page: page.toString(),
    ...(categoryId && { category_ids: categoryId.toString() }),
  });

  const response = await fetch(`${API_URL}/v1/images/search?${params}`, {
    headers: {
      "x-api-key": API_KEY || "",
    },
  });

  if (!response.ok) throw new Error("Erro ao buscar gatos");

  return await response.json();
}
