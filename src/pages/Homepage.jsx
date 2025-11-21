import { useMoviesData } from '../providers/MoviesDataProvider';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel'; 

function Homepage() {
    const { 
        topRatedMovies: movies, 
        nowPlayingMovies: moviesNowPlaying, 
        topRatedSeries: series, 
        nowPlayingSeries: seriesNowPlaying, 
        loading, 
        error 
    } = useMoviesData();

    return (
        <div className="homepage">

            <Hero />

            {/* film */}
            <div className="container-fluid">
                
                <Carousel 
                    title="Top Rated Movies"
                    data={movies}
                    loading={loading}
                    error={error}
                />

                <Carousel 
                    title="Recently Released Movies"
                    data={moviesNowPlaying}
                    loading={loading}
                    error={error}
                />

                <Carousel 
                    title="Top Rated Series Tv"
                    data={series}
                    loading={loading}
                    error={error}
                />

                <Carousel 
                    title="Recently Released Series Tv"
                    data={seriesNowPlaying}
                    loading={loading}
                    error={error}
                />

            </div>
        </div>
    );
}

export default Homepage;