import React from "react";
import MovieGrid from "../components/MovieGrid";

const Favorites = () => {
  return (
    <div className="min-h-screen pt-16">
      <MovieGrid useFavorites />
    </div>
  );
};

export default Favorites;
