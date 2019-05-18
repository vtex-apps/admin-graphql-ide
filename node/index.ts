import { LRUCache, Service } from '@vtex/api'

import { apps } from './resolvers/apps'

const appsCacheStorage = new LRUCache<string, any>({
  max: 10000,
})

const SHORT_TIMEOUT_MS = 1 * 500

metrics.trackCache('apps', appsCacheStorage)

export default new Service({
  clients: {
    options: {
      apps: {
        memoryCache: appsCacheStorage,
        retries: 1,
        timeout: SHORT_TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers: {
      Query: {
        apps,
      },
    },
  },
})
