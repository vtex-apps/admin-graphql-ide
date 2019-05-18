import { IOClients } from '@vtex/api'

import { GraphQLServer } from './graphqlServer'

export class Clients extends IOClients {
  get graphqlServer () {
    return this.getOrSet('graphqlServer', GraphQLServer)
  }
}