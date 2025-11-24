import MovieCard from "./MovieCard";
import TVSeriesCard from "./TVSeriesCard";

function Card({ media, type = 'default' }) {
    
    const isMovie = media.title ? true : false;

    let itemClass = 'carousel-item'
    let wrapperClass = 'carousel-wrapper'

    if (type === 'small') {
        itemClass = 'carousel-item'
        wrapperClass = 'carousel-wrapper'
    }
    
    if (type === 'grid') {
        itemClass = 'carousel-item'
        wrapperClass = 'carousel-wrapper-all'
    }

    return (
        <>
            {isMovie ? (
                <MovieCard movie={media} itemClass={itemClass} wrapperClass={wrapperClass}/>
            ) : (
                <TVSeriesCard tv={media} itemClass={itemClass} wrapperClass={wrapperClass}/>
            )}
        </>
    );
}

export default Card;