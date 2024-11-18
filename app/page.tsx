import Image from "next/image";
import { customFetch } from "./ajax";
import { genres } from "./data";
import MovieGrid from "./components/MovieGrid";
import SearchMovie from "./components/SearchMovie";
import Favorite from "./components/Favorite";
import { Movie, PopularMovies } from "./types";
import Spinner from "./components/Spinner";

export default async function Home() {
  let data: PopularMovies | null = null;
  let firstData: Movie | null | undefined = null;
  let error: string | null = null;

  try {
    data = await customFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/popular?language=en-US&page=1`,
      {},
      "no-cache"
    );
    firstData = data?.results?.[0];
  } catch {
    error = "Error fetching data";
  }

  if (error) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div>{error}</div>
      </div>
    );
  }

  if (!data || !firstData) {
    return (
      <div className="grid place-items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pt-20 mb-8">
      <div className="relative w-full min-h-screen overflow-hidden">
        <Image
          width={500}
          height={500}
          src={`https://image.tmdb.org/t/p/w500/${firstData?.backdrop_path}`}
          alt="Background"
          className="w-3/4 h-1/2 object-center m-auto"
        />
        <div className="absolute top-0 w-full h-full left-0 text-white bg-black bg-opacity-55 flex justify-start pt-64 px-10">
          <div className="flex flex-col gap-y-8">
            <h2 className="text-white font-bold lg:text-6xl md:text-5xl text-3xl">
              {firstData?.original_title}
            </h2>
            <p className="text-[#e3dace] lg:text-2xl md:text-xl text-lg lg:w-1/2 md:w-3/4 w-10/12">
              {firstData?.overview}
            </p>
            <div className="flex items-center gap-x-3">
              {firstData?.genre_ids?.map((id: number, index) => (
                <div key={id} className="flex items-center gap-x-3">
                  <p>{genres?.find((genre) => genre?.id == id)?.name}</p>
                  {index !== firstData?.genre_ids?.length - 1 && (
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-3 items-center">
                <span>Release Date:</span>
                <span>{firstData?.release_date}</span>
              </div>
              <div className="flex gap-x-3 items-center">
                <span>Vote Count:</span>
                <span>{firstData?.vote_count}</span>
              </div>
              <div className="flex gap-x-3 items-center">
                <span>Vote Average:</span>
                <span>{firstData?.vote_average}</span>
              </div>
            </div>
            <Favorite item={firstData} />
          </div>
        </div>
      </div>
      {/* Search Compoent for movies */}
      <SearchMovie />
      {/* Grid */}
      <h2 className="text-3xl text-start font-semibold text-white mt-5 pl-10">
        Popular Movies
      </h2>
      <MovieGrid movie_data={data?.results} />
    </div>
  );
}
