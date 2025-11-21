import { useMoviesData } from '../providers/MoviesDataProvider';
import CardGrid from '../components/CardGrid';;

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
        <div className="movies-page-container min-h-screen bg-black pt-16">
            <CardGrid
                title="Explore the Complete Movies Catalog"
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