import { Movie } from "../types";

export const customFetch = async (
  url: string,
  options?: any,
  cache = "force-cache"
) => {
  try {
    const fetchOptions = {
      ...options,
      headers: {
        ...options?.headers,
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        "Cache-Control": cache,
      },
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

export const getMoreMovies = async (page: number): Promise<Movie[]> => {
  try {
    const response = await customFetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      {},
      "no-cache"
    );
    return response?.results;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
