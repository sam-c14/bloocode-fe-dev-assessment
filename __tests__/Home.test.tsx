import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import { mockGenres, results } from "@/app/data";

jest.mock("@/app/api", () => ({
  ...jest.requireActual("@/app/api"),
  customFetch: jest.fn(),
}));

jest.mock("@/app/data", () => ({
  mockGenres,
}));

jest.mock("@/app/components/MovieGrid", () => () => (
  <div>Mocked MovieGrid</div>
));
jest.mock("@/app/components/SearchMovie", () => () => (
  <div>Mocked SearchMovie</div>
));
jest.mock("@/app/components/Favorite", () => () => <div>Mocked Favorite</div>);
jest.mock("@/app/components/Spinner", () => () => <div>Mocked Spinner</div>);

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders popular movies and first movie details", async () => {
    const { customFetch } = require("@/app/api");
    customFetch.mockResolvedValue({
      results,
    });

    render(await Home());
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("This is a test movie")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
    expect(screen.getByText("Release Date:")).toBeInTheDocument();
    expect(screen.getByText("Vote Count:")).toBeInTheDocument();
    expect(screen.getByText("Vote Average:")).toBeInTheDocument();
    expect(screen.getByText("Mocked MovieGrid")).toBeInTheDocument();
  });
});
