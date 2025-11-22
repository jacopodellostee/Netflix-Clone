// import { useMoviesData } from '../providers/MoviesDataProvider';


// const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

// function Hero() {
//     const { topMovieToday, loading } = useMoviesData();

//     if (loading) {
//         return <div className="hero loading-state"></div>;
//     }
//     const backdropUrl = topMovieToday && topMovieToday.backdrop_path
//         ? `${BASE_IMAGE_URL}${topMovieToday.backdrop_path}`
//         : null;

//     return (

//         <div
//             className="hero"
//             style={{
//                 backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0), rgba(20,20,20,1)), url(${backdropUrl})`
//             }}
//         >
            
//             <div className="hero-content">
//                 <h1 className="movie-title">{topMovieToday.title || topMovieToday.name}</h1>
//                 <p className="movie-overview">{topMovieToday.overview}</p>
//             </div>
//         </div>
//     );
// }

// export default Hero;
import { useMoviesData } from '../providers/MoviesDataProvider';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

function Hero() {
    const { topMovieToday, loading } = useMoviesData();

    if (loading) {
        // Loading skeleton responsive
        return <div className="w-full h-[60vh] md:h-[80vh] bg-zinc-900 animate-pulse mb-8"></div>;
    }

    const backdropUrl = topMovieToday && topMovieToday.backdrop_path
        ? `${BASE_IMAGE_URL}${topMovieToday.backdrop_path}`
        : null;

    return (
        <div className="relative w-full h-[60vh] md:h-[80vh] mb-8 bg-black overflow-hidden">
            
            {/* Immagine di Sfondo e Gradienti */}
            <div className="absolute inset-0">
                {backdropUrl && (
                    <img 
                        src={backdropUrl} 
                        alt={topMovieToday.title || topMovieToday.name}
                        className="w-full h-full object-cover object-top" 
                    />
                )}
                
                {/* SFUMATURE (Overlay) */}
                
                {/* 1. Sfumatura dal Basso verso l'Alto (nero solido -> trasparente) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>


                {/* 3. Sfumatura dall'Alto verso il Basso (AGGIUNTA: speculare a quella in basso) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent"></div>
            </div>

            {/* Contenuto Testuale (z-index per stare sopra le sfumature) */}
            <div className="absolute bottom-0 left-0 w-full p-4 pb-10 md:px-12 md:pb-20 text-white z-10">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
                        {topMovieToday.title || topMovieToday.name}
                    </h1>
                    <p className="text-base md:text-lg font-medium drop-shadow-md line-clamp-3 md:line-clamp-none max-w-[90%] md:max-w-full text-gray-200">
                        {topMovieToday.overview}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero;