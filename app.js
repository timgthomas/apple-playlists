import Alpine from 'alpinejs'

import allPlaylists from './data'
import AppStore from './src/stores/app'

Alpine.store('app', new AppStore(allPlaylists, window.localStorage))

Alpine.start()
