"use client";
import { useState } from "react";
import { customFetch } from "../ajax";
import { debounce } from "../utils";
import MovieGrid from "./MovieGrid";
import { Movie } from "../types";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const SearchMovie = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = debounce(async (value: string) => {
    if (!value.length) {
      return setFilteredMovies(null);
    }

    setMovieTitle(value);
    setIsLoading(true);
    try {
      const response = await customFetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&language=en-US&page=1`
      );
      setFilteredMovies(response?.results);
    } catch {
      toast.error("There was an issue fetching the movie you're looking for");
    } finally {
      setIsLoading(false);
    }
  }, 2000);

  return (
    <div className="w-full">
      <div className="flex gap-x-5 items-center lg:flex-nowrap flex-wrap px-10 gap-y-3">
        <span className="lg:text-xl text-base text-white font-semibold">
          Search For Movies By Title:
        </span>
        <input
          type="text"
          className="py-3 pl-2 rounded-md shadow-md focus:outline-none focus:ring-0 focus:border-none lg:w-3/4 w-full bg-slate-100"
          placeholder="Enter the title of the movie"
          onChange={({ currentTarget }) =>
            handleInputChange(currentTarget.value)
          }
        />
      </div>
      {isLoading && (
        <div className="grid place-items-center mt-5">
          <Spinner />
        </div>
      )}
      {filteredMovies && (
        <div className="flex flex-col gap-y-2 mt-4">
          <h2 className="text-3xl text-start font-semibold text-white pl-10">
            These are the Results for {movieTitle}
          </h2>
          <MovieGrid movie_data={filteredMovies} />
        </div>
      )}
    </div>
  );
};

export default SearchMovie;
