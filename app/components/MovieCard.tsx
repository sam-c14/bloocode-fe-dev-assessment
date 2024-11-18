import { FC } from "react";
import Link from "next/link";
import { Movie } from "../types";
import Image from "next/image";

type MovieCardProps = {
  data: Movie;
};

const MovieCard: FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="relative border-black border rounded-lg shadow-md overflow-hidden group">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
        width={500}
        height={500}
        alt="poster-img"
        className="w-full h-10/12 rounded-md"
      />
      <div className="absolute lg:top-2/3 md:top-1/2 top-[70%] w-full h-1/2 left-0 text-white bg-black bg-opacity-55 flex justify-start pt-5 pl-5">
        <div className="flex flex-col xl:gap-y-7 gap-y-5">
          <h2 className="text-white font-bold xl:text-3xl text-base">
            {data?.original_title}
          </h2>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-3 items-center xl:text-lg text-xs">
              <span>Release Date:</span>
              <span>{data?.release_date}</span>
            </div>
            <div className="flex gap-x-3 items-center xl:text-lg text-xs">
              <span>Average Rating:</span>
              <span>{data?.vote_average}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-xl font-bold opacity-0 translate-y-full transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Link
          href={`details/${data?.id}`}
          className="transition-all sm:hover:scale-105"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
