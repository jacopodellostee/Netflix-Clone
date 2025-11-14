import { useMoviesData } from '../providers/MoviesDataProvider';
import Hero from '../components/Hero';



function Homepage() {
    const { topRatedMovies: movies, nowPlayingMovies: moviesNowPlaying, topRatedSeries: series, nowPlayingSeries: seriesNowPlaying, loading, error } = useMoviesData();

    return (
        <div className="homepage">
            <Hero />
            <div className="container-fluid">
                <h2 className="ms-4 text-xl font-bold" >Top Rated Movies</h2>
                {loading && <p>Loading movies...</p>}
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
                        !loading && !error && <p>No movies found.</p>
                    )}
                </div>
                <h2 className="ms-4 text-xl font-bold" >Recently Released Movies</h2>
                {loading && <p>Loading movies...</p>}
                {error && <p className="error">{error}</p>}

                <div className="carousel-row flex flex-nowrap py-[10px]">
                    {!loading && !error && moviesNowPlaying.length > 0 ? (
                        moviesNowPlaying.map((movieNowPlaying) => (
                            <div key={movieNowPlaying.id} className="carousel-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movieNowPlaying.poster_path}`}
                                    alt={movieNowPlaying.title}
                                />
                                <p className="movie-title">{movieNowPlaying.title}</p>
                            </div>
                        ))
                    ) : (
                        !loading && !error && <p>No movies found.</p>
                    )}
                </div>
                <h2 className="ms-4 text-xl font-bold" >Top Rated Series Tv</h2>
                {loading && <p>Loading Series Tv...</p>}
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
                        !loading && !error && <p>No Series Tv found.</p>
                    )}
                </div>
                <h2 className="ms-4 text-xl font-bold" >Recently Released Series Tv</h2>
                {loading && <p>Loading series...</p>}
                {error && <p className="error">{error}</p>}

                <div className="carousel-row flex flex-nowrap py-[10px]">
                    {!loading && !error && seriesNowPlaying.length > 0 ? (
                        seriesNowPlaying.map((serieNowPlaying) => (
                            <div key={serieNowPlaying.id} className="carousel-item">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${serieNowPlaying.poster_path}`}
                                    alt={serieNowPlaying.title}
                                />
                                <p className="movie-title">{serieNowPlaying.title}</p>
                            </div>
                        ))
                    ) : (
                        !loading && !error && <p>No series found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Homepage;