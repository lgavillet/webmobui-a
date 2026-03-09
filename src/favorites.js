const FAVORITES_KEY = 'favorites'

// Helpers pour l'intéraction avec le localstorage en JSON
const setItem = (id, value) => localStorage.setItem(id, JSON.stringify(value))

const getItem = (id) => localStorage.getItem(id) && JSON.parse(localStorage.getItem(id))

// Méthodes pour le maniement des favoris
const getFavorites = () => getItem(FAVORITES_KEY) ?? []

const isFavorite = (song) => !!getFavorites().find((el) => el.id == song.id)

const addFavorite = (song) => {
  // On récupère le tableau de favoris ou on en défini un vide si inexistant
  const favs = getFavorites()
  favs.push(song)
  setItem(FAVORITES_KEY, favs)
}

const removeFavorite = (song) => {
  const favs = getFavorites()
  const index = favs.findIndex((el) => el.id == song.id)
  favs.splice(index, 1)
  setItem(FAVORITES_KEY, favs)
}

export { getFavorites, isFavorite, addFavorite, removeFavorite }
