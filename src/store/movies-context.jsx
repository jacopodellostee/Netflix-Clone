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

    discoverTv: [],
    discoverPageTv: 1,
    discoverTotalPagesTv: 1,
    discoverLoadingTv: false,
    discoverErrorTv: null,
    handleDiscoverPageChangeTv: () => { },
});

export default MoviesContext;