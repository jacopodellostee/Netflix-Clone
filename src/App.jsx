import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { FavoritesContextProvider } from './providers/FavoritesContextProvider'
import { MoviesDataProvider } from './providers/MoviesDataProvider'

import routes from './routes/routes'
import './App.css'

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
