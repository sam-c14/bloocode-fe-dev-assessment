import Image from "next/image";
import { customFetch } from "@/app/ajax";
import { genres } from "@/app/data";
import Favorite from "@/app/components/Favorite";
import { CastMember, MovieDetails as MovieDetailsT } from "@/app/types";
import Spinner from "@/app/components/Spinner";

export default async function MovieDetails({ params }: { params: any }) {
  let data: MovieDetailsT | null = null;
  let movieCast: string = "";
  const routeParams = await params;
  const movie_id = routeParams?.id;
  let error: string | null = null;

  try {
    const [movieData, movieCredits] = await Promise.all([
      customFetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
        {},
        "no-cache"
      ),
      customFetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`,
        {},
        "no-cache"
      ),
    ]);
    data = movieData;
    movieCast = movieCredits?.cast
      ?.slice(0, 5)
      ?.map((people: CastMember) => people.name)
      ?.join(", ");
  } catch (error) {
    error = "Error fetching data";
  }

  if (error) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div>{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="grid place-items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pt-20 mb-16">
      <div className="relative w-full min-h-[75dvh]">
        {/* Image */}
        <Image
          src={`https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`}
          width={500}
          height={500}
          alt="Background"
          className="w-full h-1/2 object-center m-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-transparent to-black bg-opacity-80 z-10" />
        {/* Content */}
        <div className="absolute top-0 w-full h-full left-0 text-white flex justify-start pt-96 px-10 z-20 bg-black bg-opacity-55 ">
          <div className="flex flex-col gap-y-8">
            <h2 className="text-white font-bold sm:text-6xl text-3xl">
              {data?.original_title}
            </h2>
            <p className="text-[#e3dace] sm:text-2xl text-lg lg:w-1/2 md:w-3/4 w-10/12">
              {data?.overview}
            </p>
            <div className="flex items-center gap-x-3">
              {data?.genres?.map(
                (item: { id: number; name: string }, index) => (
                  <div key={item.id} className="flex items-center gap-x-3">
                    <p>{genres?.find((genre) => genre?.id == item.id)?.name}</p>
                    {index !== data?.genres?.length! - 1 && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-3 items-center">
                <span className="sm:text-lg text-base">Release Date:</span>
                <span className="sm:text-base text-sm text-slate-200">
                  {data?.release_date}
                </span>
              </div>
              <div className="flex gap-x-3 items-center">
                <span className="sm:text-lg text-base">Vote Count:</span>
                <span className="sm:text-base text-sm text-slate-200">
                  {data?.vote_count}
                </span>
              </div>
              <div className="flex gap-x-3 items-center">
                <span className="sm:text-lg text-base">Vote Average:</span>
                <span className="sm:text-base text-sm text-slate-200">
                  {data?.vote_average}
                </span>
              </div>
              <div className="flex gap-x-3 items-center">
                <span className="sm:text-lg text-base">Starring:</span>
                <span className="flex items-center sm:text-base text-sm text-slate-200">
                  {movieCast}...
                </span>
              </div>
            </div>
            {/* Favorites */}
            <Favorite item={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
