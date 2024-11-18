import { Movie } from "../types";

export const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const mockMovies: Movie[] = [
  {
    adult: false,
    backdrop_path: "/path/to/backdrop.jpg",
    genre_ids: [1, 2],
    id: 1,
    original_language: "en",
    original_title: "Movie 1",
    overview: "Overview of movie 1",
    popularity: 10,
    poster_path: "/path/to/poster1.jpg",
    release_date: "2024-01-01",
    title: "Movie 1",
    video: false,
    vote_average: 8,
    vote_count: 200,
  },
  {
    adult: false,
    backdrop_path: "/path/to/backdrop2.jpg",
    genre_ids: [3, 4],
    id: 2,
    original_language: "en",
    original_title: "Movie 2",
    overview: "Overview of movie 2",
    popularity: 12,
    poster_path: "/path/to/poster2.jpg",
    release_date: "2024-02-01",
    title: "Movie 2",
    video: false,
    vote_average: 7,
    vote_count: 150,
  },
];

export const mockGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
];

export const results = [
  {
    backdrop_path: "some-path.jpg",
    original_title: "Test Movie",
    overview: "This is a test movie",
    genre_ids: [28, 12],
    release_date: "2024-01-01",
    vote_count: 100,
    vote_average: 8.5,
  },
];
