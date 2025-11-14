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

async function getTopRatedMovies() {
    const response = await fetch(`${BASE_URL}/movie/top_rated`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return (await response.json()).results;
}

async function getNowPlayingMovies() {
    const response = await fetch(`${BASE_URL}/movie/now_playing`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return (await response.json()).results;
}

async function getTopRatedSeries() {
    const response = await fetch(`${BASE_URL}/tv/top_rated`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return (await response.json()).results;
}

async function getNowPlayingSeries() {
    const response = await fetch(`${BASE_URL}/tv/airing_today`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    return (await response.json()).results;
}

export const MoviesDataProvider = ({ children }) => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [nowPlayingSeries, setNowPlayingSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendingResults, topRatedMovies, topRatedSeries, nowPlayingMovies, nowPlayingSeries] = await Promise.all([
                    getTrendingMovies(),
                    getTopRatedMovies(),
                    getTopRatedSeries(),
                    getNowPlayingMovies(),
                    getNowPlayingSeries()
                ]);
                setTrendingMovies(trendingResults);
                setTopRatedMovies(topRatedMovies);
                setTopRatedSeries(topRatedSeries);
                setNowPlayingMovies(nowPlayingMovies);
                setNowPlayingSeries(nowPlayingSeries);
                
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
        topRatedMovies,
        topRatedSeries,
        nowPlayingMovies,
        nowPlayingSeries,
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