import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card"; 

export default function Search() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const ACCESS_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;

  useEffect(() => {
    if (query) {
      fetchFullSearch(query);
    }
  }, [query]);

  async function fetchFullSearch(q) {
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
      
      const filtered = (data.results || []).filter(
        item => item.media_type === "movie" || item.media_type === "tv"
      );
      
      setResults(filtered);
    } catch (err) {
      console.error("Errore nella pagina di ricerca:", err);
    }
  }

  return (
    <div className="min-h-screen text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
            Risultati per: <span className="text-gray-400 font-normal">"{query}"</span>
        </h2>

        {results.length > 0 ? (
          /* Griglia Responsive: 2 col su mobile, 3 tablet, 4/5 desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {results.map((item) => (
               <Card 
                 key={item.id} 
                 media={item} 
                 type="grid" 
               />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
             <p className="text-xl">Nessun risultato trovato.</p>
          </div>
        )}
      </div>
    </div>
  );
}