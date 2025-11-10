import { useState } from 'react'

import FavoritesContext from '../store/favorites-context'

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  function addToFavorites(movie) {
    setFavorites((prevFavorites) => [...prevFavorites, movie])
  }

  function removeFromFavorites(id) {
    setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== id))
  }

  const contextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites
  }

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  )
}
