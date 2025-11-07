import Layout from '../layout/Layout'
import Homepage from '../pages/Homapage'
import Movies from '../pages/Movies'
import MovieDetail from '../pages/MovieDetail'
import TVSeries from '../pages/TVSeries'
import TVSeriesDetail from '../pages/TVSeriesDetail'
import Favorites from '../pages/Favorites'
import NotFound from '../pages/NotFound'

const routes = [ {
      path: '/',
      Component: Layout,
      children: [
        {
          index: true,
          Component: Homepage,
          showInNav: true,
          title: 'Home'
        },
        {
          path: 'favourites',
          Component: Favorites,
          showInNav: true,
          title: 'Favourites'
        },
        {
          path: 'movies',
          Component: Movies,
          showInNav: true,
          title: 'Movies'
        },
        {
          path: 'tv',
          Component: TVSeries,
          showInNav: true,
          title: 'TV Series'
        },
        {
          path: 'movies/:id',
          Component: MovieDetail,
          showInNav: false
        },
        {
          path: 'tv/:id',
          Component: TVSeriesDetail,
          showInNav: false
        },
        {
          path: '*',
          Component: NotFound
        }
      ]
    } ]

export default routes;