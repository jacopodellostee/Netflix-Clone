import MovieCard from "./MovieCard";
import TVSeriesCard from "./TVSeriesCard";
function Card({ media, type='default' }) {
    const isMovie = media.title ? true : false;

    return (
        <>
            {isMovie ? (
                <MovieCard movie={media} type={type} />
            ) : (
                <TVSeriesCard tv={media} type={type} />
            )}
        </>
    );
}

export default Card;