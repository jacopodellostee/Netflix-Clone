import { useMoviesData } from '../providers/MoviesDataProvider';


const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

function Hero() {
    const { topMovieToday, loading } = useMoviesData();

    if (loading) {
        return <div className="hero loading-state"></div>;
    }
    const backdropUrl = topMovieToday && topMovieToday.backdrop_path
        ? `${BASE_IMAGE_URL}${topMovieToday.backdrop_path}`
        : null;

    return (

        <div
            className="hero"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0), rgba(20,20,20,1)), url(${backdropUrl})`
            }}
        >
            
            <div className="hero-content">
                <h1 className="movie-title">{topMovieToday.title || topMovieToday.name}</h1>
                <p className="movie-overview">{topMovieToday.overview}</p>
            </div>
        </div>
    );
}

export default Hero;