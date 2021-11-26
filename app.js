import Alpine from 'alpinejs'
import _ from 'lodash'

import allPlaylists from './data'

Alpine.store('app', {

  filter: '',

  get favoriteIds() {
    return (localStorage.getItem('favorites')?.split(',') ?? []).filter(Boolean)
  },
  set favoriteIds(newFavoriteIds) {
    localStorage.setItem('favorites', newFavoriteIds.filter(Boolean).join(','));
  },

  get filteredPlaylists() {
    let filter = this.filter.toLowerCase().trim()
    return allPlaylists
      .map((p) => ({
        ...p,
        name: _.startCase(p.slug),
        isFavorite: this.favoriteIds.includes(p.id),
        url: `https://music.apple.com/us/playlist/${p.slug}/pl.${p.id}`,
      }))
      .filter((p) => !filter || p.name.toLowerCase().includes(filter))
  },

  get groups() {
    let groupedPlaylists = Object
      .entries(_.groupBy(this.filteredPlaylists, 'group'))
      .map(([ name, playlists ]) => ({ name, playlists }))
    return [
      {
        name: 'Favorites',
        playlists: this.filteredPlaylists.filter((p) => p.isFavorite),
      },
      ...groupedPlaylists,
    ].filter((g) => g.playlists.length)
  },

  toggleFavorite({ id }) {
    if (this.favoriteIds.includes(id)) {
      this.favoriteIds = this.favoriteIds.filter((favoriteId) => favoriteId !== id)
    } else {
      this.favoriteIds = [ ...this.favoriteIds, id ]
    }
  },

})

Alpine.start()
