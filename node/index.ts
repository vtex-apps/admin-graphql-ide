import { LRUCache, Service } from '@vtex/api'

import { Clients } from './clients'
import { graphqlProxy } from './middlewares/graphqlProxy'
import { apps } from './resolvers/apps'

const appsCacheStorage = new LRUCache<string, any>({
  max: 10000,
})

const SHORT_TIMEOUT_MS = 1 * 500
const GRAPHQL_SERVER_TIMEOUT_MS = 60e3

metrics.trackCache('apps', appsCacheStorage)

export default new Service<Clients>({
  clients: {
    implementation: Clients,
    options: {
      apps: {
        memoryCache: appsCacheStorage,
        retries: 1,
        timeout: SHORT_TIMEOUT_MS,
      },
      graphqlServer: {
        timeout: GRAPHQL_SERVER_TIMEOUT_MS
      }
    },
  },
  graphql: {
    resolvers: {
      Query: {
        apps,
      },
    },
  },
  routes: {
    graphqlProxy,
  },
})
