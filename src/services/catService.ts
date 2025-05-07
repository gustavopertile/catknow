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
    ...(categoryId ? { category_ids: categoryId.toString() } : {}),
  });

  const response = await fetch(`${API_URL}/v1/images/search?${params}`, {
    headers: {
      "x-api-key": API_KEY || "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cats");
  }

  return await response.json();
}

export async function fetchCatById(id: string): Promise<Cat> {
  const res = await fetch(`${API_URL}/v1/images/${id}`, {
    headers: {
      "x-api-key": API_KEY || "",
    },
  });

  if (!res.ok) {
    throw new Error("Cat not found");
  }

  return await res.json();
}
