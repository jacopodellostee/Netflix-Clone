import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
// Assumendo l'uso di un'icona Play (puoi sostituirla con la tua icona preferita)
// import { FaPlay } from 'react-icons/fa'; 

export default function TVSeriesDetail() {

  const { id } = useParams()

  const [tvSeries, setTvSeries] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const ACCESS_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;

  // Funzioni helper per i dettagli del cast e crew
  const getCreators = (credits) => {
    if (!credits || !credits.crew) return 'N/A';
    const creators = credits.crew.filter(person => person.job === 'Creator');
    return creators.length > 0 ? creators.map(c => c.name).join(', ') : 'N/A';
  };

  const getMainCast = (credits) => {
    if (!credits || !credits.cast) return [];
    return credits.cast.slice(0, 5).map(c => c.name).join(', '); // I primi 5
  };


  // Funzione di fetch modificata per includere i crediti
  async function getTVSeriesDetail() {
    // Aggiungo 'append_to_response=credits' per ottenere cast e crew in una sola chiamata
    const response = await fetch(`${BASE_URL}/tv/${id}?language=it-IT&append_to_response=credits`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella chiamata API. La serie TV potrebbe non esistere o l'ID è sbagliato.");
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

        const results = await getTVSeriesDetail();

        console.log("results: " + results);
        
        setTvSeries(results);

      } catch (err) {
        console.error("Errore durante il fetch:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);


  // Funzione per formattare la durata (durata media dell'episodio)
  const formatRuntime = (minutes) => {
    if (!minutes || minutes.length === 0) return 'N/A';
    const runtimeInMinutes = Array.isArray(minutes) ? minutes[0] : minutes;
    
    if (typeof runtimeInMinutes !== 'number' || runtimeInMinutes === 0) return 'N/A';
    
    const hours = Math.floor(runtimeInMinutes / 60);
    const mins = runtimeInMinutes % 60;
    
    return `${hours}h ${mins}m`;
  };

  // Funzione per formattare la data (per le stagioni)
  const formatDate = (dateString) => {
    if (!dateString) return 'Data Sconosciuta';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return dateString;
    }
  };


  if (isLoading) {
    return <div className='bg-black text-white min-h-screen flex items-center justify-center'><p className="text-xl">Caricamento serie TV in corso...</p></div>;
  }

  if (error) {
    return <div className='bg-black text-white min-h-screen p-8'><p className="h1 text-3xl text-red-500 mb-4">Errore di Caricamento ❌</p><p>{error}</p></div>;
  }

  if (!tvSeries.id) {
     return <div className='bg-black text-white min-h-screen flex items-center justify-center'><p className="text-xl">Dettagli della serie TV non disponibili.</p></div>;
  }


  return (
    <section className='bg-black text-white min-h-screen'>

      {/* Hero Section - Desktop con Backdrop */}
      <div className="relative h-screen hidden md:block">

        {/* Backdrop con Sfumature per fusione col background nero */}
        <div className="absolute inset-0">
          {tvSeries.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${tvSeries.backdrop_path}`}
              alt={tvSeries.name}
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

            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">{tvSeries.name}</h1>

            {tvSeries.tagline && (
              <p className="text-xl md:text-2xl text-gray-300 mb-6 italic drop-shadow">{tvSeries.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-6 text-sm md:text-base">
              {/* Voto utente migliorato con icona */}
              <span className="text-yellow-400 font-semibold flex items-center">
                <span className="text-2xl mr-1">★</span> {Math.round(tvSeries.vote_average * 10) / 10} / 10
              </span>
              {tvSeries.first_air_date && (
                 <span>{new Date(tvSeries.first_air_date).getFullYear()}</span>
              )}
              {tvSeries.content_ratings && tvSeries.content_ratings.results && tvSeries.content_ratings.results.length > 0 && (
                <span className="border border-gray-400 px-2 py-0.5 text-xs">
                  {/* Trova la certificazione per l'Italia (IT) */}
                  {tvSeries.content_ratings.results.find(r => r.iso_3166_1 === 'IT')?.rating || (tvSeries.adult ? '18+' : '13+')}
                </span>
              )}
              <span>{formatRuntime(tvSeries.episode_run_time)}/episodio</span>
              <span className="border border-gray-400 px-2 py-0.5 text-xs">HD</span>
            </div>
            
            {/* Bottone Play/Azione Principale */}
            <button className="flex items-center bg-white text-black font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition duration-200 mb-8">
               {/* <FaPlay className="mr-2" /> */}
               Guarda Episodio 1
            </button>


            {/* Generi */}
            {tvSeries.genres && tvSeries.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                {tvSeries.genres.map((genre, index) => (
                  <span key={genre.id}>
                    <span className="text-sm text-gray-400">{genre.name}</span>
                    {index < tvSeries.genres.length - 1 && <span className="text-gray-500 mx-2">•</span>}
                  </span>
                ))}
              </div>
            )}

            <p className="text-base md:text-xl leading-relaxed max-w-xl">{tvSeries.overview}</p>

          </div>
        </div>
      </div>

      {/* Mobile Layout - Poster + Info in Column */}
      <div className="md:hidden pt-16 px-4">
        <div className="flex flex-col items-center">

          {/* Poster */}
          {tvSeries.poster_path && (
             <img
               src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`}
               alt={tvSeries.name}
               className="w-64 rounded-lg shadow-2xl mb-6"
             />
          )}

          {/* Info -- */}
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-3 text-center">{tvSeries.name}</h1>

            {tvSeries.tagline && (
              <p className="text-base text-gray-300 mb-4 italic text-center">{tvSeries.tagline}</p>
            )}
            
            {/* Bottone Play/Azione Principale Mobile */}
            <div className="flex justify-center mb-6">
                 <button className="flex items-center bg-white text-black font-bold py-2 px-4 rounded-lg text-base hover:bg-gray-300 transition duration-200">
                    {/* <FaPlay className="mr-2" /> */}
                    Guarda Episodio 1
                 </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 mb-4 text-sm">
              <span className="text-yellow-400 font-semibold flex items-center">
                 <span className="text-xl mr-1">★</span> {Math.round(tvSeries.vote_average * 10) / 10} / 10
              </span>
              {tvSeries.first_air_date && (
                <span>{new Date(tvSeries.first_air_date).getFullYear()}</span>
              )}
              {tvSeries.content_ratings && tvSeries.content_ratings.results && tvSeries.content_ratings.results.length > 0 && (
                 <span className="border border-gray-400 px-2 py-0.5 text-xs">
                    {tvSeries.content_ratings.results.find(r => r.iso_3166_1 === 'IT')?.rating || (tvSeries.adult ? '18+' : '13+')}
                 </span>
              )}
              <span>{formatRuntime(tvSeries.episode_run_time)}/episodio</span>
            </div>

            {/* Generi Mobile */}
            {tvSeries.genres && tvSeries.genres.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {tvSeries.genres.map((genre, index) => (
                  <span key={genre.id} className="text-sm text-gray-400">
                    {genre.name}{index < tvSeries.genres.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm leading-relaxed text-gray-300">{tvSeries.overview}</p>

          </div>
        </div>
      </div>


      {/* Dettagli Aggiuntivi  */}
      <div className="px-4 md:px-12 py-2 md:py-6">
        <h2 className="text-xl md:text-3xl font-semibold mb-4 text-center md:text-left">
          Dettagli Aggiuntivi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-sm md:text-base">
          
          {/* Colonna 1: Cast e Creatori */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 font-medium">Creatori:</p>
              <p className="font-bold text-lg">{getCreators(tvSeries.credits)}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Cast Principale:</p>
              <p className="font-medium">{getMainCast(tvSeries.credits)}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Numero di Stagioni:</p>
              <p className="font-medium">{tvSeries.number_of_seasons || 'N/A'}</p>
            </div>
          </div>
          
          {/* Colonna 2: Produzione e Stato */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 font-medium">Stato:</p>
              <p className="font-medium">{tvSeries.status}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Data Ultimo Episodio:</p>
              <p className="font-medium">{formatDate(tvSeries.last_air_date)}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium">Lingua Originale:</p>
              <p className="font-medium">{tvSeries.original_language}</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Stagioni Section   */}
      {tvSeries.seasons && tvSeries.seasons.length > 0 && (
        <div className="px-4 md:px-12 py-8 md:py-12">
          <h2 className="text-xl md:text-3xl font-semibold mb-6 text-center md:text-left">
            Stagioni
          </h2>
          <div className="space-y-6">
            {tvSeries.seasons.map((season) => (
              <div key={season.id} className="flex flex-col md:flex-row bg-black rounded-lg overflow-hidden shadow-lg transition duration-300">
                
                {/* Poster della stagione */}
                <div className="w-full md:w-48 flex-shrink-0">
                  {season.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                      alt={`Poster ${season.name}`}
                      className="w-full h-auto md:h-full object-cover"
                    />
                  ) : (
                     <div className="w-full h-48 md:h-full bg-gray-700 flex items-center justify-center text-gray-400 p-4 text-center">
                          Nessun Poster Disponibile
                     </div>
                  )}
                </div>

                {/* Dettagli della stagione */}
                <div className="p-4 md:p-6 flex flex-col justify-center">

                  <h3 className="text-2xl font-bold mb-2">{season.name}</h3>
                  
                  <p className="text-sm text-gray-400 mb-3">
                      {formatDate(season.air_date)} | **{season.episode_count}** Episodi
                      {season.vote_average > 0 && (
                          <span className="ml-4 text-yellow-400 font-semibold">
                              ★ {Math.round(season.vote_average * 10) / 10}
                          </span>
                      )}
                  </p>

                  {season.overview ? (
                      <p className="text-gray-300 line-clamp-3">{season.overview}</p>
                  ) : (
                      <p className="text-gray-500 italic">Nessuna sinossi disponibile per questa stagione.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

        
      {/* Production Section  */}
      <div className="px-4 md:px-12 py-8 md:py-12">
        {tvSeries.production_companies && tvSeries.production_companies.length > 0 && (
          <div>
            <h2 className="text-xl md:text-3xl font-semibold mb-6 text-center md:text-left">
              Società di Produzione
            </h2>
            <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center md:justify-start">
              {tvSeries.production_companies.map((company) => (
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


    </section>
  )
}