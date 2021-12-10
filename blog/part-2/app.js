document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    filter: '',
    get filteredPlaylists() {
      let filterString = this.filter.toLowerCase().trim()

      // If the user hasn't entered text, return all playlists
      if (filterString === '') return window.data

      // Otherwise, perform the basic "search" by playlist name
      return window.data.filter((playlist) => {
        let playlistName = playlist.slug.replace(/-/g, ' ')
        return playlistName.includes(filterString)
      })
    },
    get groupedPlaylists() {
      return Object
        .entries(_.groupBy(this.filteredPlaylists, 'group'))
        .map(([ groupName, playlists ]) => ({
          groupName, playlists
        }))
    },
  })
})
