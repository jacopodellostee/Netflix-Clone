import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import search_icon from "../assets/search-icon.svg";
import SearchResultItem from "./SearchResultItem";

export default function SearchBar({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchRef = useRef(null);

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const ACCESS_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  async function handleSearch(q) {
    setQuery(q);

    if (q.trim().length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/search/multi?query=${encodeURIComponent(q)}&include_adult=false&language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      const data = await res.json();

      if (!data.results) {
        setResults([]);
        return;
      }

      const validResults = data.results
        .filter((item) => item.media_type === "movie" || item.media_type === "tv")
        .slice(0, 5);

      setResults(validResults);
      if (validResults.length > 0) setOpen(true);
    } catch (err) {
      console.error("Errore ricerca:", err);
      setResults([]);
    }
  }

  const handleResultClick = (item) => {
    setOpen(false);
    setQuery("");

    if (item.media_type === "movie") {
      navigate(`/movies/${item.id}`);
    } else if (item.media_type === "tv") {
      navigate(`/tv/${item.id}`);
    }

    if (onSearch) onSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      setOpen(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
      if (onSearch) onSearch();
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="flex items-center bg-zinc-900/90 rounded border border-zinc-700 focus-within:border-white transition-all overflow-hidden">
        <div className="pl-3 py-1.5">
          <img
            src={search_icon}
            alt="search"
            className="w-4 h-4 opacity-70"
          />
        </div>
        <input
          type="text"
          placeholder="Enter a title..."
          className="bg-transparent border-none outline-none text-white px-3 py-1.5 w-full text-sm placeholder-zinc-500"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setOpen(true);
          }}
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-black rounded shadow-2xl overflow-hidden z-50 border border-zinc-800 ring-1 ring-white/10">
          {results.map((item) => (
            <SearchResultItem
              key={item.id}
              item={item}
              onClick={handleResultClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}