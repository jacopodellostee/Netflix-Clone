import { useMoviesData } from '../providers/MoviesDataProvider';
import CardGrid from '../components/CardGrid';;

function Movie() {
    const {
        discoverTv,
        discoverPageTv,
        discoverTotalPagesTv,
        discoverLoadingTv,
        discoverErrorTv,
        handleDiscoverPageChangeTv
    } = useMoviesData();

    return (
        <div className="movies-page-container min-h-screen bg-gray-900 pt-16">
            <CardGrid
                title="Explore the Complete Series Tv Catalogue"
                data={discoverTv}
                currentPage={discoverPageTv}
                totalPages={discoverTotalPagesTv}
                loading={discoverLoadingTv}
                error={discoverErrorTv}
                onPageChange={handleDiscoverPageChangeTv}
            />
        </div>
    );
}

export default Movie;