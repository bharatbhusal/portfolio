import type { ApiResponse } from "@/types/api";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  const res = await fetch(endpoint, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Request failed");
  }

  return json;
}
