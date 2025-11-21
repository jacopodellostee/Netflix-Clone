import MovieCard from "./MovieCard";
import TVSeriesCard from "./TVSeriesCard";

function Card({ media }) {
    
    const isMovie = media.title ? true : false;

    return (
        <>
            {isMovie ? (
                <MovieCard movie={media} />
            ) : (
                <TVSeriesCard tv={media} />
            )}
        </>
    );
}

export default Card;