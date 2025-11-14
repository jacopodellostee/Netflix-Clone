import { useContext, useState, useEffect } from 'react';
import MoviesContext from '../store/movies-context';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;


async function getTrendingMovies() {
    const response = await fetch(`${BASE_URL}/trending/movie/day`, { 
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } 
    });
    return (await response.json()).results;
}

async function getPopularMovies() {
    const response = await fetch(`${BASE_URL}/movie/popular`, { 
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } 
    });
    return (await response.json()).results;
}

export const MoviesDataProvider = ({ children }) => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendingResults, popularResults] = await Promise.all([
                    getTrendingMovies(),
                    getPopularMovies()
                ]);
                setTrendingMovies(trendingResults);
                setPopularMovies(popularResults);
                console.log(popularMovies);
            } catch (error) {
                console.error("Errore nel fetching globale:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const topMovieToday = trendingMovies.length > 0 ? trendingMovies[0] : null;

    const contextValue = {
        topMovieToday,
        trendingMovies,
        popularMovies,
        loading,
    };

    return (
        <MoviesContext.Provider value={contextValue}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMoviesData = () => {
    return useContext(MoviesContext);
};