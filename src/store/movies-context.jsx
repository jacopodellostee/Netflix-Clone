import { createContext } from 'react';

const MoviesContext = createContext({
    topMovieToday: null,
    trendingMovies: [],
    topRatedMovies: [],
    topRatedSeries: [],
    nowPlayingMovies: [],
    nowPlayingSeries: [],
    loading: true,
});

export default MoviesContext;