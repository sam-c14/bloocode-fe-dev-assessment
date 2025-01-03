"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";
import { getMoreMovies } from "../ajax";
import Spinner from "./Spinner";

type MovieGrid = {
  movie_data?: Movie[];
  useFavorites?: boolean;
};

const MovieGrid = ({ movie_data, useFavorites }: MovieGrid) => {
  const { storedValue, clear } = useLocalStorage<Movie[]>("favoriteItems", []);

  const [movies, setMovies] = useState<Movie[]>(
    useFavorites ? storedValue : movie_data!
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        fetchMore();
      }
    };

    if (!useFavorites) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const fetchMore = async () => {
    setLoading(true);
    try {
      const newMovies = await getMoreMovies(page + 1);
      if (newMovies?.length) {
        setMovies((prev) => [...prev, ...newMovies]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more movies:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const clearAllSavedStores = () => {
    setMovies([]);
    clear();
  };

  return (
    <div>
      {useFavorites && movies?.length && (
        <div className="mt-24 px-10">
          <button
            onClick={clearAllSavedStores}
            className="inline-block uppercase text-blue-800  py-2 px-4 rounded-lg text-base lg:text-2xl md:text-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Clear All
          </button>
        </div>
      )}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 mt-16 gap-7 px-10">
        {movies?.map((data, index) => (
          <MovieCard data={data} key={index} />
        ))}
      </div>
      {loading && (
        <div
          className="grid place-items-center my-16 w-full"
          role="status"
          aria-live="polite"
        >
          <Spinner />
        </div>
      )}
      {!hasMore && <div>No more movies to display.</div>}
      {!movies?.length && useFavorites ? (
        <div className="grid min-h-screen place-items-center text-white sm:text-2xl text-base font-semibold">
          You do not have any favorite stores
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieGrid;
