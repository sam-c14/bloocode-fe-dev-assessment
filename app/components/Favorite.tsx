"use client";
import { FC, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Heart from "../icons/Heart";
import { Movie } from "../types";

type FavoriteProps = {
  item: Movie;
};

const Favorite: FC<FavoriteProps> = ({ item }) => {
  const { storedValue, setValue } = useLocalStorage<Movie[]>(
    "favoriteItems",
    []
  );

  const isFavorite = useMemo(
    () => !!storedValue?.find((value) => value.id === item.id),
    [storedValue]
  );

  const addItem = () => {
    setValue([...storedValue, item]);
  };
  const removeItem = () => {
    // Filter out the item from the array and update localStorage
    setValue(storedValue.filter((fav) => fav?.id !== item?.id));
  };

  const handleToggleFavorite = (isFavorite: boolean) => {
    if (!isFavorite) addItem();
    else removeItem();
  };

  return (
    <div className="flex items-center gap-x-4 mt-5">
      <h4 className="text-xl font-semibold">Add to Favorites</h4>
      <button
        className="border border-white rounded-full p-4 sm:hover:scale-105"
        onClick={() => handleToggleFavorite(isFavorite)}
      >
        <Heart fillColor={isFavorite ? "#FF5722" : undefined} />
      </button>
    </div>
  );
};

export default Favorite;
