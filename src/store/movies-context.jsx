import { createContext } from 'react';

const MoviesContext = createContext({
    topMovieToday: null,
    trendingMovies: [],
    topRatedMovies: [],
    topRatedSeries: [],
    nowPlayingMovies: [],
    nowPlayingSeries: [],
    loading: true,

    discoverMovies: [],
    discoverPage: 1,
    discoverTotalPages: 1,
    discoverLoading: false,
    discoverError: null,
    handleDiscoverPageChange: () => { },
});

export default MoviesContext;