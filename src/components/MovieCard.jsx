import { Link } from "react-router-dom";

import { useFavoritesData } from '../providers/FavoritesContextProvider';

function MovieCard({ movie, itemClass, wrapperClass }) { 

    const { favorites, addToFavorites, removeFromFavorites } = useFavoritesData();

    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorites(movie.id); 
        } else {
            addToFavorites(movie); 
        }
    }

    return (
        <div key={movie.id} className={itemClass}>
            <div className={wrapperClass}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            </div>
            <div className="carousel-details flex flex-col items-center">
                <p className="details-title text-center truncate font-bold mt-2">{movie.title}</p>
                <div className="action-buttons">

                    <button className="add-button" onClick={handleFavoriteClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "white" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart transition-all duration-300 ease-in-out">
                            <path d="M19 14c1.49-1.46 3-3.23 3-5.55a5.5 5.5 0 0 0-5.5-5.5c-1.8 0-3.64 1.2-4.5 2.5-1.1-1.3-3.2-2.5-4.5-2.5A5.5 5.5 0 0 0 2 8.45c0 2.32 1.51 4.09 3 5.55L12 22l7-8z" />
                        </svg>
                    </button>

                    <Link to={`/movies/${movie.id}`}> 
                        <button className="info-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;