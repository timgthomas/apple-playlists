import _ from 'lodash'

export default class {

  playlists = []
  filter = ''
  storage = null

  constructor(playlists, storage) {
    this.playlists = playlists
    this.storage = storage
  }

  get favoriteIds() {
    return (this.storage.getItem('favorites')?.split(',') ?? []).filter(Boolean)
  }
  set favoriteIds(newFavoriteIds) {
    this.storage.setItem('favorites', newFavoriteIds.filter(Boolean).join(','));
  }

  get filteredPlaylists() {
    let filter = this.filter.toLowerCase().trim()
    return this.playlists
      .map((p) => ({
        ...p,
        name: _.startCase(p.slug),
        isFavorite: this.favoriteIds.includes(p.id),
        url: `https://music.apple.com/us/playlist/${p.slug}/pl.${p.id}`,
      }))
      .filter((p) => !filter || p.name.toLowerCase().includes(filter))
  }

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
  }

  toggleFavorite({ id }) {
    if (this.favoriteIds.includes(id)) {
      this.favoriteIds = this.favoriteIds.filter((favoriteId) => favoriteId !== id)
    } else {
      this.favoriteIds = [ ...this.favoriteIds, id ]
    }
  }

}
