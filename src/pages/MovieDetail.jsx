import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

export default function MovieDetail() {

  const { id } = useParams()

  const [movie, setMovie] = useState({});

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const ACCESS_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;

  async function getMovieDetail() {

    // per testing usa 640146
    const response = await fetch(`${BASE_URL}/movie/${id}?language=it-IT`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella chiamata API");
    }

    const data = await response.json();

    return data;
  }

  useEffect(() => {

    async function fetchData() {

      try {

        if (!id)
          return;

        const results = await getMovieDetail();

        console.log("results:", results);

        setMovie(results);

      } catch (error) {
        console.error("Errore durante il fetch:", error);
      }
    }

    fetchData();
  }, [id]);


  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <section className='bg-black text-white min-h-screen'>

      {/* Hero Section - Desktop con Backdrop */}
      <div className="relative h-screen hidden md:block">

        {/* Backdrop per sfumatura */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-end  px-6 md:px-12">
          <div className="max-w-2xl">

            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>

            {movie.tagline && (
              <p className="text-lg md:text-xl text-gray-300 mb-6 italic">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 text-sm">
              <span className="text-green-400 font-semibold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">
                {movie.adult ? '18+' : '13+'}
              </span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">HD</span>
            </div>

            {/* Generi */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                {movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    <span className="text-sm text-gray-300">{genre.name}</span>
                    {index < movie.genres.length - 1 && <span className="text-gray-500 mx-2">•</span>}
                  </span>
                ))}
              </div>
            )}

            <p className="text-base md:text-lg leading-relaxed">{movie.overview}</p>

          </div>
        </div>
      </div>

      {/* Mobile Layout - Poster + Info in Column */}
      <div className="md:hidden pt-16 px-4">
        <div className="flex flex-col items-center">

          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 rounded-lg shadow-2xl mb-6"
          />

          {/* Info -- */}
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-3 text-center">{movie.title}</h1>

            {movie.tagline && (
              <p className="text-base text-gray-300 mb-4 italic text-center">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap justify-center items-center gap-3 mb-4 text-sm">
              <span className="text-green-400 font-semibold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">
                {movie.adult ? '18+' : '13+'}
              </span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">HD</span>
            </div>

            {/* Generi Mobile */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {movie.genres.map((genre, index) => (
                  <span key={genre.id} className="text-sm text-gray-300">
                    {genre.name}{index < movie.genres.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm leading-relaxed  text-gray-300">{movie.overview}</p>

          </div>
        </div>
      </div>

      {/* Production Section  */}
      <div className="px-4 md:px-12 py-8 md:py-12">
        {movie.production_companies && movie.production_companies.length > 0 && (
          <div>
            <h2 className="text-xl md:text-3xl font-semibold mb-4 text-center md:text-left">
              Produzione
            </h2>
            <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center md:justify-start">
              {movie.production_companies.map((company) => (
                <div key={company.id} className="flex flex-col items-center">
                  {company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="h-8 md:h-12 object-contain mb-2 invert"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm md:text-base mb-2">
                      {company.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Link To IMDB  */}
      <div className="px-4 md:px-12 pt-4 pb-8 md:pt-4 md:pb-10">
        <h2 className="text-xl md:text-3xl font-semibold mb-2 text-center md:text-left italic">
          Vuoi Scoprire di Più?
        </h2>

        <p className="text-lg md:text-xl mb-2 text-center md:text-left">
          Vai alla pagina dedicata a questo film su <a target='_blank' href={`https://www.imdb.com/it/title/${movie.imdb_id}`} className="font-bold underline">IMDB</a>
        </p>
      </div>

    </section>
  )
}