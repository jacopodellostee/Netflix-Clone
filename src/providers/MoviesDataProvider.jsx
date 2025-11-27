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

async function getDiscoverMovies(page = 1) {
    const response = await fetch(
        `${BASE_URL}/discover/movie?language=en-EN&sort_by=popularity.desc&page=${page}`,
        {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
        }
    );
    return await response.json();
}

async function getDiscoverSeries(page = 1) {
    const response = await fetch(
        `${BASE_URL}/discover/tv?language=en-EN&sort_by=popularity.desc&page=${page}`,
        {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
        }
    );
    return await response.json();
}

export const MoviesDataProvider = ({ children }) => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [nowPlayingSeries, setNowPlayingSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    const [discoverMovies, setDiscoverMovies] = useState([]);
    const [discoverPage, setDiscoverPage] = useState(1);
    const [discoverTotalPages, setDiscoverTotalPages] = useState(1);
    const [discoverLoading, setDiscoverLoading] = useState(false);
    const [discoverError, setDiscoverError] = useState(null);

    const [discoverTv, setDiscoverTv] = useState([]);
    const [discoverPageTv, setDiscoverPageTv] = useState(1);
    const [discoverTotalPagesTv, setDiscoverTotalPagesTv] = useState(1);
    const [discoverLoadingTv, setDiscoverLoadingTv] = useState(false);
    const [discoverErrorTv, setDiscoverErrorTv] = useState(null);

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
                console.error("Error in global fetching of the Homepage:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchDiscoverData = async () => {
            setDiscoverLoading(true);
            setDiscoverError(null);
            try {
                const data = await getDiscoverMovies(discoverPage);
                setDiscoverMovies(data.results);
                setDiscoverTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
            } catch (error) {
                setDiscoverError("Unable to load movies. Try again later.");
                console.error("Grid fetching error:", error);
            } finally {
                setDiscoverLoading(false);
            }
        };

        if (discoverPage >= 1 && discoverPage <= discoverTotalPages) {
            fetchDiscoverData();
        }

    }, [discoverPage])
    const handleDiscoverPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= discoverTotalPages) {
            setDiscoverPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        const fetchDiscoverData = async () => {
            setDiscoverLoadingTv(true);
            setDiscoverErrorTv(null);
            try {
                const data = await getDiscoverSeries(discoverPageTv);
                setDiscoverTv(data.results);
                setDiscoverTotalPagesTv(data.total_pages > 500 ? 500 : data.total_pages);
            } catch (error) {
                setDiscoverErrorTv("Unable to load Tv Series. Try again later.");
                console.error("Grid fetching error:", error);
            } finally {
                setDiscoverLoadingTv(false);
            }
        };

        if (discoverPageTv >= 1 && discoverPageTv <= discoverTotalPagesTv) {
            fetchDiscoverData();
        }

    }, [discoverPage])
    const handleDiscoverPageChangeTv = (newPage) => {
        if (newPage >= 1 && newPage <= discoverTotalPagesTv) {
            setDiscoverPageTv(newPage);
            window.scrollTo(0, 0);
        }
    };

    const topMovieToday = trendingMovies.length > 0 ? trendingMovies[0] : null;

    const contextValue = {
        topMovieToday,
        trendingMovies,
        topRatedMovies,
        topRatedSeries,
        nowPlayingMovies,
        nowPlayingSeries,
        loading,

        discoverMovies,
        discoverPage,
        discoverTotalPages,
        discoverLoading,
        discoverError,
        handleDiscoverPageChange,

        discoverTv,
        discoverPageTv,
        discoverTotalPagesTv,
        discoverLoadingTv,
        discoverErrorTv,
        handleDiscoverPageChangeTv,
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