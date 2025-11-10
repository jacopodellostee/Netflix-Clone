import { createContext } from 'react';

const MoviesContext = createContext({
    topMovieToday: null,
    trendingMovies: [],
    popularMovies: [],
    loading: true,
});

export default MoviesContext;