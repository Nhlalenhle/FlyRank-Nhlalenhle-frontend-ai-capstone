# Prompt log — Week 3

These prompts record the AI instructions used to guide this implementation.

## Prompt 1 — Plan
> Build an independent React + TypeScript movie discovery application inspired by the feature category of a movie search app. Keep the scope appropriate for a beginner foundations assignment. Identify core user flows and keep the implementation easy to explain.

## Prompt 2 — Build
> Implement a polished, responsive movie catalogue using the existing React, TypeScript, and Vite setup. Include a left navigation sidebar, discovery page, search field, genre filtering, movie cards with year/genre/rating, a watchlist button, and a movie details dialog. Use typed local sample data so the app runs without external API keys. Do not add a UI component library.

## Prompt 3 — Watchlist behaviour
> Use React state to switch between Discover and My Watchlist. Let users add and remove movies from the watchlist. Persist selected movie IDs in localStorage and update the count. Handle invalid localStorage JSON safely.

## Prompt 4 — Review accessibility
> Review the app for beginner-level maintainability and usability. Ensure search and filter controls have accessible labels, heart buttons describe their action, the details overlay has dialog semantics, and empty results have a clear recovery action. Do not claim tests pass unless they have actually been run.

## Prompt 5 — Responsive styling
> Improve the visual design with a dark editorial cinema aesthetic, a lime accent, clear typography, consistent spacing, and responsive layouts for desktop, tablet, and mobile. Keep styling in the existing CSS file and avoid introducing a CSS framework.

## Follow-up review checklist
- Search by partial title, genre, and year.
- Filter by genre and reset filters.
- Save and remove a movie; confirm the count updates.
- Refresh and confirm the watchlist is restored.
- Test the empty watchlist and no-results states.
- Open and close movie details using controls and backdrop.
- Check a narrow mobile width.
- Run `npm test` and `npm run build` locally; record actual results before submission.
