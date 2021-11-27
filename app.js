import Alpine from 'alpinejs'

import appStore from './src/stores/app'

Alpine.store('app', appStore)

Alpine.start()
