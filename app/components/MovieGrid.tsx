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
  const { storedValue } = useLocalStorage<Movie[]>("favoriteItems", []);

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

    window.addEventListener("scroll", handleScroll);
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

  return (
    <div>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 mt-16 gap-7 px-10">
        {movies.map((data, index) => (
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
    </div>
  );
};

export default MovieGrid;
