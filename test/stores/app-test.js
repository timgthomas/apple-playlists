import assert from 'assert'
import _ from 'lodash'

import appStore from '../../src/stores/app'

describe('app store', () => {
  it('should generate playlist names from their slugs', () => {
    let mockPlaylists = [ { group: 'Test', id: 1, slug: 'test-playlist' } ]
    let mockLocalStorage = { getItem() {}, setItem() {} }
    appStore.init(mockPlaylists, mockLocalStorage)
    assert.deepEqual(_.map(appStore.filteredPlaylists, 'name'), [ 'Test Playlist' ])
  })
})
