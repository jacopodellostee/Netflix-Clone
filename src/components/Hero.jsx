import { useMoviesData } from '../providers/MoviesDataProvider';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

function Hero() {
    const { topMovieToday, loading } = useMoviesData();

    if (loading) {
        return <div className="w-full h-[60vh] md:h-[80vh] bg-zinc-900 animate-pulse mb-8"></div>;
    }

    const backdropUrl = topMovieToday && topMovieToday.backdrop_path
        ? `${BASE_IMAGE_URL}${topMovieToday.backdrop_path}`
        : null;

    return (
        <div className="relative w-full h-[60vh] md:h-[80vh] mb-8 bg-black overflow-hidden">
            <div className="absolute inset-0">
                {backdropUrl && (
                    <img
                        src={backdropUrl}
                        alt={topMovieToday.title || topMovieToday.name}
                        className="w-full h-full object-cover object-top"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent"></div>
            </div>
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