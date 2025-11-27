import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { FavoritesContextProvider } from './providers/FavoritesContextProvider'
import { MoviesDataProvider } from './providers/MoviesDataProvider'

import routes from './routes/routes'

const router = createBrowserRouter(routes)

function App() {

  return (
    <>
      <MoviesDataProvider>
        <FavoritesContextProvider>
          <RouterProvider router={router} />
        </FavoritesContextProvider>
      </MoviesDataProvider>
    </>
  )
}



export default App
