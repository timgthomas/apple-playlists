document.addEventListener('alpine:init', ()=>{
    Alpine.store('app', {
        filter: '',
        get favoriteIds () {
            return (localStorage.getItem('favorites')?.split(',') ?? []).filter(Boolean);
        },
        set favoriteIds (newFavoriteIds){
            localStorage.setItem('favorites', newFavoriteIds.filter(Boolean).join(','));
        },
        get filteredPlaylists () {
            let filter = this.filter.toLowerCase().trim();
            return window.playlistData.filter((p)=>!filter || p.slug.replace(/-/g, ' ').includes(filter)
            ).map((p)=>({
                    ...p,
                    isFavorite: this.favoriteIds.includes(p.id)
                })
            );
        },
        get groups () {
            let groupedPlaylists = Object.entries(_.groupBy(this.filteredPlaylists, 'group')).map(([name, playlists])=>({
                    name,
                    playlists
                })
            );
            return [
                {
                    name: 'Favorites',
                    playlists: this.filteredPlaylists.filter((p)=>p.isFavorite
                    )
                },
                ...groupedPlaylists, 
            ].filter((g)=>g.playlists.length
            );
        },
        buildHref ({ id , slug  }) {
            return `https://music.apple.com/us/playlist/${slug}/pl.${id}`;
        },
        toggleFavorite ({ id  }) {
            if (this.favoriteIds.includes(id)) this.favoriteIds = this.favoriteIds.filter((favoriteId)=>favoriteId !== id
            );
            else this.favoriteIds = [
                ...this.favoriteIds,
                id
            ];
        }
    });
});

//# sourceMappingURL=index.d3334858.js.map
