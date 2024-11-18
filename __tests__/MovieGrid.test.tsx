import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieGrid from "@/app/components/MovieGrid";
import { getMoreMovies } from "@/app/ajax";
import { mockMovies } from "@/app/data";

jest.mock("@/app/api", () => ({
  getMoreMovies: jest.fn(),
}));

describe("MovieGrid", () => {
  beforeEach(() => {
    (getMoreMovies as jest.Mock).mockReset();
  });

  it("renders with movie_data", () => {
    render(<MovieGrid movie_data={mockMovies} />);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("displays a spinner when loading", () => {
    render(<MovieGrid movie_data={mockMovies} />);

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("loads more movies on scroll", async () => {
    (getMoreMovies as jest.Mock).mockResolvedValueOnce([
      {
        adult: false,
        backdrop_path: "/path/to/backdrop3.jpg",
        genre_ids: [1, 2],
        id: 3,
        original_language: "en",
        original_title: "Movie 3",
        overview: "Overview of movie 3",
        popularity: 20,
        poster_path: "/path/to/poster3.jpg",
        release_date: "2024-03-01",
        title: "Movie 3",
        video: false,
        vote_average: 8.5,
        vote_count: 300,
      },
    ]);

    render(<MovieGrid movie_data={mockMovies} />);

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    await waitFor(() =>
      expect(screen.getByText("Movie 3")).toBeInTheDocument()
    );
  });

  it("displays 'No more movies' when there are no more movies", async () => {
    (getMoreMovies as jest.Mock).mockResolvedValueOnce([]);

    render(<MovieGrid movie_data={mockMovies} />);

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    await waitFor(() =>
      expect(screen.getByText("No more movies to display.")).toBeInTheDocument()
    );
  });
});
