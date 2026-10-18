import { useMemo, useState } from "react";

type Movie = {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: string;
  description: string;
  poster: string;
};

const movies: Movie[] = [
  { id: "dune2", title: "Dune: Part Two", year: 2024, genre: "Sci-Fi", rating: "8.5", description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.", poster: "photo-1446776811953-b23d57bd21aa" },
  { id: "interstellar", title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: "8.7", description: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.", poster: "photo-1451187580459-43490279c0fa" },
  { id: "spiderverse", title: "Across the Spider-Verse", year: 2023, genre: "Animation", rating: "8.6", description: "Miles Morales meets a team of Spider-People charged with protecting the multiverse.", poster: "photo-1534796636912-3b95b3ab5986" },
  { id: "oppenheimer", title: "Oppenheimer", year: 2023, genre: "Drama", rating: "8.3", description: "The story of J. Robert Oppenheimer and his role in developing the atomic bomb.", poster: "photo-1519608487953-e999c86e7455" },
  { id: "batman", title: "The Batman", year: 2022, genre: "Action", rating: "7.8", description: "Batman investigates corruption in Gotham City while pursuing a mysterious serial killer.", poster: "photo-1519608487953-e999c86e7455" },
  { id: "everything", title: "Everything Everywhere All at Once", year: 2022, genre: "Adventure", rating: "7.8", description: "An exhausted laundromat owner becomes the unlikely hero of a multiverse-spanning adventure.", poster: "photo-1462331940025-496dfbfc7564" },
  { id: "arrival", title: "Arrival", year: 2016, genre: "Sci-Fi", rating: "7.9", description: "A linguist works to communicate with mysterious spacecraft that have arrived on Earth.", poster: "photo-1462331940025-496dfbfc7564" },
  { id: "blackpanther", title: "Black Panther", year: 2018, genre: "Action", rating: "7.3", description: "T'Challa returns home to Wakanda to take his place as king and protect his nation.", poster: "photo-1534796636912-3b95b3ab5986" },
  { id: "coco", title: "Coco", year: 2017, genre: "Animation", rating: "8.4", description: "A young musician journeys to the Land of the Dead to uncover his family's history.", poster: "photo-1470252649378-9c29740c9fa8" },
  { id: "knivesout", title: "Knives Out", year: 2019, genre: "Mystery", rating: "7.9", description: "A detective investigates the death of a celebrated crime novelist and his eccentric family.", poster: "photo-1519682337058-a94d519337bc" },
  { id: "topgun", title: "Top Gun: Maverick", year: 2022, genre: "Action", rating: "8.2", description: "Maverick trains a new generation of pilots for a dangerous mission.", poster: "photo-1517976487492-5750f3195933" },
  { id: "soul", title: "Soul", year: 2020, genre: "Animation", rating: "8.0", description: "A musician explores the meaning of life after an unexpected detour from his plans.", poster: "photo-1470252649378-9c29740c9fa8" },
];

const genres = ["All genres", ...Array.from(new Set(movies.map((movie) => movie.genre)))];

function Poster({ movie }: { movie: Movie }) {
  return (
    <div className="poster" style={{ backgroundImage: `linear-gradient(180deg,rgba(8,12,24,.05),rgba(8,12,24,.8)),url(https://images.unsplash.com/${movie.poster}?auto=format&fit=crop&w=700&q=80)` }}>
      <span className="poster-label">CINEMA / CLUB</span>
      <span className="poster-title">{movie.title}</span>
      <span className="poster-year">{movie.year} · {movie.genre}</span>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<"discover" | "favourites">("discover");
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All genres");
  const [favourites, setFavourites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("cinema-club-favourites") ?? "[]") as string[]; }
    catch { return []; }
  });
  const [selected, setSelected] = useState<Movie | null>(null);

  const visibleMovies = useMemo(() => movies.filter((movie) => {
    const matchesQuery = `${movie.title} ${movie.genre} ${movie.year}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesGenre = genre === "All genres" || movie.genre === genre;
    const matchesPage = page === "discover" || favourites.includes(movie.id);
    return matchesQuery && matchesGenre && matchesPage;
  }), [query, genre, page, favourites]);

  function toggleFavourite(id: string) {
    const next = favourites.includes(id) ? favourites.filter((item) => item !== id) : [...favourites, id];
    setFavourites(next);
    localStorage.setItem("cinema-club-favourites", JSON.stringify(next));
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setPage("discover"); }}>
          <span className="brand-icon">✦</span><span>reel<span className="brand-light">space</span></span>
        </a>
        <div className="side-caption">YOUR SPACE</div>
        <button className={`nav-link ${page === "discover" ? "active" : ""}`} onClick={() => setPage("discover")}><span>⌂</span> Discover <span className="nav-arrow">↗</span></button>
        <button className={`nav-link ${page === "favourites" ? "active" : ""}`} onClick={() => setPage("favourites")}><span>♡</span> My watchlist <span className="count">{favourites.length}</span></button>
        <div className="sidebar-note"><div className="note-icon">✧</div><strong>Your next favourite<br />is waiting.</strong><p>Save films you want to remember and make movie night easier.</p><button onClick={() => setPage("discover")}>Explore films <span>→</span></button></div>
        <div className="profile"><div className="avatar">B</div><div><strong>Movie enthusiast</strong><span>Free account</span></div><span className="more">•••</span></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{page === "discover" ? "Discover" : "My watchlist"}</strong></div>
          <div className="topbar-right"><span className="status-dot" /> Your personal cinema <span className="top-avatar">B</span></div>
        </header>

        <section className="hero">
          <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> THE MOVIE DISCOVERY SPACE</span>
            <h1>{page === "discover" ? <>Stories worth<br /><em>staying up for.</em></> : <>Your personal<br /><em>watchlist.</em></>}</h1>
            <p>{page === "discover" ? "A little inspiration for your next movie night. Find something brilliant, save it, and make it yours." : "All the films you've saved in one place. Your next movie night starts here."}</p>
            <div className="hero-stats"><div><strong>{movies.length.toString().padStart(2, "0")}</strong><span>Curated picks</span></div><div className="stat-divider" /><div><strong>{favourites.length.toString().padStart(2, "0")}</strong><span>In your watchlist</span></div><div className="stat-divider" /><div><strong>4.8<span className="star"> ★</span></strong><span>Community mood</span></div></div>
          </div>
          <div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="art-sun" /><div className="art-moon" /><div className="art-card art-card-back">FRAME<br /><b>YOUR</b><br />STORY</div><div className="art-card art-card-front"><span>VOL. 01 / 2026</span><strong>THE<br /><i>ART OF</i><br />ESCAPE</strong><small>A GOOD FILM<br />CHANGES EVERYTHING.</small></div><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span></div>
        </section>

        <section className="catalog">
          <div className="section-heading"><div><span className="section-kicker">HANDPICKED FOR YOU</span><h2>{page === "discover" ? "Find your next favourite" : "Saved for later"} <span>↘</span></h2><p>Good stories, great company, unforgettable nights.</p></div><div className="result-count">{visibleMovies.length} FILMS <span>·</span> UPDATED TODAY</div></div>
          <div className="filters"><label className="search-box"><span>⌕</span><input aria-label="Search movies" placeholder="Search titles, genres, years..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>↵</kbd></label><label className="genre-select"><span>Genre</span><select aria-label="Filter by genre" value={genre} onChange={(event) => setGenre(event.target.value)}>{genres.map((item) => <option key={item}>{item}</option>)}</select></label><button className="filter-reset" onClick={() => { setQuery(""); setGenre("All genres"); }}>Reset filters ↺</button></div>
          {visibleMovies.length > 0 ? <div className="movie-grid">{visibleMovies.map((movie) => <article className="movie-card" key={movie.id}><button className={`favourite-button ${favourites.includes(movie.id) ? "is-favourite" : ""}`} aria-label={favourites.includes(movie.id) ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`} onClick={() => toggleFavourite(movie.id)}>{favourites.includes(movie.id) ? "♥" : "♡"}</button><button className="poster-button" onClick={() => setSelected(movie)} aria-label={`View details for ${movie.title}`}><Poster movie={movie} /></button><div className="movie-info"><div className="movie-meta"><span>{movie.year}</span><span className="meta-dot">·</span><span>{movie.genre}</span><span className="rating">★ {movie.rating}</span></div><button className="movie-title" onClick={() => setSelected(movie)}>{movie.title}</button><button className="details-link" onClick={() => setSelected(movie)}>View details <span>↗</span></button></div></article>)}</div> : <div className="empty-state"><span>♡</span><h3>{page === "favourites" ? "Your watchlist is waiting." : "No films found."}</h3><p>{page === "favourites" ? "Tap the heart on a film to save it here." : "Try another title or reset your filters."}</p><button onClick={() => { setPage("discover"); setQuery(""); setGenre("All genres"); }}>Explore films</button></div>}
        </section>
        <footer><span>✦ REELSPACE</span><span>Made for people who love a good story.</span><span>DEMO CATALOGUE · 2026</span></footer>
      </main>

      {selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details">×</button><Poster movie={selected} /><div className="modal-copy"><span className="section-kicker">FILM DETAILS</span><h2 id="detail-title">{selected.title}</h2><p className="modal-meta">{selected.year} · {selected.genre} · ★ {selected.rating}</p><p>{selected.description}</p><button className="save-button" onClick={() => toggleFavourite(selected.id)}>{favourites.includes(selected.id) ? "♥ Saved to watchlist" : "♡ Add to watchlist"}</button></div></section></div>}
    </div>
  );
}
