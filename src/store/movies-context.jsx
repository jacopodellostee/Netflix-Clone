import { createContext } from 'react';

const MoviesContext = createContext({
    topMovieToday: null,
    trendingMovies: [],
    popularMovies: [],
    popularSeries: [],
    loading: true,
});

export default MoviesContext;