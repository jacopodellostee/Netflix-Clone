import { useMoviesData } from '../providers/MoviesDataProvider';
import Hero from '../components/Hero';



function Homepage() {
    const { popularMovies: movies, popularSeries: series, loading, error } = useMoviesData();

    return (
        <div className="homepage">
            <Hero />
            <div className="container-fluid">
                <h2 className="ms-4 text-xl font-bold" >Film Popolari</h2>
                {loading && <p>Caricamento dei film...</p>}
                {error && <p className="error">{error}</p>}

                <div className="carousel-row flex flex-nowrap py-[10px]">
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
                <h2 className="ms-4 text-xl font-bold" >Serie Tv Popolari</h2>
                {loading && <p>Caricamento dei film...</p>}
                {error && <p className="error">{error}</p>}

                <div className="carousel-row flex flex-nowrap py-[10px]">
                    {!loading && !error && series.length > 0 ? (
                        series.map((serie) => (
                            <div key={serie.id} className="carousel-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                                    alt={serie.title}
                                />
                                <p className="movie-title">{serie.title}</p>
                            </div>
                        ))
                    ) : (
                        !loading && !error && <p>Nessun film trovato.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Homepage;