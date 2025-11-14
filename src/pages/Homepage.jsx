import { useMoviesData } from '../providers/MoviesDataProvider'; 
import Hero from '../components/Hero';



function Homepage() {
    const { popularMovies: movies, loading, error } = useMoviesData();

    return (
        <div className="homepage">
            <Hero />
            <h2>Film Popolari</h2>
            {loading && <p>Caricamento dei film...</p>}
            {error && <p className="error">{error}</p>} 
            
            <div className="carousel-row flex flex-nowrap py-[20px] pl-[50px]">
                {!loading && !error && movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="carousel-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <p className="movie-title">{movie.title}</p>
                        </div>
                    ))
                ) : (
                    !loading && !error && <p>Nessun film trovato.</p>
                )}
            </div>
        </div>
    );
}

export default Homepage;