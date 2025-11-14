import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
// Importa un'icona di Play, assumendo che tu stia usando react-icons o un equivalente
// import { FaPlay } from 'react-icons/fa'; 

export default function MovieDetail() {

  const { id } = useParams()

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const ACCESS_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;

  // Funzione per formattare importi (es. Budget/Ricavi)
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };


  async function getMovieDetail() {
    // Ho aggiunto anche 'append_to_response=credits' per recuperare il cast e il regista in una sola chiamata
    const response = await fetch(`${BASE_URL}/movie/${id}?language=it-IT&append_to_response=credits`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella chiamata API. Il film potrebbe non esistere o l'ID è sbagliato.");
    }

    const data = await response.json();

    return data;
  }

  useEffect(() => {

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {

        if (!id)
          return;

        const results = await getMovieDetail();

        console.log("results:", results);

        setMovie(results);

      } catch (err) {
        console.error("Errore durante il fetch:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);


  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Funzioni helper per i dettagli del cast e crew
  const getDirector = (credits) => {
    if (!credits || !credits.crew) return 'N/A';
    const director = credits.crew.find(person => person.job === 'Director');
    return director ? director.name : 'N/A';
  };

  const getMainCast = (credits) => {
    if (!credits || !credits.cast) return [];
    return credits.cast.slice(0, 5).map(c => c.name).join(', '); // I primi 5
  };


  if (isLoading) {
    return <div className='bg-black text-white min-h-screen flex items-center justify-center'><p className="text-xl">Caricamento in corso...</p></div>;
  }

  if (error) {
    return <div className='bg-black text-white min-h-screen p-8'><p className="h1 text-3xl text-red-500 mb-4">Errore di Caricamento ❌</p><p>{error}</p></div>;
  }

  if (!movie.id) {
     return <div className='bg-black text-white min-h-screen flex items-center justify-center'><p className="text-xl">Dettagli del film non disponibili.</p></div>;
  }


  return (
    <section className='bg-black text-white min-h-screen'>

      {/* Hero Section - Desktop con Backdrop */}
      <div className="relative h-screen hidden md:block">

        {/* Backdrop con Sfumature per fusione col background nero */}
        <div className="absolute inset-0">
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          {/* Sfumature: dal basso (per il testo) e dai lati (per l'immersione) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-end px-6 md:px-12 pb-20">
          <div className="max-w-3xl">

            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">{movie.title}</h1>

            {movie.tagline && (
              <p className="text-xl md:text-2xl text-gray-300 mb-6 italic drop-shadow">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-6 text-sm md:text-base">
              {/* Voto utente migliorato con icona */}
              <span className="text-yellow-400 font-semibold flex items-center">
                <span className="text-2xl mr-1">★</span> {Math.round(movie.vote_average * 10) / 10} / 10
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">
                {movie.adult ? '18+' : '13+'}
              </span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">HD</span>
            </div>
            
            {/* Bottone Play/Azione Principale */}
            <button className="flex items-center bg-white text-black font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition duration-200 mb-8">
               {/* <FaPlay className="mr-2" /> */}
               Guarda Ora
            </button>


            {/* Generi */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                {movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    <span className="text-sm text-gray-400">{genre.name}</span>
                    {index < movie.genres.length - 1 && <span className="text-gray-500 mx-2">•</span>}
                  </span>
                ))}
              </div>
            )}

            <p className="text-base md:text-xl leading-relaxed max-w-xl">{movie.overview}</p>

          </div>
        </div>
      </div>

      {/* Mobile Layout - Poster + Info in Column */}
      <div className="md:hidden pt-16 px-4">
        <div className="flex flex-col items-center">

          {/* Poster */}
          {movie.poster_path && (
             <img
               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
               alt={movie.title}
               className="w-64 rounded-lg shadow-2xl mb-6"
             />
          )}

          {/* Info -- */}
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-3 text-center">{movie.title}</h1>

            {movie.tagline && (
              <p className="text-base text-gray-300 mb-4 italic text-center">{movie.tagline}</p>
            )}
            
            {/* Bottone Play/Azione Principale Mobile */}
            <div className="flex justify-center mb-6">
                 <button className="flex items-center bg-white text-black font-bold py-2 px-4 rounded-lg text-base hover:bg-gray-300 transition duration-200">
                    {/* <FaPlay className="mr-2" /> */}
                    Guarda Ora
                 </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 mb-4 text-sm">
              <span className="text-yellow-400 font-semibold flex items-center">
                 <span className="text-xl mr-1">★</span> {Math.round(movie.vote_average * 10) / 10} / 10
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">
                {movie.adult ? '18+' : '13+'}
              </span>
              <span>{formatRuntime(movie.runtime)}</span>
            </div>

            {/* Generi Mobile */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {movie.genres.map((genre, index) => (
                  <span key={genre.id} className="text-sm text-gray-400">
                    {genre.name}{index < movie.genres.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm leading-relaxed text-gray-300">{movie.overview}</p>

          </div>
        </div>
      </div>
      

      {/* Dettagli Aggiuntivi */}
      <div className="px-4 md:px-12 py-2 md:py-6">
        <h2 className="text-xl md:text-3xl font-semibold mb-4 text-center md:text-left">
          Dettagli Aggiuntivi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-sm md:text-base">
          
          {/* Colonna 1: Cast e Regista */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 font-medium">Regia:</p>
              <p className="font-bold text-lg">{getDirector(movie.credits)}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Cast Principale:</p>
              <p className="font-medium">{getMainCast(movie.credits)}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Lingua Originale:</p>
              <p className="font-medium">{movie.original_language}</p>
            </div>
          </div>
          
          {/* Colonna 2: Finanze e Stato */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 font-medium">Budget:</p>
              <p className="font-medium">{formatCurrency(movie.budget)}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Ricavi:</p>
              <p className="font-medium">{formatCurrency(movie.revenue)}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Stato:</p>
              <p className="font-medium">{movie.status}</p>
            </div>
          </div>
          
        </div>
      </div>
      

      {/* Production Section  */}
      <div className="px-4 md:px-12 py-8 md:py-12">
        {movie.production_companies && movie.production_companies.length > 0 && (
          <div>
            <h2 className="text-xl md:text-3xl font-semibold mb-6 text-center md:text-left">
              Società di Produzione
            </h2>
            <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center md:justify-start">
              {movie.production_companies.map((company) => (
                <div key={company.id} className="flex flex-col items-center max-w-[150px]">
                  {company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      // 'invert' per loghi bianchi su sfondo scuro
                      className="h-8 md:h-12 object-contain mb-2 filter brightness-0 invert" 
                    />
                  ) : (
                    <div className="text-gray-400 text-sm md:text-base mb-2 text-center">
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
          Vai alla pagina dedicata a questo film su <a target='_blank' href={`https://www.imdb.com/it/title/${movie.imdb_id}`} className="font-bold underline text-blue-400 hover:text-blue-500 transition">IMDB</a>
        </p>
      </div>

    </section>
  )
}