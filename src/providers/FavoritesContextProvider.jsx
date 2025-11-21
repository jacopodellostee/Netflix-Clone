import { useState, useContext } from 'react'

import FavoritesContext from '../store/favorites-context'

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  function addToFavorites(show) {
    if(favorites.includes(show)) return;

    setFavorites((prevFavorites) => [...prevFavorites, show])
  }

  function removeFromFavorites(id) {
    setFavorites((prevFavorites) => prevFavorites.filter((show) => show.id !== id))
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

export const useFavoritesData = () => {
    return useContext(FavoritesContext);
};