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
                            <div key={movie.id} className="carousel-item ">
                                <div className="carousel-wrapper">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                </div>
                                <div className="carousel-details flex flex-col items-center">
                                    <p className="details-title truncate">{movie.title}</p>

                                    <div className="action-buttons">
                                        
                                        <button className="add-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                                            <path d="M19 14c1.49-1.46 3-3.23 3-5.55a5.5 5.5 0 0 0-5.5-5.5c-1.8 0-3.64 1.2-4.5 2.5-1.1-1.3-3.2-2.5-4.5-2.5A5.5 5.5 0 0 0 2 8.45c0 2.32 1.51 4.09 3 5.55L12 22l7-8z" />
                                        </svg></button>
                                        <button className="info-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg></button>
                                    </div>
                                </div>

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
                                <div className="carousel-wrapper">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movieNowPlaying.poster_path}`}
                                        alt={movieNowPlaying.title}
                                    />
                                </div>
                                <div className="carousel-details flex flex-col items-center">
                                    <p className="details-title truncate">{movieNowPlaying.title}</p>

                                    <div className="action-buttons">
                                        
                                        <button className="add-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                                            <path d="M19 14c1.49-1.46 3-3.23 3-5.55a5.5 5.5 0 0 0-5.5-5.5c-1.8 0-3.64 1.2-4.5 2.5-1.1-1.3-3.2-2.5-4.5-2.5A5.5 5.5 0 0 0 2 8.45c0 2.32 1.51 4.09 3 5.55L12 22l7-8z" />
                                        </svg></button>
                                        <button className="info-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg></button>
                                    </div>
                                </div>

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
                                <div className="carousel-wrapper">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                                        alt={serie.name}
                                    />
                                </div>
                                <div className="carousel-details flex flex-col items-center">
                                    <p className="details-title truncate">{serie.name}</p>

                                    <div className="action-buttons">
                                        
                                        <button className="add-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                                            <path d="M19 14c1.49-1.46 3-3.23 3-5.55a5.5 5.5 0 0 0-5.5-5.5c-1.8 0-3.64 1.2-4.5 2.5-1.1-1.3-3.2-2.5-4.5-2.5A5.5 5.5 0 0 0 2 8.45c0 2.32 1.51 4.09 3 5.55L12 22l7-8z" />
                                        </svg></button>
                                        <button className="info-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg></button>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        !loading && !error && <p>No series found.</p>
                    )}
                </div>
                <h2 className="ms-4 text-xl font-bold" >Recently Released Series Tv</h2>
                {loading && <p>Loading series...</p>}
                {error && <p className="error">{error}</p>}

                <div className="carousel-row flex flex-nowrap py-[10px]">
                    {!loading && !error && seriesNowPlaying.length > 0 ? (
                        seriesNowPlaying.map((serieNowPlaying) => (
                            <div key={serieNowPlaying.id} className="carousel-item">
                                <div className="carousel-wrapper">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${serieNowPlaying.poster_path}`}
                                        alt={serieNowPlaying.name}
                                    />
                                </div>
                                <div className="carousel-details flex flex-col items-center">
                                    <p className="details-title truncate">{serieNowPlaying.name}</p>

                                    <div className="action-buttons">
                                        
                                        <button className="add-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart">
                                            <path d="M19 14c1.49-1.46 3-3.23 3-5.55a5.5 5.5 0 0 0-5.5-5.5c-1.8 0-3.64 1.2-4.5 2.5-1.1-1.3-3.2-2.5-4.5-2.5A5.5 5.5 0 0 0 2 8.45c0 2.32 1.51 4.09 3 5.55L12 22l7-8z" />
                                        </svg></button>
                                        <button className="info-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg></button>
                                    </div>
                                </div>

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