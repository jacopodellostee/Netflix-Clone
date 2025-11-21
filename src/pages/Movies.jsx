import { useMoviesData } from '../providers/MoviesDataProvider';
import MovieGrid from '../components/MovieGrid';;

function Movie() {
    const {
        discoverMovies,
        discoverPage,
        discoverTotalPages,
        discoverLoading,
        discoverError,
        handleDiscoverPageChange
    } = useMoviesData();

    return (
        <div className="movies-page-container min-h-screen bg-gray-900 pt-16">
            <MovieGrid
                title="Esplora il Catalogo Completo"
                data={discoverMovies}
                currentPage={discoverPage}
                totalPages={discoverTotalPages}
                loading={discoverLoading}
                error={discoverError}
                onPageChange={handleDiscoverPageChange}
            />
        </div>
    );
}

export default Movie;