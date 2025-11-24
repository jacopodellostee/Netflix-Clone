import { useState, useContext, useEffect } from 'react';

import FavoritesContext from '../store/favorites-context';

const LOCAL_STORAGE_KEY = 'netflixCloneFavorites';

export function FavoritesContextProvider({ children }) {
  
  const [favorites, setFavorites] = useState(() => {
    try {
        const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("Error loading favorites:", error);
        return [];
    }
  });

  function addToFavorites(show) {
    if (favorites.some(item => item.id === show.id)) return; 

    setFavorites((prevFavorites) => [...prevFavorites, show])
  }

  function removeFromFavorites(id) {
    setFavorites((prevFavorites) => prevFavorites.filter((show) => show.id !== id))
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);


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