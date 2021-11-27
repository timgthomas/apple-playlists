import assert from 'assert'
import _ from 'lodash'

import AppStore from '../../src/stores/app'

describe('app store', () => {
  it('should generate playlist names from their slugs', () => {
    let mockPlaylists = [ { group: 'Test', id: 1, slug: 'test-playlist' } ]
    let mockLocalStorage = { getItem() {}, setItem() {} }
    let subject = new AppStore(mockPlaylists, mockLocalStorage)
    assert.deepEqual(_.map(subject.filteredPlaylists, 'name'), [ 'Test Playlist' ])
  })
})
