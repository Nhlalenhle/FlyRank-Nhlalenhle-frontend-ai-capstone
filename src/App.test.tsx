import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("Reelspace movie discovery", () => {
  it("filters the catalogue by a search query", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByRole("textbox", { name: "Search movies" }), "interstellar");
    expect(screen.getByRole("button", { name: "Interstellar" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Coco" })).not.toBeInTheDocument();
  });

  it("filters by genre", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByRole("combobox", { name: "Filter by genre" }), "Animation");
    expect(screen.getByRole("button", { name: "Coco" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Interstellar" })).not.toBeInTheDocument();
  });

  it("adds a film to the watchlist and updates the count", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Add Dune: Part Two to watchlist" }));
    expect(screen.getByRole("button", { name: "Remove Dune: Part Two from watchlist" })).toBeInTheDocument();
    expect(screen.getByText("01", { selector: ".hero-stats strong" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("cinema-club-favourites") ?? "[]")).toContain("dune2");
  });

  it("shows an empty state when the search has no matches", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByRole("textbox", { name: "Search movies" }), "not-a-real-film");
    expect(screen.getByText("No films found.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset filters" })).toBeInTheDocument();
  });

  it("opens and closes the movie details dialog", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "View details for Interstellar" }));
    expect(screen.getByRole("dialog", { name: "Interstellar" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close details" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
