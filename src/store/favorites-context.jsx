import { createContext } from 'react'

const FavoritesContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {}
})

export default FavoritesContext